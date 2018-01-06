/**
 * extract-typedefs.ts
 *
 * Reads the type definitions from geosupport's C header (/include/foruser/pac.h)
 * Outputs JSON (default) or TypeScript definitions (run with `--ts`) to stdout
 *
 * The following changes are made, compared to the C types:
 *   - Variable names are converted to camelCase
 *   - (TS only) Nested work area structs are flattened
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { reduceCount, indexOfClosingBracket, tokenize } from './util';
const camelCase = require('lodash.camelcase');

type NamedBlock = {
  name: string;
  body: string;
};

const DECLARATION_REGEX = /^([A-Za-z0-9_]+)\s+([^\[]+)\s*(\[[^;]+\])?\s*;\s*(\/\/.+|\/\*.+\*\/)?\s*/;
const COMMENT_REGEX = /^\/\*(.+)\*\/$/;

const stripSourceCode = (source: string): string =>
  source.replace(/\{/g, '{\n') // add newline after each open brace
        .replace(/^\s+/mg, '') // preceding whitespace
        .replace(/\s*\[/g, '[') // space preceding array count
        .replace(/\*\/\n\/\*/g, ''); // combine multiline comments

function parseDefine(defines: any, match: string): void {
  const [_, key, val] = tokenize(match);
  defines[key] = val;
}

function parseNamedBlock(str: string, startOffset: number, preambleLength: number): NamedBlock {
  const closingBracketIndex = indexOfClosingBracket(str.substring(startOffset));
  const body = str.substring(startOffset + preambleLength, startOffset + closingBracketIndex + 1);
  const semicolonIndex = str.substring(startOffset + closingBracketIndex + 1).indexOf(';');
  const name = str.substring(startOffset + closingBracketIndex + 1, startOffset + closingBracketIndex + semicolonIndex + 1).trim();

  return { name, body };
}

function parseRootTypedef(typedefs: CDeclarationIndex, fullMatch: string, matchedToken: string, matchIndex: number, str: string) {
  const { body, name } = parseNamedBlock(str, matchIndex,  `${fullMatch} {`.length);
  const names = name.split(',').map(s => s.trim()).filter(s => !!s);
  const children = parseDeclarations(body);
  const typedef: Partial<CDeclaration> = { children };
  if (matchedToken === 'union') typedef.type = 'union';
  names.forEach(name => {
    typedefs[name] = { name, type: matchedToken, ...typedef };
  });
}

function parseDeclarations(body: string): CDeclaration[] {
  const declarations: CDeclaration[] = [];
  const lines = body.split('\n');
  let offset = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const matchRecursiveDecl = line.match(/^(struct|union) /);
    if (matchRecursiveDecl) {
      const { body: nextBody, name } = parseNamedBlock(body, offset, matchRecursiveDecl[0].length);
      const children = parseDeclarations(nextBody);
      declarations.push({
        name,
        children,
        count: 1,
        type: matchRecursiveDecl[1],
      });
      i += nextBody.split('\n').length - 2;
    } else {
      const matchDecl = line.match(DECLARATION_REGEX);
      if (matchDecl) {
        const [_, type, name, rawLength, rawComment] = matchDecl;
        const comment = rawComment ? rawComment.replace(/(^\/\/|^\/\*|\*\/$)/g, '').replace(/\s+/g, ' ').trim() : null;
        const lengths = rawLength ? rawLength.split(/\D+/).filter(f => !!f).map(i => parseInt(i, 10)) : [1];
        let stringLength = null;
        let count: number | number[] = lengths;
        if (type === 'char') stringLength = lengths.pop();
        if (Array.isArray(count) && count.length === 1) count = count[0];
        if (Array.isArray(count) && count.length === 0) count = 1;
        declarations.push({
          type,
          name,
          count,
          comment,
          stringLength,
        });
      } else if (declarations.length > 0) {
        const matchComment = line.match(COMMENT_REGEX);
        if (matchComment) {
          declarations[declarations.length - 1].comment += matchComment[1].replace(/\s+/g, ' ').trim();
        }
      }
    }
    offset += line.length + 1;
  }
  return declarations;
}

function getSize(decl: CDeclaration, typedefs: CDeclarationIndex): number {
  if (decl.byteLength) return decl.byteLength;
  if (decl.type === 'char') return decl.stringLength;
  if (decl.type === 'union') return Math.max(...decl.children.map(c => getSize(c, typedefs)));
  if (decl.children) return decl.children.reduce((acc: number, c) => acc + (getSize(c, typedefs) * reduceCount(c.count)), 0);
  if (typedefs[decl.type]) return getSize(typedefs[decl.type], typedefs);
  return 0;
}

function applySize(decl: CDeclaration, typedefs: CDeclarationIndex): CDeclaration {
  const next = {
    ...decl,
    byteLength: getSize(decl, typedefs) * reduceCount(decl.count)
  };
  if (decl.children) {
    next.children = decl.children.map(c => applySize(c, typedefs));
  }
  return next;
}

function parseHeaderFile(path: string) {
  const contents = stripSourceCode(readFileSync(path).toString());
  const defines: any = {};
  contents.replace(/^#define (.+)$/mg, parseDefine.bind(null, defines));
  const withDefines = Object.keys(defines).reduce((acc, key) => acc.replace(new RegExp(key, 'g'), defines[key]), contents);
  const typedefs: CDeclarationIndex = {};
  withDefines.replace(/^typedef (struct|union) /mg, parseRootTypedef.bind(null, typedefs));
  Object.keys(typedefs).forEach(className => typedefs[className] = applySize(typedefs[className], typedefs));
  return typedefs;
}

function generateTSDeclaration(decl: CDeclaration, depth = 0, valueOnly = false): string {
  const indent = ('  ' as any).repeat(depth + 1);
  const name = decl.name;
  if (name.match(/^filler\d+$/)) return '';
  let type = decl.type;
  if (decl.type === 'char') {
    type = 'string';
  } else if (decl.type === 'union') {
    type = `
${indent}${decl.children.map(c => generateTSDeclaration(c, depth + 1, true)).join(' | ')}
`;
  } else if (decl.type === 'struct') {
    const unwrappedChildren = decl.children.filter(c => c.type.match(/WA\d/)).map(c => c.type).join(' & ');
    type = `${unwrappedChildren ? unwrappedChildren + ' & ' : ''}{
${indent}${decl.children.map(c => generateTSDeclaration(c, depth + 1)).join('\n  ')}
}`;
  } else if (decl.type.match(/C_WA2_/)) {
    return '';
  }

  const value = type + (decl.count > 1 ? '[]' : '');
  if (valueOnly) return value;

  const declText = `${name}${depth === 0 ? ' = ' : ': '}${value};`;
  return decl.comment ? (declText as any).padEnd(40) + ` // ${decl.comment}` : declText;
}

function generateTypescript(typedefs: CDeclarationIndex): string {
  return Object.keys(typedefs).filter(typeName => typeName.indexOf('*') === -1).map(typeName => {
    return `type ${generateTSDeclaration(typedefs[typeName])}`;
  }).join('\n');
}

function convertKeysToCamelcase(typedefs: CDeclarationIndex) {
  Object.keys(typedefs).forEach(typeName => {
    typedefs[typeName].children = typedefs[typeName].children.map(child => ({
        ...child,
        name: camelCase(child.name),
    }));
  });
}

if (!module.parent) {
  require('dotenv').config();
  const typedefs = parseHeaderFile(resolve(process.env.GEOSUPPORT_DATA_PATH, 'include', 'foruser', 'pac.h'));
  convertKeysToCamelcase(typedefs);

  const outputTS = process.argv.find(arg => arg.toLowerCase() === '--ts');
  if (outputTS) {
    console.log(generateTypescript(typedefs));
  } else {
    console.log(JSON.stringify(typedefs, null, 2));
  }
} else {
  throw new Error('extract-typedefs should be called directly');
}

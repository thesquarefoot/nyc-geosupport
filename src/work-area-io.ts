import { isNotEmpty, reduceCount } from './util';
const typedefs = require('../typedefs.json');

/**
 * @name write
 * @description Creates a string in the provided format using params to populate its keys
 * @param params Object with params to get written at their defined offset
 * @param format Struct type definition
 * @param debug Log details to stdout
 */
export function write<T extends WorkAreaParams>(
  params: Partial<T> = {},
  format: CDeclaration,
  debug: boolean = false
): string {
  const children = format.type === 'union' ? format.children.slice(0, 1) : format.children;
  return children.reduce((acc, field) => {
    const count = reduceCount(field.count);
    let buf = '';
    for (let i = 0; i < count; i++) {
      if (field.type === 'char') {
        let val = params[field.name];
        if (Array.isArray(val)) val = val[i];
        if (debug) {
          console.log(
            '[W]',
            field.name.padEnd(16).substring(0, 16),
            field.stringLength.toString().padStart(4),
            (acc.length + buf.length + 1).toString().padStart(4),
            (acc.length + buf.length + field.stringLength).toString().padStart(4),
            (String(val || '')).padEnd(field.stringLength).substr(0, field.stringLength)
          );
        }
        buf += (String(val || '')).padEnd(field.stringLength).substr(0, field.stringLength);
      } else if (field.type === 'struct') {
        buf += write(params, field, debug);
      } else {
        buf += write(params, typedefs[field.type], debug);
      }
    }
    return acc + buf;
  }, '').toUpperCase();
}

/**
 * @name read
 * @description Reads a struct from a string
 * @param str String to read
 * @param format Struct type definition
 * @param debug Log details to stdout
 * @param initialOffset Character offset to start at
 */
export function read(
  str: string,
  format: CDeclaration,
  debug: boolean = false,
  initialOffset: number = 0
): WorkAreaParams {
  let offset = initialOffset;
  const count = reduceCount(format.count);

  return format.children.reduce((acc, field) => {
    const values: any[] = [];
    const count = reduceCount(field.count);
    const fieldSize = field.byteLength / count;
    for (let i = 0; i < count; i++) {
      switch (field.type) {
        case 'char': {
          const textOffset = offset + (field.stringLength * i);
          if (textOffset + field.stringLength > str.length) {
            throw new Error(`EOF ${textOffset}, ${i}, ${field.stringLength}, ${textOffset}, ${str.length}`);
          }
          if (debug) {
            console.log('[R]',
              (Object.keys(typedefs).find(key => typedefs[key] === format) || '').padEnd(12),
              (field.name + (count > 1 ? ` (${i})` : '')).padEnd(16).substr(0, 16),
              field.stringLength.toString().padStart(5),
              (textOffset + 1).toString().padStart(5),
              (textOffset + field.stringLength).toString().padStart(5),
              `"${str.substr(textOffset, field.stringLength).trim()}"`
            );
          }
          values.push(str.substr(textOffset, field.stringLength).trim());
          break;
        }
        case 'union': {
          for (let j = 0; j < field.children.length; j++) {
            try {
              values.push(read(str, field.children[j], debug, offset + (field.children[j].byteLength * i)));
            } catch (e) {
              break;
            }
          }
          break;
        }
        case 'struct': {
          values.push(read(str, field, debug, offset + (field.byteLength * i)));
          break;
        }
        default: {
          values.push(read(str, typedefs[field.type], debug, offset + (fieldSize * i)));
        }
      }
    }
    if (format.type !== 'union') offset += field.byteLength;

    if (field.name.match(/^filler\d+$/)) {
      // ignore filler fields
      return acc;
    } else if (count === 1 && field.type.match(/WA\d/)) {
      // unwrap nested work areas
      const ret = { ...acc };
      Object.keys(values[0]).forEach(key => {
        (ret as any)[acc.hasOwnProperty(key) ? `${field.name}_${key}` : key] = values[0][key];
      })
      return ret;
    } else {
      return {
        ...acc,
        [field.name]: values.length === 1 ? values[0] : values.filter(isNotEmpty)
      };
    }
  }, {});
}

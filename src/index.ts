import { read, write } from './work-area-io';
import { reprojectCoordinates } from './util';
import geosupport from './ffi-geosupport';

const typedefs = require('../typedefs.json');

const defaultParams: Partial<InputWA1> = {
  platformInd: 'C',
};

/**
 * @name readWorkArea2
 * @description Reads 'Work Area 2' by using input params to detect which table and types to use
 * @param inputWorkArea1 Parameters for Input Work Area 1
 * @param workArea 'Work Area 2' as a string
 * @param debug Log details about reading process to stdout
 */
function readWorkArea2({ funcCode, modeSwitch, segauxSwitch }: Partial<InputWA1>, workArea: string, debug: boolean = false) {
  const curriedRead = (type: CDeclaration) => read(workArea, type, debug);

  switch (funcCode) {
    case '1':
    case '1E':
      if (modeSwitch === 'X') return <C_WA2_F1EX>curriedRead(typedefs.C_WA2_F1EX);
      return <C_WA2_F1>curriedRead(typedefs.C_WA2_F1);
    case '1A':
    case 'BL':
    case 'BN':
      if (modeSwitch === 'X') return <C_WA2_F1AX>curriedRead(typedefs.C_WA2_F1AX);
      return <C_WA2_F1A>curriedRead(typedefs.C_WA2_F1A);
    case '1B':
      return <C_WA2_F1B>curriedRead(typedefs.C_WA2_F1B);
    case 'AP':
      if (modeSwitch === 'X') return <C_WA2_FAPX>curriedRead(typedefs.C_WA2_FAPX);
      return <C_WA2_FAP>curriedRead(typedefs.C_WA2_FAP);
    case '2':
      return <C_WA2_F2>curriedRead(typedefs.C_WA2_F2);
    case '2W':
      return <C_WA2_F2W>curriedRead(typedefs.C_WA2_F2W);
    case '3':
      if (modeSwitch === 'X') {
        if (segauxSwitch === 'Y') return <C_WA2_F3X_AUXSEG>curriedRead(typedefs.C_WA2_F3X_AUXSEG);
        return <C_WA2_F3X>curriedRead(typedefs.C_WA2_F3X);
      }
      if (segauxSwitch === 'Y') return <C_WA2_F3_AUXSEG>curriedRead(typedefs.C_WA2_F3_AUXSEG);
      return <C_WA2_F3>curriedRead(typedefs.C_WA2_F3);
    case '3C':
      if (modeSwitch === 'X') {
        if (segauxSwitch === 'Y') return <C_WA2_F3CX_AUXSEG>curriedRead(typedefs.C_WA2_F3CX_AUXSEG);
        return <C_WA2_F3CX>curriedRead(typedefs.C_WA2_F3CX);
      }
      if (segauxSwitch === 'Y') return <C_WA2_F3C_AUXSEG>curriedRead(typedefs.C_WA2_F3C_AUXSEG);
      return <C_WA2_F3C>curriedRead(typedefs.C_WA2_F3C);
    case '3S':
      return <C_WA2_F3S>curriedRead(typedefs.C_WA2_F3S);
    default:
      return null;
  }
}

/**
 * @name geocode
 * @description Calls Geosupport using the provided params and returns the parsed output
 * @param params Parameters for Input Work Area 1
 * @param debug Log details about work area writing and reading processes to stdout
 */
export default function geocode(params: Partial<InputWA1> = {}, debug: boolean = false) {
  const formattedInput = write<InputWA1>({ ...defaultParams, ...params }, typedefs.INWA1, debug);
  const [rawWorkArea1, rawWorkArea2] = geosupport(formattedInput);
  const outputWorkArea1 = <OUTWA1>read(rawWorkArea1, typedefs.OUTWA1, debug, 360);
  const outputWorkArea2 = readWorkArea2(params, rawWorkArea2, debug);
  const combinedOutput = reprojectCoordinates({ ...outputWorkArea1, ...(outputWorkArea2 || {}) });

  if (debug) {
    console.log('[DEBUG] WA1:', rawWorkArea1.trim());
    console.log('[DEBUG] WA2:', rawWorkArea2.trim());
  }

  return <OUTWA1 & typeof outputWorkArea2>combinedOutput;
}

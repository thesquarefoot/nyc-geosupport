require('dotenv').config();

import { read, write } from './work-area-io';
import { reprojectCoordinates } from './util';
import geosupport from './ffi';

const typedefs = require('../typedefs.json');

const defaultParams: Partial<InputWA1> = {
  platformInd: 'C',
};

function readWorkArea2({ funcCode, modeSwitch, segauxSwitch }: Partial<InputWA1>, workArea: string, debug: boolean = false) {
  const curryRead = (type: CDeclaration) => read(type, workArea, debug);

  switch (funcCode) {
    case '1':
    case '1E':
      if (modeSwitch === 'X') return <C_WA2_F1EX>curryRead(typedefs.C_WA2_F1EX);
      return <C_WA2_F1>curryRead(typedefs.C_WA2_F1);
    case '1A':
    case 'BL':
    case 'BN':
      if (modeSwitch === 'X') return <C_WA2_F1AX>curryRead(typedefs.C_WA2_F1AX);
      return <C_WA2_F1A>curryRead(typedefs.C_WA2_F1A);
    case '1B':
      return <C_WA2_F1B>curryRead(typedefs.C_WA2_F1B);
    case 'AP':
      if (modeSwitch === 'X') return <C_WA2_FAPX>curryRead(typedefs.C_WA2_FAPX);
      return <C_WA2_FAP>curryRead(typedefs.C_WA2_FAP);
    case '2':
      return <C_WA2_F2>curryRead(typedefs.C_WA2_F2);
    case '2W':
      return <C_WA2_F2W>curryRead(typedefs.C_WA2_F2W);
    case '3':
      if (modeSwitch === 'X') {
        if (segauxSwitch === 'Y') return <C_WA2_F3X_AUXSEG>curryRead(typedefs.C_WA2_F3X_AUXSEG);
        return <C_WA2_F3X>curryRead(typedefs.C_WA2_F3X);
      }
      if (segauxSwitch === 'Y') return <C_WA2_F3_AUXSEG>curryRead(typedefs.C_WA2_F3_AUXSEG);
      return <C_WA2_F3>curryRead(typedefs.C_WA2_F3);
    case '3C':
      if (modeSwitch === 'X') {
        if (segauxSwitch === 'Y') return <C_WA2_F3CX_AUXSEG>curryRead(typedefs.C_WA2_F3CX_AUXSEG);
        return <C_WA2_F3CX>curryRead(typedefs.C_WA2_F3CX);
      }
      if (segauxSwitch === 'Y') return <C_WA2_F3C_AUXSEG>curryRead(typedefs.C_WA2_F3C_AUXSEG);
      return <C_WA2_F3C>curryRead(typedefs.C_WA2_F3C);
    case '3S':
      return <C_WA2_F3S>curryRead(typedefs.C_WA2_F3S);
    default:
      return null;
  }
}

export default function geocode(params: Partial<InputWA1> = {}, debug: boolean = false) {
  const formattedInput = write<InputWA1>(typedefs.INWA1, { ...defaultParams, ...params }, debug);
  const [rawWorkArea1, rawWorkArea2] = geosupport(formattedInput);
  const outputWorkArea1 = <OUTWA1>read(typedefs.OUTWA1, rawWorkArea1, debug, 360);
  const outputWorkArea2 = readWorkArea2(params, rawWorkArea2, debug);
  const combinedOutput = { ...outputWorkArea1, ...(outputWorkArea2 || {}) };

  reprojectCoordinates(combinedOutput);

  if (debug) {
    console.log('[DEBUG] WA1:', rawWorkArea1.trim());
    console.log('[DEBUG] WA2:', rawWorkArea2.trim());
  }

  return <OUTWA1 & typeof outputWorkArea2>combinedOutput;
}

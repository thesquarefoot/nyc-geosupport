type CDeclaration = {
  name: string;
  type: 'char' | 'union' | 'struct' | string;
  count?: number | number[];
  comment?: string;
  byteLength?: number;
  stringLength?: number;
  children?: CDeclaration[];
};

type CDeclarationIndex = {
  [typeName: string]: CDeclaration;
};

type WorkAreaParams = {
  [key: string]: any;
};

type StringBooleanFlag = '' | 'N' | 'Y';
declare interface InputWA1 extends INWA1 {
  funcCode: '1' | '1A' | '1B' | '1E' | '1N' | '2' | '2W' | '3' | '3C' | '3S' | 'AP' | 'BB' | 'BF' | 'BL' | 'BN' | 'D' | 'DG' | 'DN';
  longWaFlag: '' | 'L';
  modeSwitch: '' | 'X';
  stNameNorm: '' | 'C' | 'S';
  browseFlag: '' | 'P' | 'F' | 'R';
  realStreetOnly: '' | 'R';
  roadbedrequest: '' | 'R';
  expandedFormat: '' | 'E';
  tpadSwitch: StringBooleanFlag;
  segauxSwitch: StringBooleanFlag;
  wtoSwitch: StringBooleanFlag;
  platformInd: 'C';
}

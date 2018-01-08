export const isNotEmpty = (t: any) => typeof t === 'object' ? Object.keys(t).reduce((a, k) => a || t[k], false) : !!t;

export const reduceCount = (count: number | number[]): number => Array.isArray(count) ? count.reduce((acc, cur) => acc * cur, 1) : (count || 1);

export function indexOfClosingBracket(str: string, openBracket = '{', closeBracket = '}'): number {
  let hasOpened = false;
  let numOpenBrackets = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === openBracket) numOpenBrackets++;
    if (char === closeBracket) numOpenBrackets--;
    if (numOpenBrackets === 0 && hasOpened) return i;
    if (numOpenBrackets > 0 && !hasOpened) hasOpened = true;
  }
  return -1;
}
export const tokenize = (str: string): string[] => str.trim().split(/\s+/);

const reproject = require('proj4')(`
  PROJCS["NAD_1983_StatePlane_New_York_Long_Island_FIPS_3104_Feet",
    GEOGCS["GCS_North_American_1983",
      DATUM["D_North_American_1983",
        SPHEROID["GRS_1980",6378137.0,298.257222101]
      ],
      PRIMEM["Greenwich",0.0],
      UNIT["Degree",0.0174532925199433]
    ],
    PROJECTION["Lambert_Conformal_Conic"],
    PARAMETER["False_Easting",984250.0],
    PARAMETER["False_Northing",0.0],
    PARAMETER["Central_Meridian",-74.0],
    PARAMETER["Standard_Parallel_1",40.66666666666666],
    PARAMETER["Standard_Parallel_2",41.03333333333333],
    PARAMETER["Latitude_Of_Origin",40.16666666666666],
    UNIT["Foot_US",0.3048006096012192]
  ]
`.replace(/\s+/g, ' ')).inverse;

const coordinateKeys = [
  /seg_(from|to)_xyz/,
  /coord/,
];
const isCoordinateKey = (key: string) => coordinateKeys.reduce((acc, reg) => acc || !!reg.test(key), false);
export function reprojectCoordinates(fields: WorkAreaParams): WorkAreaParams {
  return Object.keys(fields).reduce((acc, key) => {
    if (Array.isArray(fields[key]) && isCoordinateKey(key)) {
      for (let i = 0; i < fields[key].length; i += 2) {
        const x = parseInt(fields[key][i]);
        const y = parseInt(fields[key][i + 1]);
        try {
          const latLng = reproject([x, y]);
          acc[key][i] = latLng[1];
          acc[key][i + 1] = latLng[0];
        } catch (e) {
        }
      }
    } else if (Array.isArray(fields[key])) {
      acc[key] = fields[key].map(reprojectCoordinates);
    } else if (typeof fields[key] === 'object') {
      acc[key] = reprojectCoordinates(fields[key]);
    }
    return acc;
  }, { ...fields });
}

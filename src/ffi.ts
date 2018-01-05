import { resolve } from 'path';
import { Library } from 'ffi';

if (!process.env.LD_LIBRARY_PATH) {
  process.env.LD_LIBRARY_PATH = resolve(process.env.GEOSUPPORT_DATA_PATH, 'lib');
} else {
  process.env.LD_LIBRARY_PATH += ':' + resolve(process.env.GEOSUPPORT_DATA_PATH, 'lib');
}

if (!process.env.GEOFILES) {
  process.env.GEOFILES = resolve(process.env.GEOSUPPORT_DATA_PATH, 'fls');
}

const libPath = resolve(process.env.GEOSUPPORT_DATA_PATH, 'lib', 'libgeo.so');
const lib = Library(libPath, {
  geo: [ 'void', [ 'char *', 'char *' ] ]
});

const sharedWA1 = new Buffer(1200);
const sharedWA2 = new Buffer(19274); // Longest defined buffer allocation in the spec

export default function geosupport(input: string) {
  sharedWA1.fill(' ');
  sharedWA2.fill(' ');

  sharedWA1.write(input, 0, input.length, 'utf8');
  lib.geo(sharedWA1, sharedWA2);

  return [sharedWA1.toString(), sharedWA2.toString()];
}

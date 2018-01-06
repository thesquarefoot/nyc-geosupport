/**
 * ffi-geosupport.ts
 *
 * Interfaces with the Geosupport C library using FFI.
 * The following environment variables must be set:
 *   LD_LIBRARY_PATH
 *   GEOFILES
 *   GEOSUPPORT_DATA_PATH
 *
 * Environment variables must be set because of interop with the C library.
 * Calling over FFI requires them to be pre-set; they can't be set from here.
 *
 * Based on the initial work done by
 *   [@chriswhong](https://gist.github.com/chriswhong/2e5f0f41fc5d366ec902613251445b30) and
 *   [@veltman](https://gist.github.com/veltman/2c79458b2226466920dbd601bf94551f)
 */

import { resolve } from 'path';
import { Library } from 'ffi';

const libPath = resolve(process.env.GEOSUPPORT_DATA_PATH, 'lib', 'libgeo.so');
const lib = Library(libPath, {
  geo: [ 'void', [ 'char *', 'char *' ] ]
});

// A single set of buffers is reused to for the C interface's char pointers
const sharedWA1 = new Buffer(1200);
const sharedWA2 = new Buffer(19274); // Longest defined buffer allocation in the spec

/**
 * @param input Input Work Area 1 as a string
 */
export default function geosupport(input: string) {
  sharedWA1.fill(' ');
  sharedWA2.fill(' ');

  sharedWA1.write(input, 0, input.length, 'utf8');
  lib.geo(sharedWA1, sharedWA2);

  return [sharedWA1.toString(), sharedWA2.toString()];
}

/**
 * These bindings interface with the geosupport library using
 * Character-Only Work Areas (COWs). For full documentation on the buffer
 * formats, see the official docs, which include COW tables in the appendix.
 * http://www1.nyc.gov/assets/planning/download/pdf/data-maps/open-data/upg.pdf?r=17d
 *
 * Geosupport is broken up into roughly 19 different functions, which provide
 * different input/output data. For more on these functions and their naming,
 * see the docs. These bindings do not yet implement every function, but it
 * should be fairly trivial to copy over the COWs for those unimplemented.
 *
 * Implemented functions:
 *   1, 1X: Address or Non-Addressable Place Name to Blockface-related data
 *   1A, 1AX: Address or Non-Addressable Place Name to Property-related data
 *   1E, 1EX: 1 + Political Districts
 *   2, 2W: Street Intersection or Named Intersection or Node ID to Intersection-related data
 *   AP: Address to property-related data of Address Point
 *
 * Not yet implemented:
 *   1B: Combined 1A + 1E
 *   1N: Street Name or Place Name to Normalized name and street code
 *   3 : Street Segment-related data
 *   3C: Blockface-related data
 *   3S: Street Stretch-related data
 *   BB, BF: (Browse Backward, Forward) Character string to set of normalized street names
 *   BL: (Block/Lot) BBL to property-related data (same as 1A)
 *   BN: (Building Number) BIN to property- and building- related data
 *   D : (Display) 5-digit street code to Normalized 'primary' name of street
 *   DG: (Display Group) 7-digit street code to Normalized 'principal' name of local group
 *   DN: (Display Name) 10-digit street code to Normalized street name
 *   HR: Geosupport Data Set Information
 *   N*: Street name to Normalized street name
 *
 * Latitude/longitude values also differ for different geosupport functions.
 *   Fn 1 returns the nearest point on a street to the address
 *   Fn 1A returns the building centroid
 *   Fn AP returns the building/address entrance
 */

const { createInputWorkArea, readWorkArea } = require('./workArea');
const { reprojectCoodinates, removePrivateValues } = require('./formatters');
const BUFFER_FORMATS = require('./formats');

const libPath = `${__dirname}/source-data/version-17d_17.4/lib/libgeo.so`;
if (!process.env.LD_LIBRARY_PATH) {
  console.log('LD_LIBRARY_PATH must be set to use the geosupport library');
  process.exit(1);
}
const ffiGeosupport = require('ffi').Library(libPath, {
  geo: [ 'void', [ 'char *', 'char *' ] ]
});

const sharedWA1 = new Buffer(1200);
const sharedWA2 = new Buffer(19274); // Longest defined buffer allocation in the spec

function geocode(functionCode = '1A', params = {}, debug = false) {
  sharedWA1.fill(' ');
  sharedWA2.fill(' ');

  const baseFunctionCode = functionCode.replace(/(X|W)$/, '');
  const extendedMode = functionCode.match(/(X|W)$/);
  const mode = extendedMode && extendedMode[0] === 'X' ? 'X' : '';

  const inputWorkArea = createInputWorkArea(
    BUFFER_FORMATS.WA1_IN,
    Object.assign({
      functionCode: baseFunctionCode,
      mode,
      workAreaFormat: 'C',
      crossStreetNames: 'X'
    }, params)
  );
  sharedWA1.write(inputWorkArea, 'utf8');

  try {
    ffiGeosupport.geo(sharedWA1, sharedWA2);
  } catch (err) {
    console.error('Geosupport FFI error', err);
    return {};
  }

  // Update with results
  const wa1 = sharedWA1.toString();
  const wa2 = sharedWA2.toString();
  if (debug) {
    console.log('[DEBUG] WA1:', wa1.trim());
    console.log('[DEBUG] WA2:', wa2.trim());
  }

  // Read data out of the work area buffers
  const outputFields = readWorkArea(BUFFER_FORMATS.WA1_OUT, 360, wa1);
  const format = BUFFER_FORMATS[`WA2_${functionCode}`];
  if (format) {
    Object.assign(outputFields, readWorkArea(format, 0, wa2));
  }

  // Add eXtended or Wide data
  if (extendedMode) {
    const extendedFormat = BUFFER_FORMATS[`WA2_${functionCode}${extendedMode[0]}`];
    if (extendedFormat) {
      Object.assign(outputFields, readWorkArea(extendedFormat, 300, wa2));
    } else {
      throw new Error(`No extended support for geosupport function "${functionCode}"`);
    }
  }

  // Clean up data before returning
  reprojectCoodinates(outputFields);
  removePrivateValues(outputFields);

  return outputFields;
}

module.exports = {
  geocode
};

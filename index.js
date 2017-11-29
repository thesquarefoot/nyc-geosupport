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

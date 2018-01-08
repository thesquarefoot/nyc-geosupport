require('dotenv').config();

const BASE_URL = 'http://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data';
const VERSION = '17d';

const platform = require('os').platform();
const hasData = !require('fs').existsSync('./source-data')

if (!hasData) {
  if (platform === 'linux') {
    require('download')(`${BASE_URL}/gdelx_${VERSION}.zip`, 'source-data', { extract: true });
  } else if (platform === 'windows') {
    // TODO
    // check installed in %ProgramFiles%\Geosupport Desktop Edition
    // check platform (32: gde_${VERSION}.zip, 64: gde64_${VERSION}.zip)
    throw new Error('Windows support is not yet implemented');
  } else {
    throw new Error('nyc-geosupport only runs on Linux and Windows');
  }
}

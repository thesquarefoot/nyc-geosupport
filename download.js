require('dotenv').config();

if (require('os').platform() !== 'linux') {
  console.error('nyc-geosupport only works on Linux-based OS')
} else {
  if (!require('fs').existsSync('./source-data')) {
    require('download')(process.env.GEOSUPPORT_DATA_URL, 'source-data', { extract: true });
  }
}

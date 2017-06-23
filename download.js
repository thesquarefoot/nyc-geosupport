const DATA_URI = 'http://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/gdelx_17b.zip';

if (require('os').platform() !== 'linux') {
  console.error('nyc-geosupport only works on Linux-based OS')
} else {
  if (!require('fs').existsSync('./source-data')) {
    require('download')(DATA_URI, 'source-data', { extract: true });
  }
}

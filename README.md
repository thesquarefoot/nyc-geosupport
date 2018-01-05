# nyc-geosupport

> Node bindings for NYC DoITT's geosupport package, providing geocoding capabilities for NYC addresses.

### nyc-geosupport will only run on Linux, as it uses compiled binary interfaces to the Geosupport library.

_Based on the initial work done by
[@chriswhong](https://gist.github.com/chriswhong/2e5f0f41fc5d366ec902613251445b30) and
[@veltman](https://gist.github.com/veltman/2c79458b2226466920dbd601bf94551f)_

This package is a barebones interface to the Geosupport library bindings, using Character-Only Work Areas (COWs).
For full detailed information on the different functions, fields, and interpreting their values, see
[the Geosupport User Programming Guide](http://www1.nyc.gov/assets/planning/download/pdf/data-maps/open-data/upg.pdf?r=17d),
which include COW tables in the appendix.

After installation, the binary source data is downloaded (see [download.js](download.js)) from the environment variable `GEOSUPPORT_DATA_URL`. To update the data version, change the URL and unzipped PATH defined in [.env](.env).

- keys and typedefs taken from C headers (pac.h)
- data transforms: keys transformed to camelCase, filler fields ignored, nested work areas flattened
- should be typed for return keys by function code and extended flags

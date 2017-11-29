# nyc-geosupport

> Node bindings for NYC DoITT's geosupport package, providing geocoding capabilities for NYC addresses.

### nyc-geosupport will only run on Linux, as it uses compiled binary interfaces to the Geosupport library.

This package is a extremely barebones interface to the Geosupport library bindings, using Character-Only Work Areas (COWs).
For full documentation on the buffer formats, see
[the official docs](http://www1.nyc.gov/assets/planning/download/pdf/data-maps/open-data/upg.pdf?r=17d),
which include COW tables in the appendix.

Geosupport is broken up into roughly 19 different functions, which provide
different input/output data. For more on these functions and their naming,
see the docs. These bindings do not yet implement every function, but it
should be fairly trivial to copy over the COWs for those unimplemented.

Implemented functions:
  - 1, 1X: Address or Non-Addressable Place Name to Blockface-related data
  - 1A, 1AX: Address or Non-Addressable Place Name to Property-related data
  - 1E, 1EX: 1 + Political Districts
  - 2, 2W: Street Intersection or Named Intersection or Node ID to Intersection-related data
  - AP: Address to property-related data of Address Point

Not yet implemented:
  - 1B: Combined 1A + 1E
  - 1N: Street Name or Place Name to Normalized name and street code
  - 3 : Street Segment-related data
  - 3C: Blockface-related data
  - 3S: Street Stretch-related data
  - BB, BF: (Browse Backward, Forward) Character string to set of normalized street names
  - BL: (Block/Lot) BBL to property-related data (same as 1A)
  - BN: (Building Number) BIN to property- and building- related data
  - D : (Display) 5-digit street code to Normalized 'primary' name of street
  - DG: (Display Group) 7-digit street code to Normalized 'principal' name of local group
  - DN: (Display Name) 10-digit street code to Normalized street name
  - HR: Geosupport Data Set Information
  - N*: Street name to Normalized street name

For geocoding purposes, note that Latitude/longitude values also differ depending on the Geosupport function.
  - Fn 1 returns the nearest point on a street to the address
  - Fn 1A returns the building centroid
  - Fn AP returns the building/address entrance

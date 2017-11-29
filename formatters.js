// Reproject given X/Y coordinates into Latitude and Longitude
// TODO: This projection does not appear to be accurate.
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

module.exports = {
  /**
   * individual field cleanup functions
   */
  trim: str => str.trim(),
  flag: str => Boolean(String(str).trim()),
  // split a string into segments of `len` length, so: split(2)("foobar") => ["fo", "ob", "ar"]
  split: len => str => Array.apply(null, Array(str.length / len)).map((_, i) => str.substr(i * len, len).trim()).filter(f => f),
  removeIfEmpty: str => (str.trim() || undefined),

  /**
   * aggregate functions run on all fields after reading
   */
  // replaces xCoordinate, yCoordinate pairs with reprojected lng, lat
  reprojectCoodinates: fields => Object.keys(fields).forEach(key => {
    if (key.match(/^xCoordinate/)) {
      const yKey = key.replace('xCoordinate', 'yCoordinate');
      const x = fields[key];
      const y = fields[yKey];
      try {
        const latLng = reproject([x, y]);
        delete fields[key];
        delete fields[yKey];
        fields[key.replace('xCoordinate', 'lng')] = latLng[0];
        fields[key.replace('xCoordinate', 'lat')] = latLng[1];
      } catch (e) {}
    }
  }),
  // removes all keys beginning with an underscore
  removePrivateValues: (fields) => Object.keys(fields).forEach(key => {
    if (key.match(/^_/)) delete fields[key];
  }),
};

/**
 * server.ts
 *
 * An extremely basic geocoding server, passing all query params to geosupport.
 * Listens on port 80 by default, or set PORT environment variable.
 * Outputs request params, return/warning codes, and message, to stdout.
 *
 * Example requests:
 *   /?funcCode=1B&hseNbrDisp=48&streetName[]=west+21&zipin=10010
 *   /?funcCode=BN&modeSwitch=X&bldId=1015510
 */

import * as express from 'express';
import { inspect } from 'util';
import geocode from './index';

const app = express();

app.get('/', (req, res) => {
  const { debug, ...params } = req.query;
  const geocoded = geocode(params, debug);
  console.log(
    '[GEOSUPPORT]',
    `retCode: ${geocoded.retCode}, warnCode: ${geocoded.warnCode}, ${geocoded.msg}`,
    inspect(req.query).replace(/\s+/g, ' ')
  );
  res.json(geocoded);
});

app.listen(process.env.PORT || 80);

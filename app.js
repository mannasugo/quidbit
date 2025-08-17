`use strict`;

const { createSecureServer } = require(`http2`);

const { createHash } = require(`crypto`);

const { readFileSync } = require(`fs`);

const { Sql, Tools } = require(`./tools`);

const { Call, fillSwap, io, pollPay} = require(`./route`);

Sql.Sql([readFileSync(`bin/sql/sql.sql`, {encoding: `utf8`}), () => {}]);

let App = createSecureServer({
  key: readFileSync(`bin/http2/ssl/privkey.pem`),
  cert: readFileSync(`bin/http2/ssl/fullchain.pem`),
  allowHTTP1: true}, (call, put) => {Call([call, put]);});

App.on(`error`, (err) => console.error(err));

App.listen(8124);

io(require(`socket.io`)(App));

fillSwap();

Tools.plot([(Spot) => {}]);
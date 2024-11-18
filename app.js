`use strict`;

const { createSecureServer } = require(`http2`);

const { createHash } = require(`crypto`);

const { readFileSync, statSync, writeFileSync } = require(`fs`);

const { Sql, Tools } = require(`./tools`);

const { Call, io, pollPay} = require(`./route`);

Sql.Sql([readFileSync(`constants/sql.sql`, {encoding: `utf8`}), () => {}]);

let App = createSecureServer({
  	key: readFileSync(`http2/ssl/privkey.pem`),
  	cert: readFileSync(`http2/ssl/fullchain.pem`),
  	allowHTTP1: true}, (call, put) => {Call([call, put]);});

App.on(`error`, (err) => console.error(err));

App.listen(8124);

io(require(`socket.io`)(App));
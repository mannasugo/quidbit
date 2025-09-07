`use strict`;

const { readFile, readFileSync, createReadStream, mkdir, stat, writeFile, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

//const RQ = require(`request`);

const { Constants, Sql, Tools } = require(`./tools`);

const hold = new Date(`1996-01-20`).valueOf();

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).valueOf(); 

class Route {

  Call (Arg) {

    let url = (`./${Arg[0].url}`).replace(`//`, `/`).replace(/%(...)/g, (match, hex) => { return String.fromCharCode(parseInt(hex, 16))});

    let State = url.split(`/`);

    if (Arg[0].method === `GET`)  {

      if (State[1] === `favicon.ico`) {

        let File = createReadStream(`bin/webclient/get/svg/v202411141235.svg`);

        Arg[1].writeHead(200, {[`Content-Type`]: `image/svg+xml`});

        File.on(`data`, Arg[1].write.bind(Arg[1]));

        File.on(`close`, () => Arg[1].end());
      }

      else {

        let DOM = readFileSync(`bin/html/app.html`, {encoding: `utf8`});

        let CSS = readFileSync(`bin/css/app.css`, {encoding: `utf8`});

        DOM = DOM.replace(/`css`/, CSS);

        Arg[1].writeHead(200, {[`Content-Type`]: `text/html`});

        Arg[1].end(DOM);
      }
    }

    else if (Arg[0].method === `POST`) {

      let blob = new Buffer.alloc(+Arg[0].headers[`content-length`]);

      let Pull = ``;

      let allocate = 0;

      Arg[0].on(`data`, (Data) => {

        Data.copy(blob, allocate);

        allocate += Data.length;

        Pull += Data;

      }).on(`end`, () => {

        let Pulls;

        if (Pull[0] === `{`) Pulls = JSON.parse(Pull);

        if (State[1] === `json`) {

          Arg[1].setHeader(`Content-Type`, `application/json`);

          if (State[2] === `web`) {

            Sql.pulls(Raw => {

              if (Pulls.pull === `app`) { Arg[1].end(Tools.coats({ago: Tools.plot24(), mug: Pulls.mug, utils: Tools.utils([`index`, `fiat`])})) }

              if (Pulls.pull === `mug`) { 

                                                                if (Pulls.flag === `emailAvail`) {

                                                                        let Mail = [];

                                                                        Raw.mugs[0].forEach(Mug => {

                                                                                if (Mug.email === Pulls.email) Mail.push(Pulls.email);
                                                                        });

                                                                        if (Mail.length === 0) {

                                                                                Arg[1].end(Tools.coats({email: Pulls.email}));
                                                                        }
                                                                }

                                                                if (Pulls.flag === `emailSalt`) {

                                                                        let Obj = [];

                                                                        Raw.mugs[0].forEach(Mug => {

                                                                                if (Mug.email === Pulls.email 
                                                                                        && Mug.lock === createHash(`md5`).update(`${Pulls.salt}`, `utf8`).digest(`hex`)) {

                                                                                        Obj = [Mug.md];
                                                                                }
                                                                        });

                                                                        if (Obj.length > 0) {

                                                                                Arg[1].end(Tools.coats({md: Obj[0]}));
                                                                        }
                                                                }

                                                                if (Pulls.flag === `saltAvail`) {

                                                                        let Mail = [];

                                                                        Raw.mugs[0].forEach(Mug => {

                                                                                if (Mug.email === Pulls.email) Mail.push(Pulls.email);
                                                                        });

                                                                        if (Mail.length === 0) {

                                                                                let TZ = new Date().valueOf();

                                                                                Sql.puts([`mugs`, {
                                                                                        email: Pulls.email,
                                                                                        lock: createHash(`md5`).update(Pulls.salt, `utf8`).digest(`hex`),
                                                                                        md: createHash(`md5`).update(`${TZ}`, `utf8`).digest(`hex`),
                                                                                        stamp: TZ
                                                                                }, (sqlObj) => {

                                                                                        Arg[1].end(Tools.coats({md: createHash(`md5`).update(`${TZ}`, `utf8`).digest(`hex`)}));
                                                                                }]);
                                                                        }
                                                                }
              }

              if (Pulls.pull === `plot`) {

                let S = {};

                Constants.plot.forEach(Plot => {

                  if (Plot[0][0] === Pulls.plot[0] && Plot[0][1] === Pulls.plot[1]) S.plot = Plot;
                });

                if (!S.plot) return;

                let Client = {wallets: {}};

                let Old = [[], [], []]

                if (Raw.mugs[1][Pulls.mug]) {

                  Raw.wallets[0].forEach(Obj => {

                    if (Obj.mug === Pulls.mug) {

                      if (!Client.wallets[Obj.asset]) {Client.wallets[Obj.asset] = []}

                      Client.wallets[Obj.asset].push([Obj.address, Obj.nettype]);
                    }
                  });

                  Old[0] = Tools.oldOpen([Raw, Pulls.mug])[S.plot[0].toString().replace(`,`, `-`)];

                  Old[1] = Tools.oldSwap([Raw, Pulls.mug])[S.plot[0].toString().replace(`,`, `-`)];
                }

                Arg[1].end(Tools.coats({ago: Tools.plot24(), old: Old, plot: S.plot, wallets: Client.wallets, XY: Tools.plotXY([S.plot[0], Pulls.splitX, Pulls.x, Pulls.ts, Pulls.tsDay])}));
              }

              if (Pulls.pull === `trade`) {

                let Plot = [];

                Constants.plot.forEach(Obj => {

                  if (Obj[0][0] === Pulls.plot[0] && Obj[0][1] === Pulls.plot[1]) Plot.push(Obj[0])
                });

                if (Raw.mugs[1][Pulls.mug] && Plot[0]) {

                  let OB = Tools.Y;

                  let ts = new Date().valueOf();

                  let X_Z = new Date(`${new Date(ts).getFullYear()}-${new Date(ts).getMonth() + 1}-${new Date(ts).getDate()} ${new Date(ts).getHours() }:${new Date(ts).getMinutes()}`).valueOf();

                  if (Pulls.flag === `buy`) {

                    if (Pulls.float > 0 && Tools.holding([Raw, Pulls.mug])[Pulls.plot[1]] > Pulls.float && OB[`${Pulls.plot[0]}-${Pulls.plot[1]}`]) {

                      let md = createHash(`md5`).update(`${ts}`, `utf8`).digest(`hex`), value = OB[`${Pulls.plot[0]}-${Pulls.plot[1]}`];

                      if (Pulls.type === `limit` && Pulls.value < value) {

                        Sql.puts([`book`, {info: [`${Pulls.plot[0]}-${Pulls.plot[1]}`, Pulls.value, Pulls.float/Pulls.value], md: md, mug: Pulls.mug, side: `buy`, status: `open`, ts: ts, type: `limit`}, (Q) => {

                          Tools.OB[`${Pulls.plot[0]}-${Pulls.plot[1]}`].push({info: [Pulls.value, Pulls.float/Pulls.value], md: md, mug: Pulls.mug, side: `buy`, status: `open`, ts: ts});

                          Sql.puts([`ledge`, {ilk: `cold`, info: {token: Pulls.plot[1]}, ledge: {[hold]: 0, [Pulls.mug]: [0, -(Pulls.float)]}, md: md, ts: ts}, (Q) => {

                            Arg[1].end(Tools.coats({float: Pulls.float/Pulls.value, mug: Pulls.mug, ts: ts, value: value}));
                          }]);
                        }]);
                      }

                      if (Pulls.type === `market` || (Pulls.type = `limit` && Pulls.value > value)) {

                        let Row = [{
                          ilk: `trade`,
                          info: {token: Pulls.plot[0]}, 
                          ledge: {[hold]: 0, [Pulls.mug]: [0, Pulls.float/value]},
                          md: md, 
                          ts: ts}, {
                          ilk: `trade`,
                          info: {token: Pulls.plot[1]},
                          ledge: {[hold]: 0, [Pulls.mug]: [0, -(Pulls.float)]}, 
                          md: md, 
                          ts: ts}];

                        Sql.putlist([`ledge`, Row, (Q) => {

                          Sql.puts([`trades`, {info: [`${Pulls.plot[0]}-${Pulls.plot[1]}`, value, Pulls.float/value], md: md, mug: Pulls.mug, side: `buy`, ts: ts}, (Q) => {

                            Tools.XY[`${Pulls.plot[0]}-${Pulls.plot[1]}`][X_Z].push([ts, value, Pulls.float/value]);

                            Arg[1].end(Tools.coats({float: Pulls.float/value, mug: Pulls.mug, ts: ts, value: value}))
                          }]);
                        }]);
                      }
                    }
                  }

                  if (Pulls.flag === `sell`) {

                    if (Pulls.float > 0 && Tools.holding([Raw, Pulls.mug])[Pulls.plot[0]] > Pulls.float && OB[`${Pulls.plot[0]}-${Pulls.plot[1]}`]) {

                      let md = createHash(`md5`).update(`${ts}`, `utf8`).digest(`hex`),  value = OB[`${Pulls.plot[0]}-${Pulls.plot[1]}`];

                      let Row = [{
                        ilk: `trade`,
                        info: {token: Pulls.plot[1]}, 
                        ledge: {[hold]: 0, [Pulls.mug]: [0, Pulls.float*value]},
                        md: md, 
                        ts: ts}, {
                        ilk: `trade`,
                        info: {token: Pulls.plot[0]},
                        ledge: {[hold]: 0, [Pulls.mug]: [0, -(Pulls.float)]},
                        md: md, 
                        ts: ts}];

                      Sql.putlist([`ledge`, Row, (Q) => {

                        Sql.puts([`trades`, {info: [`${Pulls.plot[0]}-${Pulls.plot[1]}`, value, Pulls.float], md: md, mug: Pulls.mug, side: `sell`, ts: ts}, (Q) => {

                          Tools.XY[`${Pulls.plot[0]}-${Pulls.plot[1]}`][X_Z].push([ts, value, Pulls.float]);

                          Arg[1].end(Tools.coats({mug: Pulls.mug}))}])
                      }]);
                    }
                  }
                }
              }

              if (Pulls.pull === `wallets`) {

                                                                let Client = {wallets: {}};

                                                                if (Raw.mugs[1][Pulls.mug]) {

                                                                        let File = Tools.typen(readFileSync(`json/wallets.json`, {encoding: `utf8`}));

                                                                        let Roll = [[], [], []];

                                                                        if (Pulls.flag === `balance`) {

                                                                                let Hold = [[], {}];

                                                                                Raw.wallets[0].forEach(Obj => {

                                                                                        if (Obj.mug === Pulls.mug) {Hold[0].push(Obj.address)}
                                                                                });

                                                                                let File = Tools.typen(readFileSync(`json/txscan.json`, {encoding: `utf8`})), Tofile = [[], []];

                                                                                let Poll = [[]];

                                                                                Raw.ledge[0].forEach(Obj => {if (Obj.ilk === `deposit`) Poll[0].push(`${Obj.info.ts}_${Obj.info.txmd}`)});

                                                                                File.forEach(Obj => {

                                                                                        if (Poll[0].indexOf(`${Obj.ts}_${Obj.txmd}`) === -1) {Tofile[0].push(Obj)}
                                                                                });

                                                                                if (Raw.ledge[0].length === 0) { Tofile[0] = File }

                                                                                Tofile[0].forEach(Obj => {

                                                                                        if (Hold[0].indexOf(Obj.in) > -1) { 

                                                                                                Tofile[1].push({
                                                                                                        ilk: `deposit`, 
                                                                                                        info: Obj, 
                                                                                                        ledge: {
                                                                                                                [hold]: 0,
                                                                                                                [Pulls.mug]: [0, Obj.value]}, 
                                                                                                        md: createHash(`md5`).update(`${Obj.ts}`, `utf8`).digest(`hex`),
                                                                                                        ts: Obj.ts}); 
                                                                                        }
                                                                                });

                                                                                Sql.putlist([`ledge`, Tofile[1], (SQ) => {

                                                                                        Arg[1].end(Tools.coats({hold: Tools.holding([Raw, Pulls.mug])}));
                                                                                }]);
                                                                        }

                                                                        if (Pulls.flag === `init`) {

                                                                                Raw.wallets[0].forEach(Obj => {

                                                                                        if (Pulls.wallet[1] === Obj.nettype) {Roll[1].push(Obj.address)}

                                                                                        if (Obj.mug === Pulls.mug) {

                                                                                                if (!Client.wallets[Obj.asset]) {Client.wallets[Obj.asset] = []}
                                                                                        }
                                                                                });

                                                                                File[Pulls.wallet[0]].forEach(Obj => {

                                                                                        if (Obj[2] === Pulls.wallet[1]) {Roll[0].push(Obj[0])}
                                                                                });

                                                                                Roll[0].forEach(address => {

                                                                                        if (Roll[1].indexOf(address) === -1) {Roll[2].push(address)}
                                                                                });

                                                                                if (Roll[2].length === 0) return;

                                                                                let TZ = new Date().valueOf();

                                                                                Sql.puts([`wallets`, {
                                                                                        address: Roll[2][0],
                                                                                        asset: Pulls.wallet[0],
                                                                                        md: createHash(`md5`).update(`${TZ}`, `utf8`).digest(`hex`),
                                                                                        mug: Pulls.mug,
                                                                                        nettype: Pulls.wallet[1],
                                                                                        stamp: TZ
                                                                                }, (SqlObj) => {

                                                                                        Arg[1].end(Tools.coats({address: Roll[2][0]}));
                                                                                }]);            
                                                                        }

                                                                        if (Pulls.flag === `walletto`) {

                                                                                if (Pulls.float > 0 && Tools.holding([Raw, Pulls.mug])[Pulls.wallet[1][0]] > Pulls.float) {

                                                                                        let ts = new Date().valueOf();

                                                                                        let md = createHash(`md5`).update(`${ts}`, `utf8`).digest(`hex`);

                                                                                        Sql.puts([`walletto`,  {
                                                                                                complete: false,
                                                                                                float: Pulls.float,
                                                                                                md: md,
                                                                                                mug: Pulls.mug,
                                                                                                ts: ts,
                                                                                                walletto: Pulls.wallet}, (Q) => {

                                                                                                        Sql.puts([`ledge`, {
                                                                                                                ilk: `withdraw`, 
                                                                                                                info: {to: Pulls.wallet, token: Pulls.wallet[1][0]}, 
                                                                                                                ledge: {
                                                                                                                        [hold]: 0,
                                                                                                                        [Pulls.mug]: [0, -(Pulls.float)]}, 
                                                                                                                md: md,
                                                                                                                ts: ts}, (Pay) => {Arg[1].end(Tools.coats({mug: Pulls.mug}))}]);
                                                                                                }]);
                                                                                }
                                                                        }
                                                                }
              }
            });
}}});
    }
  }

  fillSwap (Arg) {

    Constants.plot.forEach(Y => {

      Tools.OB[`${Y[0][0]}-${Y[0][1]}`] = [];
    });
  }

  io (App) {

    App.on(`connection`, Polling => {

      setInterval(() => {

        let YValue = [];

        for (let plot in Tools.Y) {YValue.push([plot, Tools.Y[plot]])}

        App.emit(`plotY`, YValue);

      }, 1000);

      Polling.on(`az`, Arg => {App.emit(`az`, [Arg[4], Tools.plotXY([Arg[0], Arg[1], Arg[2], Arg[3], Arg[5]])])});

    /**  Polling.on(`toSwap`, Arg => {

        let Swap = [[], [[], []]];

        Tools.OB[`${Arg[0][0]}-${Arg[0][1]}`].forEach(Obj => {

          Arg[1].forEach(Old => {

            if (Obj.mug === Arg[2] && Old[3] === Obj.ts && Obj.status === `close`) { Swap[0].push(Obj) }       
          });
        });

        if (Swap[0].length > 0) {

          Sql.pulls(Raw => {

            Swap[0].forEach(Obj => {

              if (Raw.book[1][Obj.md] && Raw.book[1][Obj.md].status === `open`) {

                let md = createHash(`md5`).update(`${Obj.execute}`, `utf8`).digest(`hex`);

                if (Obj.side === `buy`) {

                  Swap[1][0].push({ilk: `trade`, info: {token: Arg[0][0]}, ledge: {[hold]: 0, [Obj.mug]: [0, Obj.info[2]]}, md: md, ts: Obj.execute});

                  Swap[1][0].push({ilk: `trade`, info: {token: Arg[0][1]}, ledge: {[hold]: 0, [Obj.mug]: [0, -(Obj.info[1]*Obj.info[2])]}, md: md, ts: Obj.execute});

                  Swap[1][1].push({info: Obj.info, md: md, mug: Obj.mug, side: `buy`, ts: Obj.execute});

                  let Old = Tools.typen(Tools.coats(Raw.book[1][Obj.md]));

                  Raw.book[1][Obj.md][`execute`] = Obj.execute;

                  Raw.book[1][Obj.md].status = `close`;

                  Sql.places([`book`, Raw.book[1][Obj.md], Old, (Q) => {}]);
                }
              }
            });

            Sql.putlist([`ledge`, Swap[1][0], (Q) => {

              Sql.putlist([`trades`, Swap[1][1], (Q) => {

                Sql.pulls(Raw => {

                  let Old = [];

                  Old[0] = Tools.oldOpen([Raw, Arg[2]])[`${Arg[0][0]}-${Arg[0][1]}`];

                  Old[1] = Tools.oldSwap([Raw, Arg[2]])[`${Arg[0][0]}-${Arg[0][1]}`];

                  App.emit(`toSwap`, [Arg[2], Old]);
                });
              }]);
            }]);
          });
        }
      });**/
    });
  }
}

module.exports = new Route();
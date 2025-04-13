`use strict`;

const { readdir, readFile, readFileSync, createReadStream, mkdir, stat, writeFile, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

//const RQ = require(`request`);

const { Constants, Sql, Tools } = require(`./tools`);

const hold = new Date(`1996-01-20`).valueOf();

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).valueOf(); 

class Route {

	Call (Arg) {

		let url = (`./${Arg[0].url}`).replace(`//`, `/`).replace(/%(...)/g, (match, hex) => {

			return String.fromCharCode(parseInt(hex, 16));
		});

		let State = url.split(`/`);

		if (Arg[0].method === `GET`)  {

			if (State[1] === `favicon.ico`) {

				let File = createReadStream(`ssl/given/svg/v202411141235.svg`);

				Arg[1].writeHead(200, {[`Content-Type`]: `image/svg+xml`});

				File.on(`data`, Arg[1].write.bind(Arg[1]));

				File.on(`close`, () => Arg[1].end());
			}

			else {

				let DOM = readFileSync(`constants/app.html`, {encoding: `utf8`});

				let CSS = readFileSync(`constants/app.css`, {encoding: `utf8`});

				DOM = DOM.replace(/`css`/, CSS);

				Arg[1].writeHead(200, {[`Content-Type`]: `text/html`});

				Arg[1].end(DOM);
			}
		}

		else if (Arg[0].method == `POST`) {

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

							if (Pulls.pull === `app`) { 

								Arg[1].end(Tools.coats({
									ago: Tools.plot24(), mug: Pulls.mug, utils: Tools.utils([`index`, `fiat`])}));
							}

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

								if (Raw.mugs[1][Pulls.mug]) {

									Raw.wallets[0].forEach(Obj => {

										if (Obj.mug === Pulls.mug) {

											if (!Client.wallets[Obj.asset]) {Client.wallets[Obj.asset] = []}

											Client.wallets[Obj.asset].push([Obj.address, Obj.nettype]);
										}
									});
								}

								Arg[1].end(Tools.coats({
									ago: Tools.plot24(), 
									plot: S.plot, wallets: Client.wallets, 
									XY: Tools.plotXY([S.plot[0], Pulls.splitX, Pulls.x, new Date().valueOf()])}));
							}

							if (Pulls.pull === `util`) {

								if (Pulls.flag[0] === `fiat` && Pulls.flag[1] === `index`) {

									Arg[1].end(Tools.coats({
										mug: Pulls.mug, utils: Tools.utils([`index`, `fiat`])}));
								}

								if (Pulls.flag[0] === `spot` && Pulls.flag[1] === `index`) {

									Arg[1].end(Tools.coats({
										mug: Pulls.mug, utils: Tools.utils([`index`, `spot`])}));
								}

								if (Pulls.flag[0] === `tokens` && Pulls.flag[1] === `index`) {

									Arg[1].end(Tools.coats({
										mug: Pulls.mug, utils: Tools.utils([`index`, `tokens`])}));
								}
							}

							if (Pulls.pull === `trade`) {

								let Plot = [];

								Constants.plot.forEach(Obj => {

									if (Obj[0][0] === Pulls.plot[0] && Obj[0][1] === Pulls.plot[1]) Plot.push(Obj[0])
								});

								if (Raw.mugs[1][Pulls.mug] && Plot[0]) {

									if (Pulls.flag === `buy`) {

										let OB = [Tools.typen(readFileSync(`json/SPOT_BOOK.json`, {encoding: `utf8`})), {}];

										OB[0].forEach(Obj => {OB[1][Obj[0]] = Obj[1]});

										if (Pulls.float > 0 && Tools.holding([Raw, Pulls.mug])[Pulls.plot[1]] > Pulls.float 
											&& OB[1][`${Pulls.plot[0]}-${Pulls.plot[1]}`]) {

											let ts = new Date().valueOf();

											let md = createHash(`md5`).update(`${ts}`, `utf8`).digest(`hex`), 

												value = OB[1][`${Pulls.plot[0]}-${Pulls.plot[1]}`];

											let Row = [{
												ilk: `trade`,
												info: {token: Pulls.plot[0]}, 
												ledge: {
													[hold]: 0,	
													[Pulls.mug]: [0, Pulls.float/value]},
												md: md, 
												ts: ts}, {
												ilk: `trade`,
												info: {token: Pulls.plot[1]},
												ledge: {
													[hold]: 0,
													[Pulls.mug]: [0, -(Pulls.float)]},
												md: md, 
												ts: ts}];

											Sql.putlist([`ledge`, Row, (Q) => {Arg[1].end(Tools.coats({mug: Pulls.mug}))}]);
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
								}

								//Arg[1].end(Tools.coats({wallets: Client.wallets}));
							}
						});}}});
		}
	}

	io (App) {

		App.on(`connection`, Polling => {

			setInterval(() => {

				readFile(`json/SPOT_BOOK.json`, {encoding: `utf8`}, (flaw, Coat) => {

					Coat = Tools.typen(Coat);

					if (Coat.length > 0) App.emit(`SPOT_BOOK`, Coat);
				});

			}, 4000);

			Polling.on(`az`, Arg => {

				App.emit(`az`, [Arg[4], Tools.plotXY([Arg[0], Arg[1], Arg[2], Arg[3]])]);
			});});
	}
}

module.exports = new Route();
`use strict`;

const {createConnection} = require(`mysql`);

const { mkdir, readFile, readFileSync, stat, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const RQ = require(`request`);

const hold = new Date(`1996-01-20`).valueOf();

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).valueOf();

class Sql {
	
	constructor (Arg) {

		this.credentials = Arg[0];
	}

	Sql (Arg) {

		return createConnection(this.credentials).query(Arg[0], (A, B, C) => Arg[1]([A, B, C]));
	}

	pulls (Arg) {

		this.credentials.database = `qb`;

		this.Sql([readFileSync(`constants/tables.sql`, {encoding: `utf8`}), (Raw) => {

			let Put = [`mugs`];

			let Puts = {};

			Put.forEach(put => Puts[put] = [[], {}]);

			Raw[1].forEach((Put, put) => {console.log(Put[put])});

			Arg(Puts);

		}]);
	}

    places (Arg) {

        this.credentials.database = `qb`;

        this.Sql([{
            sql: `update ${Arg[0]} set json = ? where json = ?`,
            values: [JSON.stringify(Arg[1]), JSON.stringify(Arg[2])]}, (Raw) => Arg[3](Raw)]);
    }

	putlist (Arg) {

		this.credentials.database = `qb`;

		let Put = [];

		Arg[1].forEach(MD => {

			Put.push([new Tools().coats(MD)]);
		});

		this.Sql([{
			sql: `insert into ?? (json) values?`,
			values: [Arg[0], Put]}, (Raw) => Arg[2](Raw)]);			
	}

	puts (Arg) {

		this.credentials.database = `qb`;

		this.Sql([{
			sql: `insert into ?? set ?`,
			values: [Arg[0], {json: JSON.stringify(Arg[1])}]}, (Raw) => Arg[2](Raw)]);			
	}
}

class Tools {

	constructor () {}

	coats (types) { return JSON.stringify(types); }

	plotXY (Arg) {

		let PlotXY = [];

		if (Arg[1] === `1M`) {

			let XY = [];

			for (let A = 0; A < 9; A++) {

				XY = XY.concat(this.typen(readFileSync(`json/plot/${Arg[0][0]}_${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));

				XY = XY.concat(this.typen(readFileSync(`json/daily/${Arg[0][0]}${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));
			}

			let X_Z = new Date(`${new Date(Arg[3]).getFullYear()}-${new Date(Arg[3]).getMonth() + 1}-${new Date(Arg[3]).getDate()} ${new Date(Arg[3]).getHours() }:${new Date(Arg[3]).getMinutes()}`).valueOf();

			for (let A = 0; A < Arg[2]; A++) {

				let Plot = [];
										
				XY.forEach(X_Y => {

					if (X_Y.ts_z > X_Z - 60000*A && X_Y.ts_z < (X_Z - 60000*A) + 60000) Plot.push([X_Y.pair[1][1], X_Y.ts_z])
				});

				let OC = this.typen(this.coats(Plot)).sort((A, B) => {return A[1] - B[1]});

				let HL = this.typen(this.coats(Plot)).sort((A, B) => {return B[0] - A[0]});
										
				PlotXY.push([X_Z - 60000*A, (OC.length > 0)? [OC[0][0], OC[OC.length -1][0]]: [], (HL.length > 0)? [HL[0][0], HL[HL.length -1][0]]: []]) //OCHL
			}
		}

		if (Arg[1] === `3M`) {

			let XY = [];

			for (let A = 0; A < 9; A++) {

				XY = XY.concat(this.typen(readFileSync(`json/plot/${Arg[0][0]}_${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));

				XY = XY.concat(this.typen(readFileSync(`json/daily/${Arg[0][0]}${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));
			}

			let Z = new Date(Arg[3]).getMinutes();

			if (new Date(Arg[3]).getMinutes()%3 === 1) Z = new Date().getMinutes() - 1;

			if (new Date(Arg[3]).getMinutes()%3 === 2) Z = new Date().getMinutes() - 2;

			let X_Z = new Date(`${new Date(Arg[3]).getFullYear()}-${new Date(Arg[3]).getMonth() + 1}-${new Date(Arg[3]).getDate()} ${new Date(Arg[3]).getHours()}:${Z}`).valueOf();

			for (let A = 0; A < Arg[2]; A++) {

				let Plot = [];
										
				XY.forEach(X_Y => {

					if (X_Y.ts_z > X_Z - 180000*A && X_Y.ts_z < (X_Z - 180000*A) + 180000) Plot.push([X_Y.pair[1][1], X_Y.ts_z, X_Y.allocate]);
				});

				let OC = this.typen(this.coats(Plot)).sort((A, B) => {return A[1] - B[1]});

				let HL = this.typen(this.coats(Plot)).sort((A, B) => {return B[0] - A[0]});
										
				PlotXY.push([X_Z - 180000*A, (OC.length > 0)? [OC[0][0], OC[OC.length -1][0]]: [], (HL.length > 0)? [HL[0][0], HL[HL.length -1][0]]: [], (OC.length > 0)? OC[OC.length -1][2]: 0]) //OCHL
			}
		}

		if (Arg[1] === `5M`) {

			let XY = [];

			for (let A = 0; A < 9; A++) {

				XY = XY.concat(this.typen(readFileSync(`json/plot/${Arg[0][0]}_${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));

				XY = XY.concat(this.typen(readFileSync(`json/daily/${Arg[0][0]}${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));
			}

			let Z = Math.floor(new Date(Arg[3]).getMinutes()/5)*5*60000;

			let X_Z = new Date(`${new Date(Arg[3]).getFullYear()}-${new Date(Arg[3]).getMonth() + 1}-${new Date(Arg[3]).getDate()} ${new Date(Arg[3]).getHours()}:00`).valueOf() + Z;

			for (let A = 0; A < Arg[2]; A++) {

				let Plot = [];
										
				XY.forEach(X_Y => {

					if (X_Y.ts_z > X_Z - 300000*A && X_Y.ts_z < (X_Z - 300000*A) + 300000) Plot.push([X_Y.pair[1][1], X_Y.ts_z, X_Y.allocate]);
				});

				let OC = this.typen(this.coats(Plot)).sort((A, B) => {return A[1] - B[1]});

				let HL = this.typen(this.coats(Plot)).sort((A, B) => {return B[0] - A[0]});
										
				PlotXY.push([X_Z - 300000*A, (OC.length > 0)? [OC[0][0], OC[OC.length -1][0]]: [], (HL.length > 0)? [HL[0][0], HL[HL.length -1][0]]: [], (OC.length > 0)? OC[OC.length -1][2]: 0]) //OCHL
			}
		}

		if (Arg[1] === `15M`) {

			let XY = [];

			for (let A = 0; A < 19; A++) {

				XY = XY.concat(this.typen(readFileSync(`json/plot/${Arg[0][0]}_${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));

				XY = XY.concat(this.typen(readFileSync(`json/daily/${Arg[0][0]}${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));
			}

			let Z = Math.floor(new Date(Arg[3]).getMinutes()/15)*15*60000;

			let X_Z = new Date(`${new Date(Arg[3]).getFullYear()}-${new Date(Arg[3]).getMonth() + 1}-${new Date(Arg[3]).getDate()} ${new Date(Arg[3]).getHours()}:00`).valueOf() + Z;

			for (let A = 0; A < Arg[2]; A++) {

				let Plot = [];
										
				XY.forEach(X_Y => {

					if (X_Y.ts_z > X_Z - 900000*A && X_Y.ts_z < (X_Z - 900000*A) + 900000) Plot.push([X_Y.pair[1][1], X_Y.ts_z, X_Y.allocate]);
				});

				let OC = this.typen(this.coats(Plot)).sort((A, B) => {return A[1] - B[1]});

				let HL = this.typen(this.coats(Plot)).sort((A, B) => {return B[0] - A[0]});
										
				PlotXY.push([X_Z - 900000*A, (OC.length > 0)? [OC[0][0], OC[OC.length -1][0]]: [], (HL.length > 0)? [HL[0][0], HL[HL.length -1][0]]: [], (OC.length > 0)? OC[OC.length -1][2]: 0]) //OCHL
			}
		}

		if (Arg[1] === `1H`) {

			let XY = [];

			for (let A = 0; A < 19; A++) {

				XY = XY.concat(this.typen(readFileSync(`json/plot/${Arg[0][0]}_${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));

				XY = XY.concat(this.typen(readFileSync(`json/daily/${Arg[0][0]}${Arg[0][1]}_${DAY - 3600000*24*A}.json`, {encoding: `utf8`})));
			}

			let X_Z = new Date(`${new Date(Arg[3]).getFullYear()}-${new Date(Arg[3]).getMonth() + 1}-${new Date(Arg[3]).getDate()} ${new Date(Arg[3]).getHours() }:00`).valueOf();

			for (let A = 0; A < Arg[2]; A++) {

				let Plot = [];
										
				XY.forEach(X_Y => {

					if (X_Y.ts_z > X_Z - 3600000*A && X_Y.ts_z < (X_Z - 3600000*A) + 3600000) Plot.push([X_Y.pair[1][1], X_Y.ts_z, X_Y.allocate]);
				});

				let OC = this.typen(this.coats(Plot)).sort((A, B) => {return A[1] - B[1]});

				let HL = this.typen(this.coats(Plot)).sort((A, B) => {return B[0] - A[0]});
										
				PlotXY.push([X_Z - 3600000*A, (OC.length > 0)? [OC[0][0], OC[OC.length -1][0]]: [], (HL.length > 0)? [HL[0][0], HL[HL.length -1][0]]: [], (OC.length > 0)? OC[OC.length -1][2]: 0]) //OCHL
			}
		}

		return PlotXY;
	}

	plot (Raw) {

		Constants.plot.forEach(Plot => {

			writeFileSync(`json/daily/${Plot[0][0]}${Plot[0][1]}_${DAY}.json`, this.coats([]));

			stat(`json/plot/${Plot[0][0]}_${Plot[0][1]}_${DAY - 3600000*24}.json`, (bug, Stat) => {

				if (bug) {

					writeFileSync(`json/plot/${Plot[0][0]}_${Plot[0][1]}_${DAY - 3600000*24}.json`, this.coats([]));

					writeFileSync(`json/daily/${Plot[0][0]}${Plot[0][1]}_${DAY - 3600000*24}.json`, this.coats([]));
				}
			});

			let PREDAY = new Date(DAY - 3600000*24);

			let file = (`json/daily/${Plot[0][0]}${Plot[0][1]}_${PREDAY.getFullYear()}${((PREDAY.getMonth() + 1) > 9)? ``: `0`}${PREDAY.getMonth() + 1}${(PREDAY.getDate() > 9)? ``: `0`}${PREDAY.getDate()}.csv`)

			stat(file, (flaw, Stat) => {

				if (!flaw) {

					let Obj = [], 

						CSV = readFileSync(file, {encoding: `utf8`});

					CSV = CSV.split(`\n`); 

					//if (parseInt(CSV[0][0][0]) > 0) CSV = CSV.slice(2);

					CSV.forEach(Value => {

						if (Value.indexOf(`,`) === -1) {

							Value = Value.split(`\t`);

							/*

							Value[0] = `${Value[0]} ${Value[1]}`;console.log(Value)

							Value[1] = Value[2];

							Value[2] = Value[3];

							Value[3] = Value[4];

							Value[4] = Value[5];

							Value[5] = Value[6];

							*/
						}

						else { Value = Value.split(`,`) } //OHLC

						(Value[0].indexOf(`/`) > -1 || Value[0].indexOf(`-`) > -1)? Value[0] = new Date(Value[0]).valueOf(): Value[0] = parseFloat(Value[0]);

						if (Value[0].toString().length > 13) {Value[0] = parseFloat(Value[0].toString().substr(0, 13));}

						Obj.push({
							allocate: (parseInt(CSV[0][0][0]) > 0 || Value.indexOf(`,`) === -1)? parseFloat(Value[5]): 0,
							ilk: `market`,
							md: createHash(`md5`).update(`${Value[0]}`, `utf8`).digest(`hex`),
							mug: hold,
							pair: [[Plot[0][0], Plot[0][1]], [0, Value[1]]],
							side: `buy`,
							ts: Value[0],
							ts_z: Value[0]});

						Obj.push({
							allocate: (parseInt(CSV[0][0][0]) > 0 || Value.indexOf(`,`) === -1)? parseFloat(Value[5]): 0,
							ilk: `market`,
							md: createHash(`md5`).update(`${Value[0] + 59975}`, `utf8`).digest(`hex`),
							mug: hold,
							pair: [[Plot[0][0], Plot[0][1]], [0, Value[4]]],
							side: `buy`,
							ts: Value[0] + 59975,
							ts_z: Value[0] + 59975});

						for (let A = 0; A < 2; A++) {

							Obj.push({
								allocate: (parseInt(CSV[0][0][0]) > 0 || Value.indexOf(`,`) === -1)? parseFloat(Value[5]): 0,
								ilk: `market`,
								md: createHash(`md5`).update(`${Value[0] + 60000*(A+1)/4}`, `utf8`).digest(`hex`),
								mug: hold,
								pair: [[Plot[0][0], Plot[0][1]], [0, Value[A+2]]],
								side: `buy`,
								ts: Value[0] + 60000*(A+1)/4,
								ts_z: Value[0] + 60000*(A+1)/4});
						}
					});

					writeFileSync(`json/daily/${Plot[0][0]}${Plot[0][1]}_${DAY - 3600000*24}.json`, this.coats(Obj));
				}
			});
		});

			//let Spot = [];

		setInterval(() => {

			let Spot = []; //{"data":{"amount":"3483.535","base":"ETH","currency":"USD"}}

			Constants.plot.forEach(Plot => {

				stat(`json/plot/${Plot[0][0]}_${Plot[0][1]}_${DAY}.json`, (bug, Stat) => {

					if (bug) writeFileSync(`json/plot/${Plot[0][0]}_${Plot[0][1]}_${DAY}.json`, this.coats([]));

					RQ(`https://api.coinbase.com/v2/prices/${Plot[0][0]}-${Plot[0][1]}/spot`, (flaw, State, coat) => {

						if (flaw || State.statusCode !== 200) {

							let XY = this.typen(readFileSync(`json/plot/${Plot[0][0]}_${Plot[0][1]}_${DAY}.json`, {encoding: `utf8`}));

							XY = XY.sort((A, B) => {return B.ts_z - A.ts_z});

							if (XY[0]) {

								Spot.push([Plot[0].toString().replace(`,`, `-`), parseFloat(XY[0].pair[1][1])]);

								//writeFileSync(`json/SPOT_BOOK.json`, this.coats(Spot));
							}
						}

						if (!flaw && State.statusCode === 200 && this.typen(coat) && this.typen(coat).data 
							&& parseFloat(this.typen(coat).data.amount) > 0) {
		
							let COST = parseFloat(this.typen(coat).data.amount).toFixed(Plot[1]), STAMP = new Date().valueOf();

							let Pair = {
								allocate: 0,
								ilk: `market`,
								md: createHash(`md5`).update(`${STAMP}`, `utf8`).digest(`hex`),
								mug: hold,
								pair: [[Plot[0][0], Plot[0][1]], [0, COST]],
								side: `buy`,
								ts: STAMP,
								ts_z: STAMP
							};

							Spot.push([Plot[0].toString().replace(`,`, `-`), COST]);

							let Execute = this.typen(readFileSync(`json/EXECUTE_BOOK.json`, {encoding: `utf8`}));

							if (typeof Execute === `object`) Execute.push(Pair);

							writeFileSync(`json/EXECUTE_BOOK.json`, this.coats(Execute));

							//if (Spot.length > 20) {

								writeFileSync(`json/SPOT_BOOK.json`, this.coats(Spot));				
							//}
						}
					});
				});	
			});
		}, 6000);

		//setInterval(() => { console.log(Spot.length); writeFileSync(`json/SPOT_BOOK.json`, this.coats(Spot)); }, 7500);

		setInterval(() => {

			let Plot = this.typen(readFileSync(`json/EXECUTE_BOOK.json`, {encoding: `utf8`}));

			writeFileSync(`json/EXECUTE_BOOK.json`, this.coats([]));

			if (typeof Plot !== `object`) return;

			Plot.forEach(B => {

				let Dayplot = this.typen(readFileSync(`json/plot/${B.pair[0][0]}_${B.pair[0][1]}_${DAY}.json`, {encoding: `utf8`}));

				if (typeof Dayplot === `object`) {

					Dayplot.push(B);

					writeFileSync(`json/plot/${B.pair[0][0]}_${B.pair[0][1]}_${DAY}.json`, this.coats(Dayplot));
				}
			});	
		}, 50000)
	}

	plot24 () {

		let Plot24 = {};

		Constants.plot.forEach(Plot => {

			let XY24 = [];

			let XY = this.typen(readFileSync(`json/plot/${Plot[0][0]}_${Plot[0][1]}_${DAY - 3600000*24}.json`, {encoding: `utf8`}));
			
			XY.forEach(X_Y => {

				if (X_Y.ts_z > (new Date().valueOf() - 3600000*24) && X_Y.ts_z < (new Date().valueOf() - 3600000*21)) XY24.push([X_Y.pair[1][1], X_Y.ts_z]);
			});

			this.typen(readFileSync(`json/daily/${Plot[0][0]}${Plot[0][1]}_${DAY - 3600000*24}.json`, {encoding: `utf8`})).forEach(X_Y => {

				if (X_Y.ts_z > (new Date().valueOf() - 3600000*24) && X_Y.ts_z < (new Date().valueOf() - 3600000*21)) {XY24.push([X_Y.pair[1][1], X_Y.ts_z]);}
			});

			Plot24[`${Plot[0][0]}-${Plot[0][1]}`] = XY24;
		});

		return Plot24;
	}

	typen (coat) { return JSON.parse(coat); }

	utils (Arg) {

		let Util = [];

		if (Arg[0] === `index` && Arg[1] === `fiat`) {

			Constants.fiat.forEach(Fiat => {

				Util.push({fiat: Fiat[0], column: [(0).toFixed(Fiat[1]), (0).toFixed(2), 0, 0], feat: Fiat});
			});

			return Util;
		}

		if (Arg[0] === `index` && Arg[1] === `spot`) {

			Constants.plot.forEach(Plot => {

				Util.push({pair: Plot[0], column: [(0).toFixed(Plot[1]), (0).toFixed(2), 0, 0]});
			});

			return Util;
		}

		if (Arg[0] === `index` && Arg[1] === `tokens`) {

			Constants.tokens.forEach(Coin => {

				Util.push({token: Coin[0], column: [Coin[4].toFixed(Coin[1]), (0).toFixed(2), 0, 0], feat: Coin});
			});

			return Util;
		}
	}
}

let Constants = {

	fiat: [
		[`AUD`, 5, hold, `australian dollar`, `AUD-USD`],
		[`CAD`, 5, hold, `canadian dollar`, `USD-CAD`],
		[`CHF`, 5, hold, `swiss franc`, `USD-CHF`],
		[`EUR`, 5, hold, `euro`, `EUR-USD`],
		[`GBP`, 5, hold, `sterling pound`, `GBP-USD`],
		[`JPY`, 5, hold, `japanese yen`, `USD-JPY`],
		[`KES`, 8, hold, `kenyan shilling`, `USD-KES`],
		[`NOK`, 5, hold, `norwegian krone`, `USD-NOK`],
		[`NZD`, 5, hold, `new zealand dollar`, `NZD-USD`],
		[`SEK`, 5, hold, `swedish krone`, `USD-SEK`],
		[`ZAR`, 5, hold, `south african rand`, `USD-ZAR`]
	],

	plot: [
		[[`ADA`, `USD`], 4, hold],
		[[`AUD`, `USD`], 5, hold],
		[[`AVAX`, `USD`], 2, hold],
		[[`BCH`, `USD`], 2, hold],
		[[`BNB`, `USD`], 3, hold],
		[[`BTC`, `AUD`], 2, hold],
		[[`BTC`, `CAD`], 2, hold],
		[[`BTC`, `EUR`], 2, hold],
		[[`BTC`, `USD`], 2, hold],
		[[`BTC`, `USDT`], 2, hold],
		[[`DOGE`, `USD`], 5, hold],
		[[`DOT`, `USD`], 3, hold],
		[[`ETH`, `BTC`], 5, hold],
		[[`ETH`, `USD`], 2, hold],
		[[`EUR`, `CAD`], 5, hold],
		[[`EUR`, `CHF`], 5, hold],
		[[`EUR`, `USD`], 5, hold],
		//[[`FDUSD`, `USD`], 5, hold],
		[[`GBP`, `USD`], 5, hold],
		[[`LTC`, `USD`], 2, hold],
		[[`NZD`, `USD`], 5, hold],
		[[`SHIB`, `USD`], 8, hold],
		[[`SOL`, `USD`], 2, hold],
		[[`USD`, `CAD`], 5, hold],
		[[`USD`, `CHF`], 5, hold],
		[[`USD`, `JPY`], 5, hold],
		[[`USD`, `KES`], 5, hold],
		[[`USD`, `NOK`], 5, hold],
		[[`USD`, `SEK`], 5, hold],
		[[`USD`, `ZAR`], 5, hold],
		//[[`USDC`, `USD`], 5, hold],
		[[`USDT`, `USD`], 5, hold],
		[[`XRP`, `USD`], 5, hold],
		[[`XTZ`, `USD`], 3, hold]
	], 

	tokens: [
		[`ADA`, 4, hold, `cardano`, 0],
		[`AVAX`, 2, hold, `avalanche`, 0],
		[`BNB`, 3, hold, `binance coin`, 0],
		[`BCH`, 2, hold, `bitcoin cash`, 0],
		[`BTC`, 2, hold, `bitcoin`, 0],
		[`DOGE`, 5, hold, `dogecoin`, 0],
		[`DOT`, 3, hold, `polkadot`, 0],
		[`ETH`, 2, hold, `ethereum`, 0],
		//[`FDUSD`, 5, hold, `first digital USD`, 0],
		[`LTC`, 2, hold, `litecoin`, 0],
		[`SHIB`, 3, hold, `shiba inu`, 0],
		[`SOL`, 2, hold, `solana`, 0],
		[`XTZ`, 3, hold, `tezos`, 0],
		//[`USDC`, 5, hold, `USD Coin`, 0],
		[`USDT`, 5, hold, `tether`, 0],
		[`XRP`, 5, hold, `ripple`, 0]
	]
}

module.exports = {

	Constants: Constants,
	
	Sql : new Sql([{
		host: `localhost`,
		user: `root`,
		password: `Mann2asugo`,
		multipleStatements: true
	}]),

	Tools : new Tools()
}
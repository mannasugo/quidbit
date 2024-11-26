`use strict`;

const {createConnection} = require(`mysql`);

const { mkdir, readFile, readFileSync, stat, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

//const RQ = require(`request`);

const hold = new Date(`1996-01-20`).valueOf();

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

	utils (Arg) {

		let Util = [];

		if (Arg[0] === `index` && Arg[1] === `fiat`) {

			Constants.fiat.forEach(Fiat => {

				Util.push({fiat: Fiat[0], column: [Fiat[4].toFixed(Fiat[1]), (0).toFixed(2), 0, 0], feat: Fiat});
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
		[`AUD`, 5, hold, `australian dollar`, .66599],
		[`CAD`, 5, hold, `canadian dollar`, 1/1.36572],
		[`CHF`, 5, hold, `swiss franc`, 1/.89335],
		[`EUR`, 5, hold, `euro`, 1.07296],
		[`GBP`, 5, hold, `sterling pound`, 1.26926],
		[`JPY`, 5, hold, `japanese yen`, 1/156],
		[`KES`, 5, hold, `kenyan shilling`, 1/127],
		[`NOK`, 5, hold, `norwegian krone`, 1/10.55071],
		[`NZD`, 5, hold, `new zealand dollar`, .61226],
		[`SEK`, 5, hold, `swedish krone`, 1/10.47923],
		[`ZAR`, 5, hold, `south african rand`, 1/18.18274]
	],

	plot: [
		[[`AUD`, `USD`], 5, hold],
		[[`BNB`, `USD`], 3, hold],
		[[`BTC`, `AUD`], 2, hold],
		[[`BTC`, `CAD`], 2, hold],
		[[`BTC`, `EUR`], 2, hold],
		[[`BTC`, `USD`], 2, hold],
		[[`BTC`, `USDT`], 2, hold],
		[[`DOGE`, `USD`], 5, hold],
		[[`ETH`, `BTC`], 5, hold],
		[[`ETH`, `USD`], 2, hold],
		[[`EUR`, `CAD`], 5, hold],
		[[`EUR`, `CHF`], 5, hold],
		[[`EUR`, `USD`], 5, hold],
		[[`GBP`, `USD`], 5, hold],
		[[`USD`, `CAD`], 5, hold],
		[[`USD`, `CHF`], 5, hold],
		[[`USD`, `JPY`], 5, hold],
		[[`USDT`, `USD`], 5, hold]
		/*[`USD`, `KES`], 
		[`LTC`, `USD`],  
		[`NZD`, `USD`], 
		[`SOL`, `USD`], 
		[`USD`, `NOK`], 
		[`USD`, `SEK`], 
		[`USDC`, `USD`],
		[`XMR`, `USD`], 
		[`XRP`, `USD`], 
		[`USD`, `ZAR`]*/
	], 

	tokens: [
		[`BNB`, 3, hold, `binance coin`, 0],
		[`BTC`, 2, hold, `bitcoin`, 0],
		[`DOGE`, 5, hold, `dogecoin`, 0],
		[`ETH`, 2, hold, `ethereum`, 0],
		[`LTC`, 2, hold, `litecoin`, 0],
		[`SOL`, 2, hold, `solana`, 0],
		[`USDC`, 5, hold, `USD Coin`, 0],
		[`USDT`, 5, hold, `tether`, 0],
		[`XRP`, 5, hold, `ripple`, 0],
		/*[`NZD`, 5, hold, `new zealand dollar`, .61226],
		[`SEK`, 5, hold, `swedish krone`, 1/10.47923],
		[`ZAR`, 5, hold, `south african rand`, 1/18.18274]*/
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
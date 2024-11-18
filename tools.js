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

		if (Arg[0] === `index` && Arg[1] === `fiat`) {

			let Util = [];

			Constants.fiat.forEach(Fiat => {

				Util.push({fiat: Fiat[0], column: [Fiat[4].toFixed(Fiat[1]), (0).toFixed(2), 0, 0], feat: Fiat});
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
		//[`us`, `USD`, `us dollar`]
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
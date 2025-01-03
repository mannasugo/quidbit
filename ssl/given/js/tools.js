`use strict`;

class Tools {

	constructor () {

		this.call = new XMLHttpRequest;

		this.synonyms = [[`\f`, ``], [`\n`, ``], [`\t`, ``], [`\r`, ``], [`'`, `u0027`], [`"`, `u0022`], [`/`, `u002f`], [`&`, `u0026`]];
	}

	coats (types) { return JSON.stringify(types); }

	plains (Raw)  {

		this.synonyms.slice(4).forEach(Regex => {

			Raw = Raw.replace(new RegExp(Regex[1], `g`), Regex[0]);
		});

		return Raw;
	}

	pull (Arg) {

		this.call.open(`POST`, Arg[0], true);

		this.call.setRequestHeader(`Content-Type`, `application/json`);

		this.call.send(JSON.stringify(Arg[1]));

		return this.call;
	}

  	slim (String) {

		if (!String || String.length < 1 || String.match(/^(\s+)$/)) return;

		return String;
  	}

  	yScale (Arg) {

  		let AY, B1, B2 = 0, RH;

  		Arg[1] = parseFloat(Arg[1]);

  		if (Arg[0] < 1 && Arg[0] !== 0) {

  			let Float = Arg[0].toString().split(`.`);

  			for (let A = 0; A < Float[1].length; A++) {

  				if (Float[1][A] !== `0`) {B2 = A; break;}
  			}

  			RH = Float[1][B2]/Math.pow(10, B2+1);

  			AY = parseFloat(Arg[1].toString().substr(0, B2+3));
  		}

  		if (Arg[0] > 1) {

  			B2 = Arg[0].toFixed().length;

  			RH = parseInt(Arg[0].toString()[0])*Math.pow(10, B2-1);

  			B1 = Arg[1].toFixed().length;

  			AY = parseInt(Arg[1].toString().substr(0, B1-B2))*Math.pow(10, B2);
  		}

  		if (Arg[0] === 0) {

  			RH = 0; 

  			AY = 0
  		}

  		return [RH, AY];
  	}

	typen (coat) { return JSON.parse(coat); }

	formatplanex (Arg) {

		let String = new Date(Arg[0]).toTimeString();

		if (Arg[1] === 60000*60) String = new Date(Arg[0]).toDateString();

		return `${String.substr(Arg[2][0], Arg[2][1])}`;
	}
}

Tools = new Tools();

let Clients = sessionStorage;

const Constants = {

	ival: {
		[`1M`]: {
				abs: 60000,
				C: 15, 
				sub: [0, 5],
				tox: -14 /*text offset x*/},
		[`3M`]: {
				abs: 60000*3,
				C: 20, 
				sub: [0, 5], 
				tox: -14},
		[`1H`]: {
				abs: 60000*60,
				C: 24, 
				sub: [8, 2],
				tox: -6}
	},

	SVG: {
		ADA: `tokens/ada`,
		AUD: `flags/au`,
		AVAX: `tokens/avax`,
		BCH: `tokens/bch`,
		CAD: `flags/ca`,
		CHF: `flags/ch`,
		BTC: `tokens/btc`,
		BNB: `tokens/bnb`,
		DOGE: `tokens/doge`,
		DOT: `tokens/dot`,
		ETH: `tokens/eth`,
		EUR: `flags/eu`,
		FDUSD: `tokens/fdusd`,
		GBP: `flags/uk`,
		JPY: `flags/jp`,
		KES: `flags/ke`,
		SOL: `tokens/sol`,
		LTC: `tokens/ltc`, 
		NOK: `flags/no`,
		NZD: `flags/nz`, 
		SEK: `flags/se`,
		SHIB: `tokens/shib`,
		USD: `flags/us`,
		USDC: `tokens/usdc`,
		USDT: `tokens/usdt`,
		XRP: `tokens/xrp`,
		XTZ: `tokens/xtz`,
		ZAR: `flags/za`
	}
}
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

	typen (coat) { return JSON.parse(coat); }
}

Tools = new Tools();

let Clients = sessionStorage;

const Constants = {

	SVG: {
		AUD: `flags/au`,
		CAD: `flags/ca`,
		CHF: `flags/ch`,
		BTC: `tokens/btc`,
		BNB: `tokens/bnb`,
		DOGE: `tokens/doge`,
		ETH: `tokens/eth`,
		EUR: `flags/eu`,
		GBP: `flags/uk`,
		JPY: `flags/jp`,
		KES: `flags/ke`,
		SOL: `tokens/sol`,
		LTC: `tokens/ltc`, 
		NOK: `flags/no`,
		NZD: `flags/nz`, 
		SEK: `flags/se`,
		USD: `flags/us`,
		USDC: `tokens/usdc`,
		USDT: `tokens/usdt`,
		XRP: `tokens/xrp`,
		ZAR: `flags/za`
	}
}
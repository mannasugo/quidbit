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
									mug: Pulls.mug, utils: Tools.utils([`index`, `fiat`])}));
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
							}});}}});
		}
	}

	io (App) {

		App.on(`connection`, Polling => {	});
	}
}

module.exports = new Route();
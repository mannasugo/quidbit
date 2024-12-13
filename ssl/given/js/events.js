`use strict`;

class Event {

	listen (Arg) { 

		(Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
	}

	getSource (Arg) {

		if (Arg.target) return Arg.target;
	}

	/** **/

	app () {

		io().on(`SPOT_BOOK`, Spot => {

			let Plot = {};

			Spot.forEach(AB => { 

				Plot[AB[0]] = [AB[1]]; 

				Clients.plot = Tools.coats(Plot)

				if (document.querySelector(`#${AB[0]}`)) document.querySelector(`#${AB[0]} #COST`).innerHTML = AB[1];

				if (document.querySelector(`#${AB[0]}_CONVERT`)) document.querySelector(`#${AB[0]}_CONVERT #COST`).innerHTML = parseFloat(1/AB[1]).toFixed(document.querySelector(`#${AB[0]}_CONVERT #COST`).getAttribute(`decimal`));
			});
		});

		document.querySelectorAll(`.A0`).forEach(A0 => {

			this.listen([A0, `click`, S => {

				document.querySelectorAll(`.A0`).forEach(A0 => {

					A0.style.fontWeight = 300;

					A0.style.opacity = .5
				});

				this.getSource(S).style.fontWeight = 300;

				this.getSource(S).style.opacity = 1;

				document.querySelectorAll(`#column div`)[1].querySelector(`span`).innerHTML = `symbol`;

				document.querySelectorAll(`#column div`)[2].querySelector(`span`).innerHTML = `price(usd)`;

				if (this.getSource(S).getAttribute(`for`) === `fiat`) {

					document.querySelectorAll(`#column div`)[0].querySelector(`span`).innerHTML = `currency`;

					document.querySelector(`#row div`).innerHTML = ``;

					let Puts = Tools.pull([
						`/json/web`, {
							flag: [`fiat`, `index`],
							mug: (Clients.mug) ? Clients.mug: false,
							pull: `util`
					}]);

					Puts.onload = () => {

						let Web = Tools.typen(Puts.response);

						View.pop();

						View.DOM([`#row div`, Models.utilApp([[`fiat`, `index`], Web])]);
					}
				}

				if (this.getSource(S).getAttribute(`for`) === `spot`) {

					document.querySelectorAll(`#column div`)[0].querySelector(`span`).innerHTML = `pair`;

					document.querySelectorAll(`#column div`)[1].querySelector(`span`).innerHTML = ``;

					document.querySelectorAll(`#column div`)[2].querySelector(`span`).innerHTML = `last trade`;

					document.querySelector(`#row div`).innerHTML = ``;

					let Puts = Tools.pull([
						`/json/web`, {
							flag: [`spot`, `index`],
							mug: (Clients.mug) ? Clients.mug: false,
							pull: `util`
					}]);

					Puts.onload = () => {

						let Web = Tools.typen(Puts.response);

						View.pop();

						View.DOM([`#row div`, Models.utilApp([[`spot`, `index`], Web])]);

						mouseup();
					}
				}

				if (this.getSource(S).getAttribute(`for`) === `tokens`) {

					document.querySelectorAll(`#column div`)[0].querySelector(`span`).innerHTML = `token`;

					document.querySelector(`#row div`).innerHTML = ``;

					let Puts = Tools.pull([
						`/json/web`, {
							flag: [`tokens`, `index`],
							mug: (Clients.mug) ? Clients.mug: false,
							pull: `util`
					}]);

					Puts.onload = () => {

						let Web = Tools.typen(Puts.response);

						View.pop();

						View.DOM([`#row div`, Models.utilApp([[`tokens`, `index`], Web])]);
					}
				}
		}]);});

		let mouseup = () => {

			 document.querySelectorAll(`#row > div > div`).forEach(ROWDIV => {

				this.listen([ROWDIV, `mouseover`, S => {

					document.querySelectorAll(`#row > div > div  a`).forEach(A => {

						A.style.textDecoration = `unset`;
					});

					if (!this.getSource(S).querySelector(`a`)) return;

					this.getSource(S).querySelector(`a`).style.textDecoration = `underline`;}])});
		}
	}
}

Event = new Event;
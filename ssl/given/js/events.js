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

		document.querySelectorAll(`.A0`).forEach(A0 => {

			this.listen([A0, `click`, S => {

				document.querySelectorAll(`.A0`).forEach(A0 => {

					A0.style.fontWeight = 300;

					A0.style.opacity = .5
				});

				this.getSource(S).style.fontWeight = 600;

				this.getSource(S).style.opacity = 1;

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
			}]);});
	}
}

Event = new Event;
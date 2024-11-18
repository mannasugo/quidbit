`use strict`;

class Route {

	constructor () {

		this.State = [];
	}

	getState () {

    	let url = (`./${window.location}`).replace(`//`, `/`).replace(/%(..)/g, function (match, hex) {
      		return String.fromCharCode(parseInt(hex, 16))
    	});

    	this.State = url;

    	this.State = url.split(`/`);
	}

	Call () {

		View.pop();

		this.getState();

		let State = this.State;

		if (State.length === 4 && State[3] === ``) { 

			document.title = `Quidbit`;

			let Puts = Tools.pull([
				`/json/web`, {
					mug: (Clients.mug) ? Clients.mug: false,
					pull: `app`
				}]);

			Puts.onload = () => {

				let Web = Tools.typen(Puts.response);

				View.DOM([`div`, [Models.app(Web)]]);

				document.querySelector(`body`).style.background = `#000`;

				document.querySelector(`#app`).style.height = `unset`;
			}
		}
	}

}

Route = new Route();
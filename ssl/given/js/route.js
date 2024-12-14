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

				Event.app(Web);
			}
		}

		else if (this.State[3] === `trade`) {

    		if (State[4] && !State[5] && !Tools.slim[State[5]]) {

				if (!Clients.plotXSplit) 

					Clients.plotXSplit = `1H`;

				let Puts = Tools.pull([
					`/json/web/`, {
						mug: (Clients.mug) ? Clients.mug: false,
						pull: `plot`, plot: State[4].split(`_`), splitX: Clients.plotXSplit}]);	

				Puts.onload = () => {

					let Web = Tools.typen(Puts.response);

					if (Web.plot) {

						document.title = `${Tools.typen(Clients.plot)[State[4].replace(`_`, `-`)] || (0).toFixed(Web.plot[1])} ${State[4]}`;

						View.DOM([`div`, [Models.plot(Web)]]);

						document.querySelector(`body`).style.overflowY = `hidden`;

						document.querySelector(`body`).style.overflowX = `hidden`;

						document.querySelector(`body`).style.background = `#000`;

						//document.querySelector(`#app`).style.height = `unset`;

						Event.plot(Web);
					}
				}	
    		}
		}
	}

}

Route = new Route();
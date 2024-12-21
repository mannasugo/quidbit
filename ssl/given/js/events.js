`use strict`;

class Event {

	listen (Arg) { 

		(Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
	}

	getSource (Arg) {

		if (Arg.target) return Arg.target;
	}

	/** **/

	app (Arg) {

		io().on(`SPOT_BOOK`, Spot => {

			let Plot = {};

			Spot.forEach(AB => { 

				Plot[AB[0]] = [AB[1]]; 

				Clients.plot = Tools.coats(Plot)

				if (document.querySelector(`#${AB[0]}`)) document.querySelector(`#${AB[0]} #COST`).innerHTML = AB[1];

				if (document.querySelector(`#${AB[0]}_CONVERT`)) document.querySelector(`#${AB[0]}_CONVERT #COST`).innerHTML = parseFloat(1/AB[1]).toFixed(document.querySelector(`#${AB[0]}_CONVERT #COST`).getAttribute(`decimal`));

				let P24 = [];

				Arg.ago[AB[0]].forEach(XY => {

					if (XY[1] > (new Date().valueOf() - 3600000*24) - 3000 && XY[1] < (new Date().valueOf() - 3600000*24) + 3000) P24.push(XY);
				});

				if (P24.length > 0) {

					if (document.querySelector(`#${AB[0]} #MOD`)) document.querySelector(`#${AB[0]} #MOD`).innerHTML = `${(((AB[1] - P24[0][0])/AB[1])*100).toFixed(2)}%`

					if (document.querySelector(`#${AB[0]} #MOD`)) document.querySelector(`#${AB[0]} #MOD`).style.color = (AB[1] > parseFloat(P24[0][0]))? `#02ff02`: `red`;
				}
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

	plot (Arg) {

		this.listen([document.querySelector(`#splitX`), `click`, S => {

			document.querySelector(`#splits`).style.display = (document.querySelector(`#splits`).style.display === `flex`)? `none`: `flex`;

			document.querySelector(`#mutiple2`).style.display = `none`;

			document.querySelector(`#mutiple3`).style.display = `none`;
		}]);

		document.querySelectorAll(`#mutiple3 .A`).forEach(A => {

			this.listen([A, `click`, S => {

				document.querySelectorAll(`#mutiple3 .A`).forEach(A => {A.style.opacity = .5});

				this.getSource(S).style.opacity = 1;

				let DOM = [], Plot = [];

				for (let plot in Arg.ago) {

					if (plot.split(`-`).indexOf(this.getSource(S).innerHTML) > -1) Plot.push([plot, 0]);
				};

				Plot.sort((A, B) => {return A - B}).forEach(Stat => {

					DOM.push([`div`, {id: Stat[0], class: `_geQ _gxM`, style: {padding: `${6}px ${12}px`}}, 
						[
							[`div`, {class: `_geQ _gxM`, style: {[`width`]: `${40}%`}}, 
								[
									[`img`, {src: `/ssl/given/svg/${Constants.SVG[Stat[0].split(`-`)[0]]}.svg`, style: {height: `${16}px`, [`max-width`]: `${16}px`, transform: `translateX(${0}px)`}}],
									[`img`, {src: `/ssl/given/svg/${Constants.SVG[Stat[0].split(`-`)[1]]}.svg`, style: {height: `${16}px`,[`max-width`]: `${16}px`, transform: `translateX(${-3.6667}px)`}}], 
									[`a`, {href: `/trade/${Stat[0].replace(`-`, `_`)}`, class: `_gxM`, style: {[`align-items`]: `baseline`, color: `#fff`, display: `flex`, [`font-family`]: `qb`, }}, 
										[ 
											[`span`, {style: {[`font-size`]: `${10}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Stat[0].split(`-`)[0]}`], 
											[`span`, {style: {color: `#8e8e8e`, [`font-size`]: `${10}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `/${Stat[0].split(`-`)[1]}`]]]]], 
							[`div`, {style: {width: `${30}%`}}, 
								[[`span`, {id: `COST`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`,[`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]], 
							[`div`, {style: {width: `${30}%`}}, 
								[[`span`, {id: `MOD`, style: {color: `#02ff02`, [`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]]]]);
				});

				View.pop();

				View.DOM([`#mutiple3 #list`, DOM]);
			}]);
		});

		io().on(`SPOT_BOOK`, Spot => {

			let Plot = {};

			Spot.forEach(AB => { 

				Plot[AB[0]] = [AB[1]]; 

				Clients.plot = Tools.coats(Plot)

				if (document.querySelector(`#${AB[0]}`)) {

					document.querySelectorAll(`#${AB[0]} #COST`).forEach(A => {A.innerHTML = AB[1];});
				}
				
				let P24 = [];

				Arg.ago[AB[0]].forEach(XY => {

					if (XY[1] > (new Date().valueOf() - 3600000*24) - 3000 && XY[1] < (new Date().valueOf() - 3600000*24) + 3000) P24.push(XY);
				});

				if (P24.length > 0) {

					if (document.querySelector(`#${AB[0]} #MOD`)) document.querySelectorAll(`#${AB[0]} #MOD`).forEach( A => {A.innerHTML = `${(((AB[1] - P24[0][0])/AB[1])*100).toFixed(2)}%`;});

					if (document.querySelector(`#${AB[0]} #MOD`)) document.querySelectorAll(`#${AB[0]} #MOD`).forEach( A => {A.style.color = (AB[1] > parseFloat(P24[0][0]))? /*`#02ff02`*/ `#519c58`: `#e3415d`;});
				}
			});

			//let ZY = Spot[Arg.plot[0].toString().replace(`,`, `-`)];

			//HL.push(ZY[1]);

			//HL.sort((A, B) => {return B - A});

            //document.querySelector(`#spotline`).setAttribute(`stroke`, (Open[1] > SPOT[1])? `red`: `lime`);

			//document.querySelector(`#spotline`).setAttribute(`d`, `M${parseFloat(X)} ${.15*Y + ((HL[0] - SPOT[1])*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5} ${4000} ${.15*Y + ((HL[0] - SPOT[1])*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5}`)

			//document.querySelector(`#ZY`).innerHTML = ZY[1];

			//document.querySelector(`#ZY`).setAttribute(`y`, .15*Y + ((HL[0] - ZY[1])*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4)

		});

		this.listen([document.querySelector(`#mutiple`), `click`, S => {

			document.querySelector(`#mutiple2`).style.display = (document.querySelector(`#mutiple2`).style.display === `flex`)? `none`: `flex`;

			document.querySelector(`#mutiple3`).style.display = (document.querySelector(`#mutiple3`).style.display === `flex`)? `none`: `flex`;

			document.querySelector(`#splits`).style.display = `none`;

			let DOM = [], Plot = [];

			for (let plot in Arg.ago) {

				if (plot.split(`-`).indexOf(`USD`) > -1) Plot.push([plot, 0]);
			};

			Plot.sort((A, B) => {return A - B}).forEach(Stat => {

					DOM.push([`div`, {id: Stat[0], class: `_geQ _gxM`, style: {padding: `${6}px ${12}px`}}, 
						[
							[`div`, {class: `_geQ _gxM`, style: {[`width`]: `${40}%`}}, 
								[
									[`img`, {src: `/ssl/given/svg/${Constants.SVG[Stat[0].split(`-`)[0]]}.svg`, style: {height: `${16}px`, [`max-width`]: `${16}px`, transform: `translateX(${0}px)`}}],
									[`img`, {src: `/ssl/given/svg/${Constants.SVG[Stat[0].split(`-`)[1]]}.svg`, style: {height: `${16}px`,[`max-width`]: `${16}px`, transform: `translateX(${-3.6667}px)`}}], 
									[`a`, {href: `/trade/${Stat[0].replace(`-`, `_`)}`, class: `_gxM`, style: {[`align-items`]: `baseline`, color: `#fff`, display: `flex`, [`font-family`]: `qb`, }}, 
										[ 
											[`span`, {style: {[`font-size`]: `${10}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Stat[0].split(`-`)[0]}`], 
											[`span`, {style: {color: `#8e8e8e`, [`font-size`]: `${10}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `/${Stat[0].split(`-`)[1]}`]]]]], 
							[`div`, {style: {width: `${30}%`}}, 
								[[`span`, {id: `COST`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`,[`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]], 
							[`div`, {style: {width: `${30}%`}}, 
								[[`span`, {id: `MOD`, style: {color: `#02ff02`, [`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]]]]);
			});

			View.pop();

			View.DOM([`#mutiple3 #list`, DOM]);
		}]);

		setInterval(() => {

			if (Clients.plotXSplit === `1H`) {

				document.querySelector(`#lapse`).innerHTML = `${(59 - new Date().getMinutes() > 9)? ``: `0`}${59 - new Date().getMinutes()}:${(59 - new Date().getSeconds() > 9)? ``: `0`}${59 - new Date().getSeconds()}`;
			}
		}, 1000);
	}
}

Event = new Event;
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

				Plot.sort((A, B) => {return A - B}).forEach((Stat, A) => {

					DOM.push([`div`, {id: Stat[0], class: `_geQ _gxM`, style: {background: (A%2 === 1)? `#8888881c`: `none`, padding: `${6}px ${12}px`}}, 
						[
							[`div`, {class: `_geQ _gxM`, style: {[`width`]: `${35}%`}}, 
								[
									[`img`, {src: `/ssl/given/svg/${Constants.SVG[Stat[0].split(`-`)[0]]}.svg`, style: {height: `${16}px`, [`max-width`]: `${16}px`, transform: `translateX(${0}px)`}}],
									[`img`, {src: `/ssl/given/svg/${Constants.SVG[Stat[0].split(`-`)[1]]}.svg`, style: {height: `${16}px`,[`max-width`]: `${16}px`, transform: `translateX(${-3.6667}px)`}}], 
									[`a`, {href: `/trade/${Stat[0].replace(`-`, `_`)}`, class: `_gxM`, style: {[`align-items`]: `baseline`, color: `#fff`, display: `flex`, [`font-family`]: `intext`, [`margin-left`]: `${6}px`}}, 
										[ 
											[`span`, {style: {[`font-size`]: `${11}px`, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Stat[0].split(`-`)[0]}`], 
											[`span`, {style: {color: `#8e8e8e`, [`font-size`]: `${10}px`, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `/${Stat[0].split(`-`)[1]}`]]]]], 
							[`div`, {style: {width: `${25}%`}}, 
								[[`span`, {id: `COST`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`,[`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]], 
							[`div`, {style: {width: `${40}%`}}, 
								[[`span`, {id: `MOD`, style: {color: `#02ff02`, [`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]]]]);
				});

				View.pop();

				View.DOM([`#mutiple3 #list`, DOM]);
			}]);
		});

		let HL = [], Vols = [];

		Arg.XY.forEach(K => {

			if (K[2].length > 0) {

				HL.push(K[2][0]); 

				HL.push(K[2][1]);

				Vols.push(K[3]);
			}
		});
    
  		let Y = parseFloat(document.querySelector(`body`).clientHeight - 70);

  		let RECT = document.querySelectorAll(`#kline rect`);

  		let X = RECT[RECT.length - 1].getAttribute(`x`);

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

			let ZY = 0;

			if (Plot[Arg.plot[0].toString().replace(`,`, `-`)]) ZY = Plot[Arg.plot[0].toString().replace(`,`, `-`)];

			if (ZY > 0) {

				HL.push(ZY);

				HL.sort((A, B) => {return B - A});

				document.querySelector(`#ZY`).innerHTML = parseFloat(ZY).toFixed(Arg.plot[1] -1);

				document.querySelector(`#ZY`).setAttribute(`y`, .15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4);

				document.querySelector(`#spotline`).setAttribute(`d`, `M${parseFloat(X)} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5} ${4000} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5}`);

            	document.querySelector(`#spotY #a`).setAttribute(`y`, .15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) - 10);

           		//document.querySelector(`#spotY #a`).setAttribute(`fill`, (Open[1] > YZ)? `#ff000078`: `#05b5058c`);

            	document.querySelector(`#spotY #c`).setAttribute(`d`, `M${0} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5} ${8} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5}`);
			}
		});

		this.listen([document.querySelector(`#mutiple`), `click`, S => {

			document.querySelector(`#mutiple2`).style.display = (document.querySelector(`#mutiple2`).style.display === `flex`)? `none`: `flex`;

			document.querySelector(`#mutiple3`).style.display = (document.querySelector(`#mutiple3`).style.display === `flex`)? `none`: `flex`;

			document.querySelector(`#splits`).style.display = `none`;

			let DOM = [], Plot = [];

			for (let plot in Arg.ago) {

				if (plot.split(`-`).indexOf(`USD`) > -1) Plot.push([plot, 0]);
			};

			Plot.sort((A, B) => {return A - B}).forEach((Stat, A) => {

					DOM.push([`div`, {id: Stat[0], class: `_geQ _gxM`, style: {background: (A%2 === 1)? `#8888881c`: `none`,  padding: `${6}px ${12}px`}}, 
						[
							[`div`, {class: `_geQ _gxM`, style: {[`width`]: `${35}%`}}, 
								[
									[`img`, {src: `/ssl/given/svg/${Constants.SVG[Stat[0].split(`-`)[0]]}.svg`, style: {height: `${16}px`, [`max-width`]: `${16}px`, transform: `translateX(${0}px)`}}],
									[`img`, {src: `/ssl/given/svg/${Constants.SVG[Stat[0].split(`-`)[1]]}.svg`, style: {height: `${16}px`,[`max-width`]: `${16}px`, transform: `translateX(${-3.6667}px)`}}], 
									[`a`, {href: `/trade/${Stat[0].replace(`-`, `_`)}`, class: `_gxM`, style: {[`align-items`]: `baseline`, color: `#fff`, display: `flex`, [`font-family`]: `intext`, [`margin-left`]: `${6}px`}}, 
										[ 
											[`span`, {style: {[`font-size`]: `${11}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Stat[0].split(`-`)[0]}`], 
											[`span`, {style: {color: `#8e8e8e`, [`font-size`]: `${10}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `/${Stat[0].split(`-`)[1]}`]]]]], 
							[`div`, {style: {width: `${25}%`}}, 
								[[`span`, {id: `COST`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`,[`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]], 
							[`div`, {style: {width: `${40}%`}}, 
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

		this.listen([document.querySelector(`#kline`), `mousemove`, S => {

			document.querySelector(`#pin path`).setAttribute(`d`, `M${0} ${S.clientY - 107 + .5} ${4000} ${S.clientY - 107 + .5} M${S.clientX + .5} ${0} ${S.clientX + .5} ${1000}`);

            document.querySelector(`#floatY #c`).setAttribute(`d`, `M${0} ${S.layerY + .5} ${8} ${S.layerY + .5}`);

            document.querySelector(`#floatY #a`).setAttribute(`y`, S.layerY - 10);

			document.querySelector(`#floatY text`).setAttribute(`y`, S.layerY + 4);

			HL[0] = parseFloat(HL[0]);

			HL[HL.length - 1] = parseFloat(HL[HL.length - 1]);

			let Delta = [(HL[0] + (.15*Y*(HL[0] - HL[HL.length - 1]))/(.35*Y)) - S.layerY*(HL[0] - HL[HL.length - 1])/(.35*Y)];

			document.querySelector(`#floatY text`).innerHTML = Delta[0].toFixed(Arg.plot[1] - 1);

            document.querySelector(`#floatY rect`).setAttribute(`width`, Delta[0].toFixed(Arg.plot[1]).toString().length*8.5);
	
			document.querySelector(`#floatVol`).style.display = `none`;
	
			document.querySelector(`#floatY`).style.display = `unset`;
		
		}]);

		this.listen([document.querySelector(`#vol`), `mousemove`, S => {

			document.querySelector(`#pin path`).setAttribute(`d`, `M${0} ${S.clientY - 107 + .5} ${4000} ${S.clientY - 107 + .5} M${S.clientX + .5} ${0} ${S.clientX + .5} ${1000}`);
			
			document.querySelector(`#floatVol`).setAttribute(`y`, S.layerY + 4);

			Vols = Vols.sort((A, B) => {return B - A});

			document.querySelector(`#floatVol`).innerHTML = (Vols[0] - (S.layerY*Vols[0])/(.115*Y)).toFixed(2);

			document.querySelector(`#floatVol-`).setAttribute(`d`, `M${0} ${S.layerY + .5} ${8} ${S.layerY + .5}`);
	
			document.querySelector(`#floatVol`).style.display = `unset`;

			document.querySelector(`#floatY`).style.display = `none`;
		}]);

		document.querySelectorAll(`.info`).forEach(SVG => {

			this.listen([SVG, `mouseover`, S => {

				let Stat = Tools.typen(this.getSource(S).id);

				document.querySelector(`#info`).innerHTML = `${new Date(Stat[0]).toString().substr(4, 17)} Open: ${Stat[1][0]} High: ${Stat[2][0]} Low: ${Stat[2][1]} Close: ${Stat[1][1]} ${((Stat[1][1] - Stat[1][0])/Stat[1][0]*100).toFixed(2)}%`;
			
				document.querySelector(`#volbase`).style.color = (Stat[1][0] > Stat[1][1])? `#E3415D`: `#6BC679`;

				document.querySelector(`#volbase`).innerHTML = Stat[3];
			}])});
	}
}

Event = new Event;
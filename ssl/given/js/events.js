`use strict`;

let HL = [], Vols = [], X;

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

		Arg.XY.forEach(K => {

			if (K[2].length > 0) {

				HL.push(K[2][0]); 

				HL.push(K[2][1]);

				Vols.push(K[3]);
			}
		});
    
  		let Y = parseFloat(document.body.clientHeight - 70);

  		let RECT = document.querySelectorAll(`#kline rect`);

  		X = RECT[RECT.length - 1].getAttribute(`x`);

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

			if (RECT.length > 0 && ZY > 0 && document.querySelector(`#ZY`)) {

				HL.push(ZY);

				HL.sort((A, B) => {return B - A}); 

				RECT = document.querySelectorAll(`#kline rect`); 

				X = RECT[RECT.length - 1].getAttribute(`x`);

				document.querySelector(`#ZY`).innerHTML = parseFloat(ZY).toFixed(Arg.plot[1] -1);

				document.querySelector(`#ZY`).setAttribute(`y`, .15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4);

				document.querySelector(`#spotline`).setAttribute(`d`, `M${parseFloat(X)} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5} ${4000} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5}`);

            	document.querySelector(`#spotY #a`).setAttribute(`y`, .15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) - 10);

           		//document.querySelector(`#spotY #a`).setAttribute(`fill`, (Open[1] > YZ)? `#ff000078`: `#05b5058c`);

            	document.querySelector(`#spotY #c`).setAttribute(`d`, `M${0} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5} ${8} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5}`);
			}
		});

		this.listen([document.querySelector(`#modalSwap`), `click`, S => {

			let Obj = this.getSource(S).parentNode.querySelector(`div`);

			Obj.style.display = (Obj.style.display === `flex`)? `none`: `flex`;
		}]);

		this.listen([document.querySelector(`#modalWallet`), `click`, S => {

			let Obj = this.getSource(S).parentNode.querySelector(`div`);

			Obj.style.display = (Obj.style.display === `flex`)? `none`: `flex`;
		}]);

		this.listen([document.querySelector(`#walletSelect`), `click`, S => {

			document.querySelector(`#walletOptions`).style.display = (document.querySelector(`#walletOptions`).style.display === `flex`)? `none`: `flex`;
		}]);

		this.listen([document.querySelector(`#splitX`), `click`, S => {

			document.querySelector(`#splits`).style.display = (document.querySelector(`#splits`).style.display === `flex`)? `none`: `flex`;

			document.querySelector(`#mutiple2`).style.display = `none`;

			document.querySelector(`#mutiple3`).style.display = `none`;

			document.querySelector(`#info`).style.display = `none`;
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

		this.listen([document.querySelector(`#mutiple`), `click`, S => {

			//document.querySelector(`#mutiple2`).style.display = (document.querySelector(`#mutiple2`).style.display === `flex`)? `none`: `flex`;

			document.querySelector(`#mutiple3`).style.display = (document.querySelector(`#mutiple3`).style.display === `flex`)? `none`: `flex`;

			document.querySelector(`#splits`).style.display = `none`;

			document.querySelector(`#info`).style.display = `none`;

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

		document.querySelectorAll(`.ival`).forEach(Val => {

			this.listen([Val, `click`, S => {

				Clients.plotXSplit = Val.innerHTML;

				document.querySelectorAll(`.ival`).forEach(A => {A.style.background = `#000`;});

				document.querySelectorAll(`.ival-alt`).forEach(A => {A.style.display = `none`;});

				Val.style.background = `#8888881C`;

				document.querySelector(`#splitX span`).innerHTML = Val.innerHTML;

				let Puts = Tools.pull([
					`/json/web/`, {
						mug: (Clients.mug) ? Clients.mug: false,
						pull: `plot`, plot: Arg.plot[0], splitX: Clients.plotXSplit, x: parseInt(((document.body.clientWidth*.8)/7.5).toFixed(0))}]);	

				Puts.onload = () => {

					let Web = Tools.typen(Puts.response);

					if (Web.plot) this.altSplit(Web);
				}
			}])});

		this.listen([document.querySelector(`#kline`), `mousemove`, S => {

			this.getSource(S).style.cursor = `none`

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

		//let OffX = -20

		let Split = Constants.ival[Clients.plotXSplit];

		let ts_z = Arg.XY.sort((A, B) => {return B[0] - A[0]})[0][0];

		let Pan = [0, 0];

		this.listen([document.querySelector(`#kline`), `mousedown`, S => { 

			this.getSource(S).style.cursor = `grab`

			Pan = [0, S.layerX];
		}]);

		this.listen([document.querySelector(`#kline`), `mouseup`, S => {

			this.getSource(S).style.cursor = `none`;

			Pan = [S.layerX, Pan[1]];

			Split = Constants.ival[Clients.plotXSplit];

			let move, ts;

			if ((Pan[1] - Pan[0]) < 0) {

				//OffX = OffX - (Pan[1] - Pan[0])

				//document.querySelector(`#kline`).style.transform = `translateX(${OffX}px)`

				move = parseFloat((-(Pan[1] - Pan[0])/5).toFixed(0));

				ts_z = ts_z - Split.abs*move;

				ts = new Date().valueOf();
			}

			if ((Pan[1] - Pan[0]) > 1) {

				//OffX = OffX - (Pan[1] - Pan[0]);

				//document.querySelector(`#kline`).style.transform = `translateX(${OffX}px)`;

				move = parseFloat(((Pan[1] - Pan[0])/5).toFixed(0));

				ts_z = ts_z + Split.abs*move;

				ts = new Date().valueOf();
			}

			if ((Pan[1] - Pan[0]) < 0 || (Pan[1] - Pan[0]) > 1) {

				io().emit(`az`, [Arg.plot[0], Clients.plotXSplit, parseInt(((document.body.clientWidth*.8)/6.95).toFixed(0)), ts_z, ts]);

				io().on(`az`, AZ => {

					if (ts === AZ[0]) {

						HL = [], Vols = [];

						let CAV = 0, RH = 0;

						AZ[1].forEach(K => {

							if (K[2].length > 0) {

								HL.push(K[2][0]); 

								HL.push(K[2][1]);

								Vols.push(K[3]);
							}
						});

						HL.sort((A, B) => {return B - A});

						RH = HL[0] - HL[HL.length - 1]; CAV = 2;

						let G = document.querySelectorAll(`svg .g`), SVG = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

						for (let A = 0; A < 25; A++) {

							let AY = (Tools.yScale([RH/CAV, HL[0]])[0]*16 + Tools.yScale([RH/CAV, HL[0]])[1]) - Tools.yScale([RH/CAV, HL[0]])[0]*A;

							SVG[1].push([`line`, {style: {visibility: (.15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) > .70*Y)? `collapse`: `visible`}, x1: 0, x2: 4000, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);		
		
							SVG[4].push([`text`, {x: 20, y: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${AY}`]);
				
							SVG[6].push([`line`, {x1: 0, x2: 8, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);		
						}

						Vols = Vols.sort((A, B) => {return B - A});

						let tsz = AZ[1].sort((A, B) => {return B[0] - A[0]})[0][0];

						tsz = new Date(`${new Date(tsz).toLocaleDateString()} ${new Date(tsz).getHours()}:00`).valueOf() + Split.abs*Split.C*4;

						if (Split.abs === 60000*60) tsz = new Date(new Date(tsz).toLocaleDateString()).valueOf() - Split.abs*Split.C;

						let Xlet = [];

						for (let i = 0; i < document.body.clientWidth/(Split.C*4.75) + 2; i++) {Xlet.push(tsz - i*Split.abs*Split.C);}

						AZ[1].sort((A, B) => {return A[0] - B[0]}).forEach((K, i) => {

							if (K[2].length > 0) {

								SVG[2].push([`line`, {id: `g${K[0]}`, x1: i*7.125 + .05, y1: .15*Y + ((HL[0] - K[2][0])*.35*Y)/(HL[0] - HL[HL.length - 1]), x2: i*7.125 + .05, y2: .15*Y + ((HL[0] - K[2][1])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: .95}]);
				
                				let OC = Tools.typen(Tools.coats(K[1]));

                				OC.sort((A, B) => {return B - A});
				
								SVG[3].push([`rect`, {id: `g${K[0]}`, x: (i*7.125) - 2, y: .15*Y + ((HL[0] - OC[0])*.35*Y)/(HL[0] - HL[HL.length - 1]), width: 4.25, height: ((OC[0] - OC[1])*.35*Y)/(HL[0] - HL[HL.length - 1]), fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
				
								SVG[10].push([`rect`, {x: (i*7.125) - 2, y: `${102 - (K[3]*100)/Vols[0]}%`, width: 4.25, height: `${(K[3]*100)/Vols[0] - 3}%`, fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
				
								SVG[13].push([`rect`, {id: Tools.coats(K), class: `info`, x: (i*7.125) - 2, y: 0, width: 4.25, height: `${100}%`, fill: `transparent`, stroke: `transparent`}]);						
							}

							if (Xlet.indexOf(K[0]) > -1) {

								SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

								SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
							}
						});

						G.forEach((Vect, i) => {

							View.pop();

							Vect.innerHTML = View.ModelDOM(SVG[i]);
						});

						document.querySelector(`#g`).innerHTML = View.ModelDOM(SVG[13]);

						document.querySelectorAll(`.info`).forEach(SVG => {

							this.listen([SVG, `mouseover`, S => {

								let Stat = Tools.typen(this.getSource(S).id);

								document.querySelector(`#info`).style.display = `flex`;

								document.querySelector(`#info`).innerHTML = `${new Date(Stat[0]).toString().substr(4, 17)} Open: ${Stat[1][0]} High: ${Stat[2][0]} Low: ${Stat[2][1]} Close: ${Stat[1][1]} ${((Stat[1][1] - Stat[1][0])/Stat[1][0]*100).toFixed(2)}%`;
			
								document.querySelector(`#volbase`).style.color = (Stat[1][0] > Stat[1][1])? `#E3415D`: `#6BC679`;

								document.querySelector(`#volbase`).innerHTML = Stat[3];
							}])});
					}
				});		
			}
		}]);

		this.listen([document.querySelector(`#emailAvail`), `click`, S => {

			if (!Tools.slim(document.querySelector(`input#email`).value) === true) return;

			let XHR = Tools.pull([
				`/json/web`, {email: document.querySelector(`input#email`).value, flag: `emailAvail`, pull: `mug`}]);

			document.querySelector(`input#email`).value = ``;

			XHR.onload = () => {

				let Obj = Tools.typen(XHR.response);

				if (Obj.email) {

					console.log(Obj)
				}
			}
		}]);

		this.plotState(Arg);
	}

	altSplit (Arg) {

		let Split = Constants.ival[Clients.plotXSplit];
    
  		let X = parseFloat(document.body.clientWidth);
    
  		let Y = parseFloat(document.body.clientHeight - 70);

		let HL = [], Vols = [];

		let CAV = 0, RH = 0;

		Arg.XY.forEach(K => {

			if (K[2].length > 0) {

				HL.push(K[2][0]); 

				HL.push(K[2][1]);

				Vols.push(K[3]);
			}
		});

		HL.sort((A, B) => {return B - A});

		RH = HL[0] - HL[HL.length - 1]; CAV = 2;

		let G = document.querySelectorAll(`svg .g`), SVG = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

		for (let A = 0; A < 25; A++) {

			let AY = (Tools.yScale([RH/CAV, HL[0]])[0]*16 + Tools.yScale([RH/CAV, HL[0]])[1]) - Tools.yScale([RH/CAV, HL[0]])[0]*A;

			SVG[1].push([`line`, {style: {visibility: (.15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) > .70*Y)? `collapse`: `visible`}, x1: 0, x2: 4000, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);		
		
			SVG[4].push([`text`, {x: 20, y: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${AY}`]);
				
			SVG[6].push([`line`, {x1: 0, x2: 8, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);		
		}

		Vols = Vols.sort((A, B) => {return B - A});

		let tsz = Arg.XY.sort((A, B) => {return B[0] - A[0]})[0][0];

		tsz = new Date(`${new Date(tsz).toLocaleDateString()} ${new Date(tsz).getHours()}:00`).valueOf() + Split.abs*Split.C*4;

		if (Split.abs === 60000*60) tsz = new Date(new Date(tsz).toLocaleDateString()).valueOf() + Split.abs*Split.C;

		let Xlet = [];

		for (let i = 0; i < X/(Split.C*4.75) + 2; i++) {Xlet.push(tsz - i*Split.abs*Split.C);}

		Arg.XY.sort((A, B) => {return A[0] - B[0]}).forEach((K, i) => {

			if (K[2].length > 0) {

				SVG[2].push([`line`, {id: `g${K[0]}`, x1: i*7.125 + .05, y1: .15*Y + ((HL[0] - K[2][0])*.35*Y)/(HL[0] - HL[HL.length - 1]), x2: i*7.125 + .05, y2: .15*Y + ((HL[0] - K[2][1])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: .95}]);
				
                let OC = Tools.typen(Tools.coats(K[1]));

                OC.sort((A, B) => {return B - A});
				
				SVG[3].push([`rect`, {id: `g${K[0]}`, x: (i*7.125) - 2, y: .15*Y + ((HL[0] - OC[0])*.35*Y)/(HL[0] - HL[HL.length - 1]), width: 4.25, height: ((OC[0] - OC[1])*.35*Y)/(HL[0] - HL[HL.length - 1]), fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
				
				SVG[10].push([`rect`, {x: (i*7.125) - 2, y: `${102 - (K[3]*100)/Vols[0]}%`, width: 4.25, height: `${(K[3]*100)/Vols[0] - 3}%`, fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
				
				SVG[13].push([`rect`, {id: Tools.coats(K), class: `info`, x: (i*7.125) - 2, y: 0, width: 4.25, height: `${100}%`, fill: `transparent`, stroke: `transparent`}]);						
			}

			if (Xlet.indexOf(K[0]) > -1) {

				SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

				SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
			}
		});

		SVG[5] = [[`text`, {id: `ZY`, x: 20, y: 0, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}]];

		SVG[8] = [[`text`, {id: `lapse`, x: Arg[`XY`].length*7.12 - 12, y: 17, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, ``]]

		SVG[9] = [[`line`, { x1: 0, x2: 4000, y1: `${102 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, y2: `${102 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]];

		SVG[11] = [[`text`, {x: 20, y: `${106 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${Tools.yScale([.75*Vols[0], Vols[0]])[0]}`]];
				
		SVG[12] = [[`line`, {x1: 0, x2: 8, y1: `${102.5 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, y2: `${102.5 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]];

		G.forEach((Vect, i) => {

			View.pop();

			Vect.innerHTML = View.ModelDOM(SVG[i]);
		});

		document.querySelector(`#g`).innerHTML = View.ModelDOM(SVG[13])

		document.querySelectorAll(`.ival-alt`).forEach(A => {A.style.display = `flex`;});

		this.plotState(Arg);
	}

	plotState (Arg) {

		setInterval(() => {

			if (Clients.plotXSplit === `1H`) {

				if (document.querySelector(`#lapse`)) document.querySelector(`#lapse`).innerHTML = `${(59 - new Date().getMinutes() > 9)? ``: `0`}${59 - new Date().getMinutes()}:${(59 - new Date().getSeconds() > 9)? ``: `0`}${59 - new Date().getSeconds()}`;
			}
		}, 1000);

		/**/

		HL = []; Vols = [];

		Arg.XY.forEach(K => {

			if (K[2].length > 0) {

				HL.push(K[2][0]); 

				HL.push(K[2][1]);

				Vols.push(K[3]);
			}
		});

		/**/

		document.querySelectorAll(`.info`).forEach(SVG => {

			this.listen([SVG, `mouseover`, S => {

				let Stat = Tools.typen(this.getSource(S).id);

				document.querySelector(`#info`).style.display = `flex`;

				document.querySelector(`#info`).innerHTML = `${new Date(Stat[0]).toString().substr(4, 17)} Open: ${Stat[1][0]} High: ${Stat[2][0]} Low: ${Stat[2][1]} Close: ${Stat[1][1]} ${((Stat[1][1] - Stat[1][0])/Stat[1][0]*100).toFixed(2)}%`;
			
				document.querySelector(`#volbase`).style.color = (Stat[1][0] > Stat[1][1])? `#E3415D`: `#6BC679`;

				document.querySelector(`#volbase`).innerHTML = Stat[3];
			}])});	
	}
}

Event = new Event;
`use strict`;

class View {

	constructor() {

		this.appendString = ``;
	}

	ModelDOM(Model) {

		if (typeof Model !== `object`) return;

		Model.forEach(Obj => {

			let a = Obj[0], z, last;

			z = a; 

				if (a === `html`) a = `!doctype html><html`;

				this.appendString += `<` + a;
				
				for (let meta in Obj[1]) {

					let value = ``;

					if (meta === `style`) {

						for (let style in Obj[1][meta]) {

							value += `${style}:${Obj[1][meta][style]};`
						}
					}

					else value = Obj[1][meta];

					this.appendString += ` ${meta}='${value}'`;
				}

				this.appendString += `>`;
				
				if (Obj[2]) {

					if (typeof Obj[2] === `object`) this.ModelDOM(Obj[2]);

					else if (typeof Obj[2] === `string`) this.appendString += Obj[2];
				}

				let Queer = [`img`, `input`, `meta`];

				if (!Queer.indexOf(z) > -1) this.appendString += `</` + z + `>`;
		});

		return Tools.plains(this.appendString);
	}

	DOM(Arg) { document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]);}

	pop () {this.appendString = ``};
}

let Models = {

	app: (Web) => {

		let columns = (PARA) => {

			PARA[0].forEach(Feat => {

				PARA[1].push([`div`, {style: {width: `${Feat[1]}%`}}, 
					[[`span`, {style: {color: `#8e8e8e`, [`font-size`]: `${10}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-align`]: (Feat[2])? `right`: `left`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`, [`white-space`]: `nowrap`}}, Feat[0]]]]);
			});

			return PARA[1];
		};

		let Pairs = [
		[[`currency`, 20], [`symbol`, 10, true], [`price(usd)`, 22.5, true], [`24h%`, 15, true], [`vol.(24h)`, 15, true], [`liquid`, 17.5, true]],
		[], []];

		Web.utils.forEach(Fiat => {

			Pairs[2].push([`div`, {id: (Fiat.feat[4] === `${Fiat.fiat}-USD`)? Fiat.feat[4]: `${Fiat.feat[4]}_CONVERT`, class: `_geQ _gxM`, style: {padding: `${12}px ${0}px`}}, 
				[
					[`div`, {class: `_geQ _gxM`, style: {overflow: `hidden`, [`width`]: `${20}%`}}, 
						[
							[`img`, {src: `/ssl/given/svg/${Constants.SVG[Fiat.fiat]}.svg`, style: {height: `${20}px`, [`max-width`]: `${20}px`, transform: `translateX(${0}px)`}}], 
							[`div`, {class: `_gxM`, style: {[`white-space`]: `nowrap`, width: `${75}%`}}, [[`span`, {style: {[`font-size`]: `${12}px`, [`font-weight`]: 300, [`margin-left`]: `${8}px`, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `capitalize`}}, `${Fiat.feat[3]}`]]]]], 
					[`div`, {style: {[`align-items`]: `end`, width: `${10}%`}}, [[`span`, {style: {color: `#8e8e8e`, [`font-size`]: `${11}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Fiat.fiat}`]]], 
					[`div`, {style: {width: `${22.5}%`}}, 
						[[`span`, {id: `COST`, decimal: Fiat.feat[1], style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`,[`font-weight`]: 300, [`letter-spacing`]: `${0}px`, [`text-align`]: `right`}}, ``]]], 
					[`div`, {style: {width: `${15}%`}}, 
						[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, ``]]], 
					[`div`, {style: {width: `${15}%`}}, 
						[[`span`, {style: {[`font-family`]: `geometria`, [`font-size`]: `${11}px`,[`font-weight`]: 600, [`letter-spacing`]: `${.75}px`, [`text-align`]: `right`}}, ``]]], 
					[`div`, {style: {[`align-items`]: `end`, width: `${17.5}%`}}, 
						[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.7064}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, ``]]]]])
		});

		return [
			`main`, {id: `app`, class: `_tY0`, style: {background: `#000`, color: `#fff`, [`font-family`]: `litera`, height: `${100}%`}}, 
				[
					[`div`, {style: {background: `#000`, [`border-bottom`]: `${1}px solid #1e1e1e`, height: `${48}px`, padding: `${0}px ${24}px`, position: `fixed`, width: `${100}%`, [`z-index`]: 11}}, 
						[[`div`, {class: `_gxM _geQ`}, 
							[
								[`span`, {class: `202411161551`, style: {[`font-size`]: `15px`, [`font-weight`]: 300, heght: `${20}px`, wdth: `${20}px`}}, `Qb`], 
								[`div`, {class: `_eYG`, style: {[`border-left`]: `${1}px solid #353535`, height: `${100}%`, [`margin-left`]: `${24}px`}}, 
									[[`span`, {style: {[`font-family`]: ``, [`font-size`]: `${12}px`, [`font-weight`]: 300}}, ``]]],  
								[`div`, {class: `_eYG`}, []], 
								[`div`, {class: `_gZz`, style: {[`font-size`]: `${12}px`, [`font-weight`]: 600}}, 
									[
										//[`a`, {class: `_gxM _geQ`, href: `/u/wallet/`, style: {background: `blue`, color: `#fff`, display: `flex`, [`font-weight`]: 600, padding: `${4}px ${12}px`, [`white-space`]: `nowrap`}}, [[`span`, {class: `v202204282015`, style: {height: `${20}px`, [`margin-right`]: `${8}px`, width: `${20}px`}}], [`span`, {style: {[`marin-bottom`]: `${2}px`}}, `Deposit`]]],
										(Clients.mug)? []: [`a`, {href: `/signin`, style: {background: `#ffffff1c`, color: `#fff`, [`font-weight`]: 300, [`margin-left`]: `${8}px`, padding: `${6}px ${12}px`, [`white-space`]: `nowrap`}}, `signin`]]]]]]],
					[`div`, {style: {[`max-width`]: `${1280}px`, width: `${100}%`, margin: `${64}px auto`, [`justify-content`]: `center`}}, 
						[
							[`section`, {style: {[`font-size`]: `${12}px`, margin: `${0} ${24}px`}}, 
								[
									[`div`, {class: `_gxM _geQ`, style: {cursor: `pointer`}}, 
										[
											[`span`, {class: `A0`, for: `fiat`, style: {[`font-weight`]: 300, margin: `${6}px ${12}px ${6}px ${0}`}}, `Currencies`],
											[`span`, {class: `A0`, for: `tokens`, style: {margin: `${6}px ${12}px`, opacity: 0.5}}, `Tokens`],
											[`span`, {class: `A0`, for: `spot`, style: {margin: `${6}px ${12}px`, opacity: 0.5}}, `Spot`],
											[`span`, {class: `A0`, style: {margin: `${6}px ${12}px`, opacity: 0.5}}, `Commodities`]]],
									[`div`, {class: `_gxM _geQ`, style: {}}, 
										[
											[`a`, {href: `javascript:;`, style: {border: `${1}px solid`, [`border-radius`]: `${100}px`, color: `#fff`, [`font-weight`]: 600, margin: `${6}px ${12}px ${6}px ${0}`, padding: `${6}px ${12}px`}}, `All`],
											[`a`, {href: `javascript:;`, style: {border: `${1}px solid #ffffff1c`, [`border-radius`]: `${100}px`, color: `#fff`, [`font-size`]: `${11}px`, margin: `${6}px ${12}px ${6}px ${0}`, padding: `${6}px ${12}px`}}, `NEW`]]],
									[`div`, {id: `column`, class: `_geQ _gxM`, style: {[`margin`]: `${12}px ${0}px`}}, columns([Pairs[0], []])]]],
							[`section`, {id: `row`, style: {[`font-size`]: `${12}px`, margin: `${0} ${24}px`}}, [[`div`, {}, Pairs[2]]]]]],
					[`div`, {style: {background: `#000`, [`border-top`]: `${1}px solid #1e1e1e`, bottom: 0, padding: `${6}px ${24}px`, position: `fixed`, width: `${100}%`, [`z-index`]: 11}}, 
						[[`div`, {class: `_gxM _geQ`}, 
							[
								[`span`, {style: {[`font-size`]: `${12}px`, [`font-weight`]: 300}}, `Quidbit ®`],
								[`span`, {style: {[`font-family`]: `geometria`, [`font-size`]: `${10}px`, [`font-weight`]: 300}}, `2024`], 
								[`div`, {class: `_gZz`}, [[`span`, {style: {color: `#535353`, [`font-family`]: `geometria`, [`font-size`]: `${10}px`, [`font-weight`]: 300}}, `v0.24.3`]]]]]]]]];
	},

	faveplots: () => {

		if (!Clients.faveplots) {

			Clients.faveplots = Tools.coats({
				AUD: [`USD`],
				BTC: [`CAD`, `EUR`, `USD`],
				ETH: [`BTC`, `USD`],
				EUR: [`CAD`, `CHF`, `USD`],
				USD: [`CAD`, `CHF`, `JPY`]
			});
		}

		let DOM = [];

		for (let fave in Tools.typen(Clients.faveplots)) {

			let DOM2 = [];

			Tools.typen(Clients.faveplots)[fave].forEach(b => {

				DOM2.push([`div`, {id: `${fave}-${b}`, class: `_gxM _geQ`, style: {[`align-items`]: `baseline`, [`margin-left`]: `${12}px`}}, 
					[
						[`a`, {href: `/trade/${fave}_${b}`, style: {color: `#fff`, [`font-family`]: `qb`}}, `${fave}/${b}`],
						[`span`, {id: `COST`, style: {[`letter-spacing`]: `${.65}px`, [`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`margin`]: `${0}px ${6}px ${0}px`}}, `${parseFloat(Tools.typen(Clients.plot)[`${fave}-${b}`][0]).toLocaleString()}`],
						[`span`, {id: `MOD`, style: {[`letter-spacing`]: `${.65}px`, [`font-family`]: `intext`, [`font-size`]: `${11.88}px`}}, ``]]]);
			});

			DOM.push([`section`, {class: `_gxM`, style: {[`border-right`]: `${1}px solid #353535`, [`font-size`]: `10px`}}, 
				[[`div`, {class: `_gxM _geQ`, style: {[`align-items`]: `baseline`, [`ltter-spacing`]: 0, padding: `${2}px ${12}px`}}, 
					[
						[`img`, {src: `/ssl/given/svg/${Constants.SVG[fave]}.svg`, style: {[`align-self`]: `center`, [`height`]: `${12}px`, [`width`]: `${12}px`}}],
						[`span`, {style: {[`font-family`]: `qb`, [`margin-left`]: `${10}px`}}, fave], 
						[`div`, {class: `_gxM`}, DOM2]]]]]);
		}

		return DOM;
	},

	plot: function (Arg) { //`v202204282015`

		let Split = Constants.ival[Clients.plotXSplit];
    
  		let X = parseFloat(document.querySelector(`body`).clientWidth);
    
  		let Y = parseFloat(document.querySelector(`body`).clientHeight - 70);

  		let DOM = {column: [], multiple: [], split: []};

		let Column = [[`pair`, 35], [`last trade`, 25, true], [`24h`, 40, true]];

		Column.forEach(Feat => {

			DOM.column.push([`div`, {style: {width: `${Feat[1]}%`}}, 
				[[`span`, {style: {color: `#8e8e8e`, overflow: `hidden`, [`text-align`]: (Feat[2])? `right`: `left`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`, [`white-space`]: `nowrap`}}, Feat[0]]]]);
		});

		let Multiple = [`AUD`, `CAD`, `CHF`, `BTC`, `ETH`, `EUR`, `USD`];

		Multiple.forEach(A => {

			DOM.multiple.push([`a`, {href: `javascript:;`, class: `A`, style: {color: `#fff`, [`margin-right`]: `${12}px`, opacity: (A != `USD`)? 0.5: 1}}, A]);
		});

  		for (let span in Constants.ival) {

  			DOM.split.push([`a`, {href: `javascript:;`, class: `ival`, style: {background: (Clients.plotXSplit === span)? `#8888881C`: `#000`, [`border-top`]: `${1}px solid #353535`, color: `#fff`, [`font-family`]: `intext`, [`font-size`]: `${11}px`, [`letter-spacing`]: `${.25}px`, padding: `${6}px ${12}px`, [`z-index`]: 16}}, span]);
  		}

		let HL = [], Vols = [];

		let CAV = 0, RH = 0; //Row Height, Candle Average

		Arg.XY.forEach(K => {

			if (K[2].length > 0) {

				HL.push(K[2][0]); 

				HL.push(K[2][1]);

				Vols.push(K[3]);

				RH += K[2][0] - K[2][1];

				CAV++
			}
		});

		HL.sort((A, B) => {return B - A});

		let SVG = [[], [], [], [], [], [], [], [], [], [], [], [], []], G = [[]]; 

		RH = HL[0] - HL[HL.length - 1]; CAV = 2;

		for (let A = 0; A < 25; A++) {

			let AY = (Tools.yScale([RH/CAV, HL[0]])[0]*16 + Tools.yScale([RH/CAV, HL[0]])[1]) - Tools.yScale([RH/CAV, HL[0]])[0]*A;

			SVG[4].push([`text`, {x: 20, y: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${AY}`]);
				
			SVG[1].push([`line`, {style: {visibility: (.15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) > .70*Y)? `collapse`: `visible`}, x1: 0, x2: 4000, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);		
		
			SVG[6].push([`line`, {x1: 0, x2: 8, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);		
		}

		let Place = [0];

		Vols = Vols.sort((A, B) => {return B - A});

		Arg.XY.sort((A, B) => {return A[0] - B[0]}).forEach((K, i) => {

			if (K[2].length > 0) {

				SVG[2].push([`line`, {id: `g${K[0]}`, x1: i*7.125 + .05, y1: .15*Y + ((HL[0] - K[2][0])*.35*Y)/(HL[0] - HL[HL.length - 1]), x2: i*7.125 + .05, y2: .15*Y + ((HL[0] - K[2][1])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: .95}]);
				
                let OC = Tools.typen(Tools.coats(K[1]));

                OC.sort((A, B) => {return B - A});
				
				SVG[3].push([`rect`, {id: `g${K[0]}`, x: (i*7.125) - 2, y: .15*Y + ((HL[0] - OC[0])*.35*Y)/(HL[0] - HL[HL.length - 1]), width: 4.25, height: ((OC[0] - OC[1])*.35*Y)/(HL[0] - HL[HL.length - 1]), fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
				
				SVG[10].push([`rect`, {x: (i*7.125) - 2, y: `${102 - (K[3]*100)/Vols[0]}%`, width: 4.25, height: `${(K[3]*100)/Vols[0] - 3}%`, fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
				
				G[0].push([`rect`, {id: Tools.coats(K), class: `info`, x: (i*7.125) - 2, y: 0, width: 4.25, height: `${100}%`, fill: `transparent`, stroke: `transparent`}]);						
			}

			if (K[0] === Split.day) Place[0] = i;
		});

		Place[0] = (Place[0] + Split.C*Split.place); 

		for (let i = 0; i < 24; i++) {

			SVG[7].push([`text`, {x: 7.12*(Place[0] - i*Split.C) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.DateString([Split.day, Split.C*Split.abs, Split.place, i, Split.sub[0], Split.sub[1]])]);

			SVG[0].push([`line`, {x1: 7.12*(Place[0] - i*Split.C) + Split.lox, y1: 0, x2: 7.12*(Place[0] - i*Split.C) + Split.lox, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
		}

		SVG[5] = [`text`, {id: `ZY`, x: 20, y: 0, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}];

		SVG[8] = [`text`, {id: `lapse`, x: Arg[`XY`].length*7.12 - 12, y: 17, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, ``]

		SVG[9] = [`line`, { x1: 0, x2: 4000, y1: `${102 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, y2: `${102 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}];

		SVG[11] = [`text`, {x: 20, y: `${106 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${Tools.yScale([.75*Vols[0], Vols[0]])[0]}`];
				
		SVG[12] = [`line`, {x1: 0, x2: 8, y1: `${102.5 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, y2: `${102.5 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}];
		
		
		return [
			`main`, {id: `plot`, class: `_tY0`, style: {background: `#000`, color: `#fff`, [`font-family`]: `litera`, height: `${100}%`}}, 
				[
					[`div`, {style: {background: `#000`, [`border-bottom`]: `${1}px solid #353535`, height: `${40}px`, padding: `${0}px ${12}px`, width: `${100}%`}}, 
						[[`div`, {class: `_gxM _geQ`}, 
							[
								[`a`, {href: `/`, class: `202411161551`, style: {color: `#fff`, [`font-size`]: `15px`, [`font-weight`]: 300, heght: `${20}px`, wdth: `${20}px`}}, `Qb`], 
								[`div`, {class: `_eYG`, style: {[`border-left`]: `${1}px solid #353535`, height: `${100}%`}}, 
									[[`span`, {style: {[`font-family`]: ``, [`font-size`]: `${12}px`, [`font-weight`]: 300}}, ``]]], 
								[`div`, {class: `_gZz`, style: {[`font-size`]: `${12}px`, [`font-weight`]: 600}}, 
									[[`a`, {class: `v202204261406`, href: (!Clients.mug)? `/signin`: `javascript:;`, style: {height: `${16}px`, width: `${16}px`}}]]]]]]],
					[`div`, {id: `collapsible`, style: {[`border-bottom`]: `${1}px solid #353535`, width: `${100}%`}}, 
						[[`div`, {id: `faves`, class: `_gxM _geQ`, style: {cursor: `grab`, [`font-size`]: `${11}px`}}, this.faveplots()]]],
					[`div`, {id: ``, style: {[`border-bottom`]: `${1}px solid #353535`, pdding: `${0}px ${12}px`, width: `${100}%`}}, 
						[[`div`, {class: `_gxM _geQ`, style: {[`font-size`]: `${11}px`}}, 
							[
								[`div`, {}, 
									[
										[`a`, {id: `mutiple`, href: `javascript:;`, style: {color: `#fff`, [`font-family`]: `intext`, [`font-size`]: `${11}px`, padding: `${6}px ${12}px`}}, `QUIDBIT:${Arg.plot[0].toString().replace(`,`, `/`)}`], 
										[`div`, {id: `mutiple2`, style: {background: `#000`, bottom: `${-2}px`, display: `none`, height: `${3}px`, position: `absolute`, width: `${100}%`, [`z-index`]: 36}}]]],
								[`div`, {style: {}}, 
									[
										[`a`, {id: `splitX`, href: `javascript:;`, style: {[`border-left`]: `${1}px solid #353535`, [`border-right`]: `${1}px solid #353535`, color: `#fff`, [`font-family`]: `intext`, [`font-size`]: `${11}px`, [`letter-spacing`]: `${.25}px`, padding: `${6}px ${12}px`}}, Clients.plotXSplit], 
										[`div`, {id: `splits`, style: {background: `#000`, [`border-bottom`]: `${1}px solid #353535`, [`border-left`]: `${1}px solid #353535`, [`border-right`]: `${1}px solid #353535`, display: `none`, position: `absolute`, top: `${36}px`, width: `${100}%`, [`z-index`]: 16}}, DOM.split]]], 
								[`div`, {style: {[`border-left`]: `${1}px solid #353535`}}]]]]],
					[`div`, {id: `mutiple3`, style: {background: `#000`, [`border`]: `${1}px solid #353535`, [`border-left`]: 0, [`border-top`]: 0, display: `none`, position: `absolute`, top: `${108}px`, [`max-width`]: `${400}px`, width: `${100}%`, [`z-index`]: 16}}, 
						[
							[`div`, {style: {[`border-bottom`]: `${1}px solid #353535`, padding: `${12}px ${12}px ${0}`}}, 
								[
									[`div`, {class: `_gxM _geQ`, style: {background: `#ffffff1c`, [`mrgin-bottom`]: `${12}px`, padding: `${3}px ${6}px`}}, 
										[
											[`span`, {class: `v202412192124`, style: {height: `${16}px`, width: `${16}px`}}],
											[`input`, {id: `quiz`, style: {background: `transparent`, border: `none`, color: `#fff`, [`font-family`]: `qb`, [`font-size`]: `${10}px`, [`letter-spacing`]: `${1.2}px`, outline: `none`, padding: `${4}px ${12}px`, [`text-transform`]: `uppercase`, width: `${100}%`}}]]], 
									[`div`, {class: `_gxM _geQ`, style: {[`font-family`]: `intext`, [`font-size`]: `${11}px`, [`font-weight`]: 300, margin: `${6}px ${0}px`}}, DOM.multiple]]], 
							[`div`, {style: {margin: `${6}px ${12}px ${0}`}}, 
								[[`div`, {class: `_gxM _geQ`, style: {[`font-family`]: `intext`, [`font-size`]: `${9}px`}}, DOM.column]]], 
							[`div`, {id: `list`, style: {[`max-height`]: `${300}px`, [`overflow-y`]: `scroll`, [`scrollbar-width`]: `thin`}}]]],
					[`section`, {id: `collapsible`, class: `_gxM`, style: {width: `${100}%`}}, 
						[
							[`div`, {style: {width: `${80}%`}}, 
								[	
									[`SVG`, {id: `pin`, style: {height: `${100}%`, position: `fixed`, width: `${100}%`}}, 
										[[`path`, {id: ``, style: {}, stroke: `#6A6A6A`, d:``}]]],
									[`svg`, {id: `kline`, height: `${1000}px`, width: `${24*172}px`, style: {cursor: `none` /*`url(/ssl/given/svg/append_202204282015.svg), pointer !important`*/, transform: `translateX(${(X > 540)? -20: -670}px)`}}, 
									[ 
										[`g`, {}, SVG[0]],
										[`g`, {}, SVG[1]],
										[`g`, {}, SVG[2]], 
										[`g`, {id: `XYKline`}, SVG[3]],
										[`g`, {}, [[`path`, {id: `spotline`, stroke: `#FFF`, [`stroke-dasharray`]: 2, d: ``}]]], [`g`, {}, G[0]]]]]], 
							[`div`, {style: {width: `${20}%`}}, 
								[
									[`svg`, {style: {background: `#000`, [`border-left`]: `${1}px solid #353535`, height: `${100}%`, width: `${100}%`}}, 
										[
											[`g`, {id: `spotY`}, 
												[
													[`rect`, {id: `a`, x: 0, height: 20, width: 80}], 
													[`path`, {id: `c`, stroke: `#fff`, d: ``}],
													[`g`, {}, SVG[4]],
													SVG[5],
													[`g`, {}, SVG[6]]]], 
											[`g`, {id: `floatY`, style: {display: `none`}}, 
												[
													[`rect`, {id: `a`, x: 0, height: 20, width: 80, fill: `#FFFFFFA3`}],
													[`path`, {id: `c`, stroke: `#fff`, d: ``}],
													[`text`, {fill: `#000`, x: 20, y: ``, [`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}, ``]]]]]]]]], 
					[`div`, {id: ``, style: {background: `#000000c9`, top: `${108}px`, height: `${30}px`, padding: `${6}px ${12}px`, position: `absolute`, width: `${80}%`, [`z-index`]: 11}}, 
						[[`span`, {id: `info`, style: {[`font-family`]: `qb`, [`font-size`]: `${10.88}px`, [`line-height`]: `${14}px`}}]]], 
					[`div`, {id: ``, class: `_gxM`, style: {background: `#000`, [`border-top`]: `${1}px solid #6a6a6a`, bottom: `${30}px`, position: `absolute`, width: `${100}%`}}, 
						[
							[`div`, {style: {overflow: `hidden`, width: `${80}%`}}, 
								[
									[`svg`, {id: `time`, height: `${27}px`, width: `${24*172}px`, style: {transform: `translateX(${(X > 540)? -20: -670}px)`}}, 
										[[`g`, {}, SVG[7]], SVG[8]]], 
									[`svg`, {height: 18, width: `${100}%`, style: {[`border-top`]: `${1}px solid #6A6A6A`}}]]], 
							[`div`, {style: {[`border-left`]: `${1}px solid #353535`, width: `${20}%`}}], 
							[`div`, {style: {background: `transparent`, bottom: `${46}px`, height: `calc(${10.5}vh)`, position: `absolute`, width: `${100}%`}}, 
								[[`div`, {class: `_gxM`, style: {[`border-top`]: `${2}px solid #6A6A6A`, height: `${100}%`, width: `${100}%`}}, 
									[ 
										[`div`, {id: `vol`, style: {overflow: `hidden`, width: `${80}%`}}, 
											[[`svg`, {id: ``, height: `${100}%`, width: `${24*172}px`, style: {transform: `translateX(${(X > 540)? -20: -670}px)`}}, 
												[SVG[9], [`g`, {}, SVG[10]]]]]], 
										[`div`, {style: {[`background`]: `#000`, [`border-left`]: `${1}px solid #353535`, width: `${20}%`}}, 
											[[`svg`, {id: ``, height: `${100}%`, width: `${100}%`, style: {}}, 
												[
													[`g`, {}, [SVG[11], SVG[12]]],
													[`path`, {id: `floatVol-`, stroke: `#fff`, d: ``}],
													[`text`, {id: `floatVol`, fill: `#fff`, x: 20, y: ``, [`font-family`]: `intext`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}, ``]]]]],
										[`div`, {style: {background: `#000000D9`, [`font-family`]: `intext`, [`font-size`]: `${10.88}px`, [`line-height`]: `${12}px`, margin: `${4}px`, padding: `${4}px`, position: `absolute`, top: 0}}, 
											[[`div`, {class: `_gxM _geQ`}, 
												[
													[`span`, {style: {[`font-family`]: `qb`}}, `Volume`],
													[`span`, {style: {[`font-family`]: `qb`, [`margin-left`]: `${8}px`}}, `(base, 15)`],
													[`span`, {id: `volbase`, style: {[`font-family`]: `qb`, [`margin-left`]: `${8}px`}}, `${Arg.XY[0][3]}`],
													[`span`, {style: {[`font-family`]: `qb`, [`margin-left`]: `${8}px`}}, `0`],
													[`span`, {style: {[`font-family`]: `qb`, [`font-size`]: `${10.88}px`, [`margin-left`]: `${8}px`}}, Arg.plot[0][0]]]]]]]]]]]], 
					[`div`, {style: {background: `#000`, [`border-top`]: `${1}px solid #6a6a6a`, bottom: 0, height: `${30}px`, padding: `${0}px ${12}px`, position: `absolute`, width: `${100}%`, [`z-index`]: 11}}, 
						[[`div`, {class: `_gxM _geQ`}, []]]]]];	
	}, 

	utilApp: (Arg) => {

		let DOM = [];

		if (Arg[0][0] === `fiat` && Arg[0][1] === `index`) {

			Arg[1].utils.forEach(Fiat => {

				DOM.push([`div`, {id: (Fiat.feat[4] === `${Fiat.fiat}-USD`)? Fiat.feat[4]: `${Fiat.feat[4]}_CONVERT`, class: `_geQ _gxM`, style: {padding: `${12}px ${0}px`}}, 
					[
						[`div`, {class: `_geQ _gxM`, style: {overflow: `hidden`, [`width`]: `${20}%`}}, 
							[
								[`img`, {src: `/ssl/given/svg/${Constants.SVG[Fiat.fiat]}.svg`, style: {height: `${20}px`, [`max-width`]: `${20}px`, transform: `translateX(${0}px)`}}], 
								[`div`, {class: `_gxM`, style: {[`white-space`]: `nowrap`, width: `${75}%`}}, [[`span`, {style: {[`font-size`]: `${12}px`, [`font-weight`]: 300, [`margin-left`]: `${8}px`, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `capitalize`}}, `${Fiat.feat[3]}`]]]]], 
						[`div`, {style: {[`align-items`]: `end`, width: `${10}%`}}, [[`span`, {style: {color: `#8e8e8e`, [`font-family`]: ``, [`font-size`]: `${11}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Fiat.fiat}`]]], 
						[`div`, {style: {width: `${22.5}%`}}, 
							[[`span`, {id: `COST`, decimal: Fiat.feat[1], style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`,[`font-weight`]: 300, [`letter-spacing`]: `${0}px`, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {width: `${15}%`}}, 
							[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {width: `${15}%`}}, 
							[[`span`, {style: {[`font-family`]: `geometria`, [`font-size`]: `${11}px`,[`font-weight`]: 600, [`letter-spacing`]: `${.75}px`, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {[`align-items`]: `end`, width: `${17.5}%`}}, 
							[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.7064}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, ``]]]]])
			});
		}

		if (Arg[0][0] === `spot` && Arg[0][1] === `index`) {

			Arg[1].utils.forEach(Spot => {

				DOM.push([`div`, {id: `${Spot.pair.toString().replace(`,`, `-`)}`, class: `_geQ _gxM`, style: {padding: `${12}px ${0}px`}}, 
					[
						[`div`, {class: `_geQ _gxM`, style: {[`width`]: `${30}%`}}, 
							[
								[`img`, {src: `/ssl/given/svg/${Constants.SVG[Spot.pair[0]]}.svg`, style: {height: `${20}px`, [`max-width`]: `${20}px`, transform: `translateX(${0}px)`}}],
								[`img`, {src: `/ssl/given/svg/${Constants.SVG[Spot.pair[1]]}.svg`, style: {height: `${20}px`,[`max-width`]: `${20}px`, transform: `translateX(${-6.6667}px)`}}], 
								[`a`, {href: `/trade/${Spot.pair[0]}_${Spot.pair[1]}`, class: `_gxM`, style: {[`align-items`]: `baseline`, color: `#fff`, display: `flex`, [`font-family`]: `qb`, }}, 
									[ 
										[`span`, {style: {[`font-size`]: `${12}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Spot.pair[0]}`], 
										[`span`, {style: {color: `#8e8e8e`, [`font-size`]: `${10}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `/${Spot.pair[1]}`]]]]], 
						[`div`, {style: {width: `${22.5}%`}}, 
							[[`span`, {id: `COST`, style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`,[`font-weight`]: 300, [`letter-spacing`]: `${0}px`, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {width: `${15}%`}}, 
							[[`span`, {id: `MOD`, style: {color: `#02ff02`, [`font-family`]: `intext`, [`font-size`]: `${13}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {width: `${15}%`}}, 
							[[`span`, {style: {[`font-family`]: `geometria`, [`font-size`]: `${11}px`,[`font-weight`]: 600, [`letter-spacing`]: `${.75}px`, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {[`align-items`]: `end`, width: `${17.5}%`}}, 
							[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.7064}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, ``]]]]])
			});
		}

		if (Arg[0][0] === `tokens` && Arg[0][1] === `index`) {

			Arg[1].utils.forEach(Coin => {

				DOM.push([`div`, {id: `${Coin.token}-USD`, class: `_geQ _gxM`, style: {padding: `${12}px ${0}px`}}, 
					[
						[`div`, {class: `_geQ _gxM`, style: {overflow: `hidden`, [`width`]: `${20}%`}}, 
							[
								[`img`, {src: `/ssl/given/svg/${Constants.SVG[Coin.token]}.svg`, style: {height: `${20}px`, [`max-width`]: `${20}px`, transform: `translateX(${0}px)`}}], 
								[`div`, {class: `_gxM`, style: {[`white-space`]: `nowrap`, width: `${75}%`}}, [[`span`, {style: {[`font-size`]: `${12}px`, [`font-weight`]: 300, [`margin-left`]: `${8}px`, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `capitalize`}}, `${Coin.feat[3]}`]]]]], 
						[`div`, {style: {[`align-items`]: `end`, width: `${10}%`}}, [[`span`, {style: {color: `#8e8e8e`, [`font-size`]: `${11}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Coin.token}`]]], 
						[`div`, {style: {width: `${22.5}%`}}, 
							[[`span`, {id: `COST`, style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`,[`font-weight`]: 300, [`letter-spacing`]: `${0}px`, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {width: `${15}%`}}, 
							[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {width: `${15}%`}}, 
							[[`span`, {style: {[`font-family`]: `geometria`, [`font-size`]: `${11}px`,[`font-weight`]: 600, [`letter-spacing`]: `${.75}px`, [`text-align`]: `right`}}, ``]]], 
						[`div`, {style: {[`align-items`]: `end`, width: `${17.5}%`}}, 
							[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.7064}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, ``]]]]])
			});
		}

		return DOM;
	}
};

View = new View;
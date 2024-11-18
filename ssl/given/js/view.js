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
		[[`currency`, 20], [`symbol`, 10], [`price(usd)`, 22.5, true], [`24h%`, 15, true], [`vol.(24h)`, 15, true],, [`liquid`, 17.5, true]],
		[], []];

		Web.utils.forEach(Fiat => {

			Pairs[2].push([`div`, {id: ``, class: `_geQ _gxM`, style: {padding: `${12}px ${0}px`}}, 
				[
					[`div`, {class: `_geQ _gxM`, style: {overflow: `hidden`, [`width`]: `${20}%`}}, 
						[
							[`img`, {src: `/ssl/given/svg/${Constants.SVG[Fiat.fiat]}.svg`, style: {height: `${20}px`, [`max-width`]: `${20}px`, transform: `translateX(${0}px)`}}], 
							[`div`, {class: `_gxM`, style: {[`white-space`]: `nowrap`, width: `${75}%`}}, [[`span`, {style: {[`font-size`]: `${12}px`, [`font-weight`]: 300, [`margin-left`]: `${8}px`, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `capitalize`}}, `${Fiat.feat[3]}`]]]]], 
					[`div`, {style: {width: `${10}%`}}, [[`span`, {style: {color: `#fff`, [`font-size`]: `${12}px`, [`font-weight`]: 600, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `${Fiat.fiat}`]]], 
					[`div`, {style: {width: `${22.5}%`}}, 
						[[`span`, {id: `COST`, style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`,[`font-weight`]: 300, [`letter-spacing`]: `${0}px`, [`text-align`]: `right`}}, `${Fiat.column[0]}`]]], 
					[`div`, {style: {width: `${15}%`}}, 
						[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${13}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, `${Fiat.column[1]}%`]]], 
					[`div`, {style: {width: `${15}%`}}, 
						[[`span`, {style: {[`font-family`]: `geometria`, [`font-size`]: `${11}px`,[`font-weight`]: 600, [`letter-spacing`]: `${.75}px`, [`text-align`]: `right`}}, `-`]]], 
					[`div`, {style: {[`align-items`]: `end`, width: `${17.5}%`}}, 
						[[`span`, {id: `MOD`, style: {[`font-family`]: `intext`, [`font-size`]: `${11.7064}px`, [`font-weight`]: 300, [`letter-spacing`]: 0, [`text-align`]: `right`}}, `-`]]]]])
		});

		return [
			`main`, {id: `app`, class: `_tY0`, style: {background: `#000`, color: `#fff`, [`font-family`]: `litera`, height: `${100}%`}}, 
				[
					[`div`, {style: {background: `#000`, [`border-bottom`]: `${1}px solid #0000ff30`, padding: `${10}px ${24}px`, position: `fixed`, width: `${100}%`, [`z-index`]: 11}}, 
						[[`div`, {class: `_gxM _geQ`}, 
							[
								[`span`, {class: `v202411161551`, style: {height: `${24}px`, width: `${24}px`}}], 
								[`div`, {class: `_eYG`}, 
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
											[`span`, {style: {[`border-bottom`]: `${0}px solid`, [`font-weight`]: 600, margin: `${6}px ${12}px ${6}px ${0}`}}, `Currencies`],
											[`span`, {style: {margin: `${6}px ${12}px`, opacity: 0.5}}, `Tokens`],
											[`span`, {style: {margin: `${6}px ${12}px`, opacity: 0.5}}, `Spot`],
											[`span`, {style: {margin: `${6}px ${12}px`, opacity: 0.5}}, `Commodities`]]],
									[`div`, {class: `_gxM _geQ`, style: {}}, 
										[
											[`a`, {href: `javascript:;`, style: {border: `${1}px solid`, [`border-radius`]: `${100}px`, color: `#fff`, [`font-weight`]: 600, margin: `${6}px ${12}px ${6}px ${0}`, padding: `${6}px ${12}px`}}, `All`],
											[`a`, {href: `javascript:;`, style: {border: `${1}px solid #ffffff1c`, [`border-radius`]: `${100}px`, color: `#fff`, [`font-size`]: `${11}px`, margin: `${6}px ${12}px ${6}px ${0}`, padding: `${6}px ${12}px`}}, `NEW`]]],
									[`div`, {class: `_geQ _gxM`, style: {[`margin`]: `${12}px ${0}px`}}, columns([Pairs[0], []])]]],
							[`section`, {style: {[`font-size`]: `${12}px`, margin: `${0} ${24}px`}}, [[`div`, {}, Pairs[2]]]]]],
					[`div`, {style: {background: `#000`, [`border-top`]: `${1}px solid #0000ff30`, bottom: 0, padding: `${6}px ${24}px`, position: `fixed`, width: `${100}%`, [`z-index`]: 11}}, 
						[[`div`, {class: `_gxM _geQ`}, 
							[
								[`span`, {style: {[`font-size`]: `${12}px`, [`font-weight`]: 300}}, `Quidbit ®`],
								[`span`, {style: {[`font-family`]: `geometria`, [`font-size`]: `${10}px`, [`font-weight`]: 600}}, `2024`], 
								[`div`, {class: `_gZz`}, [[`span`, {style: {color: `#535353`, [`font-family`]: `geometria`, [`font-size`]: `${10}px`, [`font-weight`]: 300}}, `v0.24.3`]]]]]]]]];
	}
};

View = new View;
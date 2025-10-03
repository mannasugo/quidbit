`use strict`;

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).valueOf();

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

    io().on(`plotY`, Spot => {

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

    io().on(`plotY`, Spot => {

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

      if (Plot[Arg.plot[0].toString().replace(`,`, `-`)]) { ZY = Plot[Arg.plot[0].toString().replace(`,`, `-`)] }

      if (parseFloat(ZY) > 0) { document.title = `QB:${Arg.plot[0].toString().replace(`,`, `/`)} ${ZY}` }

      if (RECT.length > 0 && ZY > 0 && document.querySelector(`#ZY`)) {

        HL.push(ZY);

        HL.sort((A, B) => {return B - A}); 

        RECT = document.querySelectorAll(`#kline rect`); 

        X = RECT[RECT.length - 1].getAttribute(`x`);

        document.querySelector(`#ZY`).innerHTML = parseFloat(ZY).toFixed(Arg.plot[1] -1);

        document.querySelector(`#ZY`).setAttribute(`y`, .15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4);

        document.querySelector(`#spotline`).setAttribute(`d`, `M${parseFloat(X)} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5} ${4000} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5}`);

        let YZOC = [Tools.typen(RECT[RECT.length - 1].id)[1][0], parseFloat(ZY)];

        YZOC[0] = parseFloat(YZOC[0]);

        document.querySelector(`#spotline`).setAttribute(`stroke`, (YZOC[0] > YZOC[1])? `#e3415d`: `#6bc679`);

        document.querySelector(`#spotY #a`).setAttribute(`width`, parseFloat(ZY).toFixed(Arg.plot[1]).toString().length*8.5);

        document.querySelector(`#spotY #a`).setAttribute(`y`, .15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) - 10);

        document.querySelector(`#spotY #a`).setAttribute(`fill`, (YZOC[0] > YZOC[1])? `#e3415d5e`: `#6bc6795e`);

        document.querySelector(`#spotY #b`).setAttribute(`width`, parseFloat(ZY).toFixed(Arg.plot[1]).toString().length*8.5 - 15);

        document.querySelector(`#spotY #b`).setAttribute(`y`, .15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) - 10);

        document.querySelector(`#spotY #b`).setAttribute(`fill`, (YZOC[0] > YZOC[1])? `#e3415d5e`: `#6bc6795e`);

        document.querySelector(`#spotY #c`).setAttribute(`d`, `M${0} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5} ${8} ${.15*Y + ((HL[0] - ZY)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5}`);
      
        document.querySelector(`#spotY #c`).setAttribute(`stroke`, (YZOC[0] > YZOC[1])? `#e3415d`: `#6bc679`);

        let tSZ = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours() }:00`).valueOf();

        if (Clients.plotXSplit === `1M`) {

          tSZ = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours() }:${new Date().getMinutes()}`).valueOf();
        }

        if (document.querySelector(`rect#g${tSZ}`)) {

          ZY = parseFloat(ZY);

          let Candle = [document.querySelector(`rect#g${tSZ}`)];

          if (Tools.typen(Candle[0].getAttribute(`info`)).length === 0) {

            Candle[0].setAttribute(`info`, Tools.coats([ZY, ZY]))
          }

          let K = Tools.typen(Candle[0].getAttribute(`info`));

          K[0] = parseFloat(K[0])

          K[1] = parseFloat(ZY);

          let OC = Tools.typen(Tools.coats(K));

          OC.sort((A, B) => {return B - A});

          Candle[0].setAttribute(`y`, .15*Y + ((HL[0] - OC[0])*.35*Y)/(HL[0] - HL[HL.length - 1]));

          Candle[0].setAttribute(`height`, ((OC[0] - OC[1])*.35*Y)/(HL[0] - HL[HL.length - 1]));

          Candle[0].setAttribute(`fill`, (K[0] > K[1])? `#e3415d`: `#000`);
        
          Candle[0].setAttribute(`stroke`, (K[0] > K[1])? `#e3415d`: `#6bc679`);

          //document.querySelector(`#spotline`).setAttribute(`stroke`, (K[0] > K[1])? `#e3415d`: `#6bc679`);        
        }

        document.querySelectorAll(`.info`).forEach(SVG => {

          if (Tools.typen(SVG.id)[2][0] === HL[0]) {

            document.querySelector(`#yz`).innerHTML = parseFloat(HL[0]);

            document.querySelector(`#yz`).setAttribute(`x`, SVG.getAttribute(`x`));

            document.querySelector(`#yz`).setAttribute(`y`, (.15*Y + ((HL[0] - HL[0])*.35*Y)/(HL[0] - HL[HL.length - 1])) - 10);
          }

          if (Tools.typen(SVG.id)[2][1] === HL[HL.length - 1]) {

            document.querySelector(`#ya`).innerHTML = parseFloat(HL[HL.length - 1]);

            document.querySelector(`#ya`).setAttribute(`x`, SVG.getAttribute(`x`));

            document.querySelector(`#ya`).setAttribute(`y`, (.15*Y + ((HL[0] - HL[HL.length - 1])*.35*Y)/(HL[0] - HL[HL.length - 1])) + 20);
          }
        });
      }
    });

    this.listen([document.querySelector(`#modalSwap`), `click`, S => {

      let Obj = this.getSource(S).parentNode.querySelector(`div`);

      Obj.style.display = (Obj.style.display === `flex`)? `none`: `flex`;
    }]);

    this.listen([document.querySelector(`#modalWallet`), `click`, S => {

      let Obj = this.getSource(S).parentNode.querySelector(`div`);

      Obj.style.display = (Obj.style.display === `flex`)? `none`: `flex`;

      if (Clients.mug) {

        let XHR = Tools.pull([
          `/json/web`, {
            flag: `balance`,
            mug: (Clients.mug) ? Clients.mug: false, pull: `wallets`}]);

        XHR.onload = () => {

          let Obj = Tools.typen(XHR.response);

          Clients.hold = Tools.coats(Obj.hold);

          document.querySelectorAll(`#balance`)[1].previousElementSibling.innerText = Obj.hold[document.querySelectorAll(`#balance`)[1].innerText];
        }
      }
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
                  [`img`, {src: `/wa/get/svg/${Constants.SVG[Stat[0].split(`-`)[0]]}.svg`, style: {height: `${16}px`, [`max-width`]: `${16}px`, transform: `translateX(${0}px)`}}],
                  [`img`, {src: `/wa/get/svg/${Constants.SVG[Stat[0].split(`-`)[1]]}.svg`, style: {height: `${16}px`,[`max-width`]: `${16}px`, transform: `translateX(${-3.6667}px)`}}], 
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
                  [`img`, {src: `/wa/get/svg/${Constants.SVG[Stat[0].split(`-`)[0]]}.svg`, style: {height: `${16}px`, [`max-width`]: `${16}px`, transform: `translateX(${0}px)`}}],
                  [`img`, {src: `/wa/get/svg/${Constants.SVG[Stat[0].split(`-`)[1]]}.svg`, style: {height: `${16}px`,[`max-width`]: `${16}px`, transform: `translateX(${-3.6667}px)`}}], 
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

        Clients.plotXSplit = Val.innerText;

        document.querySelectorAll(`.ival`).forEach(A => {A.style.background = `#000`;});

        document.querySelectorAll(`.ival-alt`).forEach(A => {A.style.display = `none`;});

        Val.style.background = `#8888881C`;

        document.querySelector(`#splitX span`).innerHTML = Val.innerHTML;

        let Puts = Tools.pull([
          `/json/web/`, {
            mug: (Clients.mug) ? Clients.mug: false,
            pull: `plot`, plot: Arg.plot[0], splitX: Clients.plotXSplit, ts: new Date().valueOf(), tsDay: DAY, 
            x: parseInt((((document.body.clientWidth - 360)*.8)/7.5).toFixed(0))}]);  

        Puts.onload = () => {

          let Web = Tools.typen(Puts.response);

          if (Web.plot) this.altSplit(Web);
        }
      }])});

    this.listen([document.querySelector(`#kline`), `mousemove`, S => {

      //this.getSource(S).style.cursor = `none`

      document.querySelector(`#pin path`).setAttribute(`d`, `M${0} ${S.clientY - 107 + .5} ${4000} ${S.clientY - 107 + .5} M${S.clientX + .5} ${0} ${S.clientX + .5} ${1000}`);

      document.querySelector(`#floatY #c`).setAttribute(`d`, `M${0} ${S.layerY + .5} ${8} ${S.layerY + .5}`);

      document.querySelector(`#floatY #a`).setAttribute(`y`, S.layerY - 10);

      document.querySelector(`#floatY text`).setAttribute(`y`, S.layerY + 4);

      HL = HL.sort((A, B) => {return B - A}); 

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

    let Split = Constants.ival[Clients.plotXSplit];

    let ts_z = Arg.XY.sort((A, B) => {return B[0] - A[0]})[0][0];

    let Pan = [0, 0];

    this.listen([document.querySelector(`#kline`), `mousedown`, S => { 

      this.getSource(S).style.cursor = `grab`

      Pan = [0, S.layerX];
    }]);

    this.listen([document.querySelector(`#kline`), `mouseup`, S => {

      //this.getSource(S).style.cursor = `none`;

      Pan = [S.layerX, Pan[1]];

      Split = Constants.ival[Clients.plotXSplit];

      let move, ts;

      if ((Pan[1] - Pan[0]) < 0) {

        move = parseFloat((-(Pan[1] - Pan[0])/5).toFixed(0));

        ts_z = ts_z - Split.abs*move;

        ts = new Date().valueOf(); Clients.tSZ = ts_z
      }

      if ((Pan[1] - Pan[0]) > 1) {

        move = parseFloat(((Pan[1] - Pan[0])/5).toFixed(0)); Clients.move = move

        ts_z = ts_z + Split.abs*move;

        ts = new Date().valueOf(); Clients.tSZ = ts_z
      }

      if ((Pan[1] - Pan[0]) < 0 || (Pan[1] - Pan[0]) > 1) {

        let tsDAY = new Date(`${new Date(ts_z).getFullYear()}-${new Date(ts_z).getMonth() + 1}-${new Date(ts_z).getDate()}`).valueOf();

        io().emit(`az`, [Arg.plot[0], Clients.plotXSplit, parseInt((((document.body.clientWidth - 360)*.8)/6.95).toFixed(0)), ts_z, ts, tsDAY]);

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

            let G = document.querySelectorAll(`svg .g`), OM = [[]], SVG = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

            for (let A = 0; A < 25; A++) {

              let AY = (Tools.yScale([RH/CAV, HL[0]])[0]*16 + Tools.yScale([RH/CAV, HL[0]])[1]) - Tools.yScale([RH/CAV, HL[0]])[0]*A;

              SVG[1].push([`line`, {style: {visibility: (.15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) > .70*Y)? `collapse`: `visible`}, x1: 0, x2: 4000, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);    
    
              SVG[4].push([`text`, {x: 20, y: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${AY}`]);
        
              SVG[6].push([`line`, {x1: 0, x2: 8, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);    
            }

            Vols = Vols.sort((A, B) => {return B - A});

            let tsz = AZ[1].sort((A, B) => {return B[0] - A[0]})[0][0];

            tsz = new Date(`${new Date(tsz).toLocaleDateString()} ${new Date(tsz).getHours()}:00`).valueOf() + Split.abs*Split.C*4;

            if (Split.abs === 60000*60) tsz = new Date(new Date(tsz).toLocaleDateString()).valueOf() - Split.abs*Split.C;

            let Xlet = [];

            for (let i = 0; i < document.body.clientWidth/(Split.C*4.75) + 2; i++) {Xlet.push(tsz - i*Split.abs*Split.C);}

            let Old = [];

            Tools.typen(Clients.old)[1].forEach(Obj => {

              if (Clients.plotXSplit === `1D`) {

                Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} 00:00`).valueOf();

                Old.push(Obj);
              }

              if (Clients.plotXSplit === `1H`) {

                Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf();

                Old.push(Obj);
              }

      if (Clients.plotXSplit === `30M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/30)*30*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `15M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/15)*15*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `5M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/5)*5*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `3M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/3)*3*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      }

      if (Clients.plotXSplit === `1M`) {

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:${new Date(Obj[3]).getMinutes()}`).valueOf();

        Old.push(Obj);
      }       
            });

            AZ[1].sort((A, B) => {return A[0] - B[0]}).forEach((K, i) => {

              if (K[2].length > 0) {

                SVG[2].push([`line`, {id: `g${K[0]}`, x1: i*7.125 + .05, y1: .15*Y + ((HL[0] - K[2][0])*.35*Y)/(HL[0] - HL[HL.length - 1]), x2: i*7.125 + .05, y2: .15*Y + ((HL[0] - K[2][1])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: .95}]);
        
                let OC = Tools.typen(Tools.coats(K[1]));

                OC.sort((A, B) => {return B - A});
        
                SVG[3].push([`rect`, {id: `g${K[0]}`, x: (i*7.125) - 2, y: .15*Y + ((HL[0] - OC[0])*.35*Y)/(HL[0] - HL[HL.length - 1]), width: 4.25, height: ((OC[0] - OC[1])*.35*Y)/(HL[0] - HL[HL.length - 1]), fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
        
                SVG[10].push([`rect`, {x: (i*7.125) - 2, y: `${102 - (K[3]*100)/Vols[0]}%`, width: 4.25, height: `${(K[3]*100)/Vols[0] - 3}%`, fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
        
                SVG[13].push([`rect`, {id: Tools.coats(K), class: `info`, x: (i*7.125) - 2, y: 0, width: 4.25, height: `${100}%`, fill: `transparent`, stroke: `transparent`}]);            
              }

              Old.forEach(Obj => {

                if (Obj.indexOf(K[0]) > -1) {

                  OM[0].push([`g`, {style: {cursor: `pointer`}}, 
                    [[`circle`, {r: 8, cx: i*7.12, cy: .15*Y + ((HL[0] - Obj[2])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: `#fff`, [`stroke-width`]: 1}], 
                    [`circle`, {r: 4, cx: i*7.12, cy: .15*Y + ((HL[0] - Obj[2])*.35*Y)/(HL[0] - HL[HL.length - 1]), style: {cursor: `pointer`}, fill: (Obj[0] === `sell`)? `#e3415d`: `#6bc679`, stroke: `none`, [`stroke-width`]: 1}]]]);
                }
              });

              if (Xlet.indexOf(K[0]) > -1 && Clients.plotXSplit !== `30M` && Clients.plotXSplit !== `1D`) {

                SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

                SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
              }

              let X_D = new Date(`${new Date(K[0]).getFullYear()}-${new Date(K[0]).getMonth() + 1}-${new Date(K[0]).getDate()} 00:00`).valueOf();

              if (Clients.plotXSplit === `30M` && K[0] === X_D) {

                SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${10.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

                SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
              }

              if (Clients.plotXSplit === `1D` && new Date(K[0]).getDate() === 1) {

                SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

                SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
              }
            });

            /**/

            SVG[5] = [[`text`, {id: `ZY`, x: 20, y: 0, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}]];

            /**/
            G.forEach((Vect, i) => {

              View.pop();

              Vect.innerHTML = View.ModelDOM(SVG[i]);
            });

            document.querySelector(`#g`).innerHTML = View.ModelDOM(SVG[13]);

            document.querySelector(`#gSwap`).innerHTML = View.ModelDOM(OM[0]);

            document.querySelectorAll(`.info`).forEach(SVG => {

              this.listen([SVG, `mouseover`, S => {

                let Stat = Tools.typen(this.getSource(S).id);

                document.querySelector(`#info`).style.display = `flex`;

                document.querySelector(`#info`).innerHTML = `${new Date(Stat[0]).toString().substr(4, 17)} Open: ${Stat[1][0]} High: ${Stat[2][0]} Low: ${Stat[2][1]} Close: ${Stat[1][1]} ${((Stat[1][1] - Stat[1][0])/Stat[1][0]*100).toFixed(2)}%`;
      
                document.querySelector(`#volbase`).style.color = (Stat[1][0] > Stat[1][1])? `#E3415D`: `#6BC679`;

                document.querySelector(`#volbase`).innerHTML = Stat[3];
              }])});

            View.pop();

            View.DOM([`#gSwapY`, Models.init.toSwap({HL: HL, Y: Y})]);
          }
        });   
      }
    }]);

    if (document.querySelector(`#modalMug`)) {

      this.listen([document.querySelector(`#modalMug`), `click`, S => {

        View.pop();

        View.DOM([`#modal`, [Models.inputMug([2])]]);

        this.emailSalt();

        document.querySelector(`#modal`).style.display = `flex`;
      }]);
    }

    document.querySelectorAll(`#walletOptions a`).forEach(Child => {

      this.listen([Child, `click`, S => {

        document.querySelectorAll(`#walletOptions a`).forEach(A => {A.style.background = `none`;});

        Child.style.background = `#242471`;

        document.querySelector(`#walletSelect img`).src = `/wa/get/svg/${Constants.SVG[Child.querySelectorAll(`span`)[0].innerHTML]}.svg`;

        document.querySelectorAll(`#walletSelect span`)[0].innerHTML = Child.querySelectorAll(`span`)[0].innerHTML;

        document.querySelectorAll(`#walletSelect span`)[1].innerHTML = Child.querySelectorAll(`span`)[1].innerHTML;

        document.querySelector(`#walletOptions`).style.display = `none`;

        document.querySelector(`#holds #balance`).innerHTML = Child.querySelectorAll(`span`)[0].innerText;

        document.querySelector(`#holds #balance`).previousElementSibling.innerText = Tools.typen(Clients.hold)[document.querySelector(`#holds #balance`).innerText];

        document.querySelector(`#viaSelect`).innerHTML = Constants.wallet[Child.querySelectorAll(`span`)[0].innerHTML][1];

        document.querySelector(`#initWallet a`).setAttribute(`for`, `${Tools.coats([Child.querySelectorAll(`span`)[0].innerText, Constants.wallet[Child.querySelectorAll(`span`)[0].innerHTML][1]])}`)
      
        document.querySelector(`#walletout`).setAttribute(`for`, `${Tools.coats([Child.querySelectorAll(`span`)[0].innerText, Constants.wallet[Child.querySelectorAll(`span`)[0].innerHTML][1]])}`)
      
        document.querySelector(`#initWallet`).style.display = (!Tools.typen(Clients.wallets)[Child.querySelectorAll(`span`)[0].innerText])? `flex`: `none`;
      
        document.querySelector(`#toAddress`).style.display = (!Tools.typen(Clients.wallets)[Child.querySelectorAll(`span`)[0].innerText])? `none`: `flex`;
      
        document.querySelectorAll(`#toAddress span`)[1].innerText = (Tools.typen(Clients.wallets)[Child.querySelectorAll(`span`)[0].innerText])? Tools.typen(Clients.wallets)[Child.querySelectorAll(`span`)[0].innerText][0][0]: ``;
      }]);
    });

    this.listen([document.querySelector(`#toAddress a`), `click`, S => {

        navigator.clipboard.writeText(document.querySelectorAll(`#toAddress span`)[1].innerText);

        document.querySelector(`#toAddress path`).style.strokeOpacity = .5;

        setTimeout(() => {

          document.querySelector(`#toAddress path`).style.strokeOpacity = 1;
      }, 3000);
    }]);

    this.listen([document.querySelector(`#initWallet a`), `click`, S => {

      document.querySelector(`#initWallet`).style.display = `none`;

      document.querySelector(`#toAddress`).style.display = `flex`;

      let XHR = Tools.pull([
        `/json/web`, {
          flag: `init`,
          mug: (Clients.mug) ? Clients.mug: false, pull: `wallets`, wallet: Tools.typen(this.getSource(S).getAttribute(`for`))}]);

      XHR.onload = () => {

        let Obj = Tools.typen(XHR.response);

        if (Obj && Obj.address) document.querySelectorAll(`#toAddress span`)[1].innerText = Obj.address;
      }
    }]);

    this.listen([document.querySelector(`#walletout`), `click`, S => {

      if (!Clients.mug) {

        View.pop();

        View.DOM([`#modal`, [Models.inputMug([2])]]);

        this.emailSalt();

        document.querySelector(`#modal`).style.display = `flex`;

      }

      if (Clients.mug) {
        
        let Values = [
          (!Tools.slim(document.querySelector(`#amountto`).value))? false: Tools.slim(document.querySelector(`#amountto`).value),
          (!Tools.slim(document.querySelector(`#walletto`).value))? false: Tools.slim(document.querySelector(`#walletto`).value)];

        if (Values[0] === false || Values[1] === false || typeof parseFloat(Values[0]) !== `number`) return;

        let XHR = Tools.pull([
          `/json/web`, {
            flag: `walletto`, mug: (Clients.mug) ? Clients.mug: false, float: parseFloat(Values[0]), pull: `wallets`, wallet: [Values[1], 
            Tools.typen(this.getSource(S).getAttribute(`for`))]}]);

        Values = [];

        XHR.onload = () => {

          let Obj = Tools.typen(XHR.response);

          //if (Obj && Obj.mug) document.querySelectorAll(`#toAddress span`)[1].innerText = Obj.address;
        }
      }
    }]);

    this.listen([document.querySelector(`#limit`), `keyup`, S => {

      let Slot = this.getSource(S);

      let a = Slot.value[Slot.value.length - 1];

      if (a === `.` && Slot.value.indexOf(`.`) !== Slot.value.length - 1) Slot.value = Slot.value.substr(0, Slot.value.length - 1);

      else if (!parseInt(a) && parseInt(a) !== 0 && a !== `.`) Slot.value = Slot.value.substr(0, Slot.value.length - 1);

      document.querySelector(`#quantity`).value = (parseFloat(document.querySelector(`#total`).value)/Slot.value);

      document.querySelector(`#total`).value = (Slot.value*parseFloat(document.querySelector(`#quantity`).value));

      HL = HL.sort((A, B) => {B - A});

      document.querySelectorAll(`#limitSet circle`)[0].setAttribute(`cy`, .15*Y + ((HL[0] - Slot.value)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5);

      document.querySelectorAll(`#limitSet circle`)[1].setAttribute(`cy`, .15*Y + ((HL[0] - Slot.value)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5);

      document.querySelectorAll(`#limitSet circle`)[1].setAttribute(`stroke`, (document.querySelector(`#execute`).getAttribute(`role`) === `sell`)? `#e3415d`: `#6bc679`);

      document.querySelector(`#limitSetline path`).setAttribute(`stroke`, (document.querySelector(`#execute`).getAttribute(`role`) === `sell`)? `#e3415d`: `#6bc679`);

      document.querySelector(`#limitSetline path`).setAttribute(`d`, `M${0} ${.15*Y + ((HL[0] - Slot.value)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5} ${4000} ${.15*Y + ((HL[0] - Slot.value)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5}`)

      document.querySelector(`#limitSet text`).setAttribute(`y`, .15*Y + ((HL[0] - Slot.value)*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5 + 3.5);

      document.querySelector(`#limitSet text`).innerHTML = Slot.value;

      document.querySelector(`#limitSetline`).style.display = `flex`;

      document.querySelector(`#limitSet`).style.display = `flex`;
    }]);

    this.listen([document.querySelector(`#total`), `keyup`, S => {

      let Slot = this.getSource(S);

      let a = Slot.value[Slot.value.length - 1];

      if (a === `.` && Slot.value.indexOf(`.`) !== Slot.value.length - 1) Slot.value = Slot.value.substr(0, Slot.value.length - 1);

      else if (!parseInt(a) && parseInt(a) !== 0 && a !== `.`) Slot.value = Slot.value.substr(0, Slot.value.length - 1);

      if (Clients.typeSwap && Clients.typeSwap === `limit`) {

        document.querySelector(`#quantity`).value = (Slot.value/parseFloat(document.querySelector(`#limit`).value));
      }

      else document.querySelector(`#quantity`).value = (Slot.value/Tools.typen(Clients.plot)[Slot.getAttribute(`info`)])
    }]);

    this.listen([document.querySelector(`#quantity`), `keyup`, S => {

      let Slot = this.getSource(S);

      let a = Slot.value[Slot.value.length - 1];

      if (a === `.` && Slot.value.indexOf(`.`) !== Slot.value.length - 1) Slot.value = Slot.value.substr(0, Slot.value.length - 1);

      else if (!parseInt(a) && parseInt(a) !== 0 && a !== `.`) Slot.value = Slot.value.substr(0, Slot.value.length - 1);

      if (Clients.typeSwap && Clients.typeSwap === `limit`) {

        document.querySelector(`#total`).value = (Slot.value*parseFloat(document.querySelector(`#limit`).value));
      }

      else document.querySelector(`#total`).value = (Slot.value*Tools.typen(Clients.plot)[Slot.getAttribute(`info`)])
    }]);

    document.querySelectorAll(`#action`).forEach(SPAN => {

      this.listen([SPAN, `click`, S => {

        let idSlot = this.getSource(S).getAttribute(`for`);

        if (idSlot === `buy`) {

          this.getSource(S).style.background = `#242471`;

          this.getSource(S).parentNode.querySelectorAll(`#action`)[1].style.background = `#0b0b48`;

          document.querySelector(`#hold`).innerText = (Clients.hold)? `${Tools.typen(Clients.hold)[Arg.plot[0][1]]}`: `0.00`;

          this.getSource(S).parentNode.parentNode.parentNode.parentNode.querySelector(`#balance`).innerText = Arg.plot[0][1];

          document.querySelector(`#execute`).style.border = `${1}px solid lime`;

          document.querySelector(`#execute`).style.background = `#00ff001a`;

          document.querySelector(`#execute`).innerHTML = `Review & Buy`;

          document.querySelector(`#execute`).setAttribute(`role`, `buy`);     
        }

        if (idSlot === `deposit`) {

          this.getSource(S).style.background = `#242471`;

          this.getSource(S).nextElementSibling.style.background = `#0b0b48`;

          document.querySelectorAll(`.wallet-in`).forEach(DOM => {

            DOM.style.display = `flex`;
          });

          document.querySelectorAll(`.wallet-out`).forEach(DOM => {

            DOM.style.display = `none`;
          });
        }

        if (idSlot === `sell`) {

          this.getSource(S).style.background = `#242471`;

          this.getSource(S).parentNode.querySelectorAll(`#action`)[0].style.background = `#0b0b48`;

          document.querySelector(`#hold`).innerText = (Clients.hold)? `${Tools.typen(Clients.hold)[Arg.plot[0][0]]}`: `0.00`;

          this.getSource(S).parentNode.parentNode.parentNode.parentNode.querySelector(`#balance`).innerHTML = Arg.plot[0][0];

          document.querySelector(`#execute`).style.border = `${1}px solid red`;

          document.querySelector(`#execute`).style.background = `#ff00001a`;

          document.querySelector(`#execute`).innerHTML = `Review & Sell`;

          document.querySelector(`#execute`).setAttribute(`role`, `sell`);
        }

        if (idSlot === `withdraw`) {

          this.getSource(S).style.background = `#242471`;

          this.getSource(S).previousElementSibling.style.background = `#0b0b48`;

          document.querySelectorAll(`.wallet-out`).forEach(DOM => {

            DOM.style.display = `flex`;
          });

          document.querySelectorAll(`.wallet-in`).forEach(DOM => {

            DOM.style.display = `none`;
          });
        }
      }]);
    });

    this.listen([document.querySelector(`#execute`), `click`, S => {

      if (this.getSource(S).getAttribute(`role`) === `buy`) {

        if (!Clients.mug) {

          View.pop();

          View.DOM([`#modal`, [Models.inputMug([2])]]);

          this.emailSalt();

          document.querySelector(`#modal`).style.display = `flex`;
        }

        if (Clients.mug) {
        
          let Values = [(!Tools.slim(document.querySelector(`#total`).value))? false: Tools.slim(document.querySelector(`#total`).value)];

          if (Values[0] === false || typeof parseFloat(Values[0]) !== `number`) return;

          let XHR = []; 

          XHR[0] = Tools.pull([
            `/json/web/`, { 
              mug: Clients.mug, flag: `buy`, 
              float: parseFloat(Values[0]), 
              plot: Arg.plot[0], 
              pull: `trade`, type: Clients.typeSwap, value: (Clients.typeSwap === `limit`)? parseFloat(document.querySelector(`#limit`).value): 0}]);

          Values = [];

          XHR[0].onload = () => {

            XHR[1] = Tools.typen(XHR[0].response);

            if (XHR[1].ts) {

              View.pop();

              View.DOM([`#top`, [Models.init.fill([XHR[1].ts, `Buy`, XHR[1].float, Arg.plot[0][0], XHR[1].value])]]);

              document.querySelector(`#top`).style.display = `flex`;

              this.listen([document.querySelector(`#alertClose`), `click`, S => {document.querySelector(`#top`).style.display = `none`}]);
            }
          }
        }
      }

      if (this.getSource(S).getAttribute(`role`) === `sell`) {

        if (!Clients.mug) {

          View.pop();

          View.DOM([`#modal`, [Models.inputMug([2])]]);

          this.emailSalt();

          document.querySelector(`#modal`).style.display = `flex`;
        }

        if (Clients.mug) {

          let Values = [(!Tools.slim(document.querySelector(`#quantity`).value))? false: Tools.slim(document.querySelector(`#quantity`).value)];

          if (Values[0] === false || typeof parseFloat(Values[0]) !== `number`) return;

          let Puts = Tools.pull([
            `/json/web/`, { 
              mug: Clients.mug, flag: `sell`,
              float: parseFloat(Values[0]), 
              plot: Arg.plot[0], 
              pull: `trade`}]);

          Values = [];
        }
      }
    }]);

    let Fave = d3.select(`#collapsible`)

    d3.select(`#collapsible`).call(d3.zoom().scaleExtent([1, 1]).translateExtent([[0,0], [document.querySelector(`#collapsible`).clientWidth*1.5, document.querySelector(`#collapsible`).clientWidth*1.5]]) .on(`zoom`, () => {
        
      Fave.style(`transform`, `translate3d(${d3.event.transform.x}px, 0, 0)`)
    }));

    this.listen([document.querySelector(`#typeSelect`), `click`, S => {

      //document.querySelector(`#typelist`).style.display = (document.querySelector(`#typelist`).style.display === `flex`)? `none`: `flex`;
    }]);

    document.querySelectorAll(`#typelist a`).forEach(Child => {

      this.listen([Child, `click`, S => {

        document.querySelectorAll(`#typelist a`).forEach(A => {A.style.background = `none`});

        Child.style.background = `#242471`;

        document.querySelector(`#typeSelect span`).innerText = Child.querySelector(`span`).innerText;

        document.querySelector(`#total`).value = 0;

        document.querySelector(`#quantity`).value = 0;

        document.querySelector(`#typelist`).style.display = `none`;

        Clients.typeSwap = Child.querySelector(`span`).innerText.toLowerCase();

        if (Clients.typeSwap === `limit`) { 

          document.querySelector(`#letSwaplimit`).style.display = `flex`;

          document.querySelector(`#letSwapSpot`).style.display = `none`;
        }

        if (Clients.typeSwap === `market`) { 

          document.querySelector(`#letSwaplimit`).style.display = `none`;

          document.querySelector(`#letSwapSpot`).style.display = `flex`;

          document.querySelector(`#limitSetline`).style.display = `none`;

          document.querySelector(`#limitSet`).style.display = `none`;
        }
      }]);
    });

    document.querySelectorAll(`.tab`).forEach(DOM => {

      this.listen([DOM, `click`, S => {

        document.querySelectorAll(`.tab`).forEach(Obj => {

          Obj.style.background = `#2424718a`;

          Obj.style.borderBottom = `${1}px solid #353535`;

          Obj.style.opacity = .5;
        });

        DOM.style.background = `#000`;

        DOM.style.opacity = 1; 

        DOM.style.borderBottom = `none`;

        if (DOM.innerHTML === `open`) {

          View.pop();

          View.DOM([`#oldCol`, Models.init.oldOpen()[0]]);

          View.pop();

          View.DOM([`#oldObj`, Models.init.oldOpen()[1]]); 
        }

        if (DOM.innerHTML === `positions`) {

          View.pop();

          View.DOM([`#oldCol`, Models.init.oldPosition()[0]]); 

          View.pop();

          View.DOM([`#oldObj`, []]);
        }

        if (DOM.innerHTML === `trades`) {

          View.pop();

          View.DOM([`#oldCol`, Models.init.oldSwap()[0]]);

          View.pop();

          View.DOM([`#oldObj`, Models.init.oldSwap()[1]]); 
        }
      }]);
    });

    this.listen([document.querySelector(`#setVia`), `click`, S => {

      document.querySelector(`#viamultiple`).style.display = (document.querySelector(`#viamultiple`).style.display === `flex`)? `none`: `flex`;
    }]);

    document.querySelectorAll(`#viamultiple a`).forEach(Child => {

      this.listen([Child, `click`, S => {

        document.querySelectorAll(`#viamultiple a`).forEach(A => {A.style.background = `none`});

        Child.style.background = `#242471`;

        document.querySelector(`#setVia span`).innerText = Child.querySelector(`span`).innerText;

        document.querySelector(`#viamultiple`).style.display = `none`;

        Clients.typeWallet = Child.querySelector(`span`).innerText.toLowerCase();

        if (Clients.typeWallet === `fiat`) {

          document.querySelectorAll(`#holds .hold-fiat`).forEach(A => {A.style.display = `none`});

          View.pop();

          View.DOM([`#plus`, [Models.init.fiatSlot()]]);

          document.querySelector(`#plus`).style.display = `flex`;

          document.querySelectorAll(`.fiat-float`).forEach(DOM => {

            this.listen([DOM, `keyup`, S => {

              let Slot = this.getSource(S);

              if (!parseInt(Slot.value)) Slot.value = 0;

              if (Slot.id === `callSlot` && Slot.value.length > 11) { Slot.value = Slot.value.substr(0, 12) }

              Slot.value = parseInt(Slot.value);
            }]);
          });

          this.listen([document.querySelector(`#mpesa`), `click`, S => {
        
            if (!Clients.mug) {

              View.pop();

              View.DOM([`#modal`, [Models.inputMug([2])]]);

              this.emailSalt();

              document.querySelector(`#modal`).style.display = `flex`;
            }

            if (Clients.mug) {

              let Values = [
                (!Tools.slim(document.querySelector(`#callSlot`).value))? false: Tools.slim(document.querySelector(`#callSlot`).value),
                (!Tools.slim(document.querySelector(`#floatSlot`).value))? false: Tools.slim(document.querySelector(`#floatSlot`).value)];

              if (Values[0] === false || typeof parseFloat(Values[0]) !== `number` || Values[0].toString().length !== 12) return;

              if (Values[1] === false || typeof parseFloat(Values[1]) !== `number`) return;

              let XHR = [];

              XHR[0] = Tools.pull([
                `/json/web/`, { 
                  call: parseFloat(Values[0]),
                  flag: `incoming`,
                  float: parseFloat(Values[1]),
                  mug: Clients.mug, 
                  pull: `incoming`}]);

              Values = [];

              XHR[0].onload = () => {

                XHR[1] = Tools.typen(XHR[0].response);
              }
            }
          }]);
        }

        if (Clients.typeWallet === `crypto`) {

          document.querySelector(`#plus`).style.display = `none`;

          let Bloc = [0, 1, 2, 6]

          Bloc.forEach(a => {document.querySelectorAll(`#holds .hold-fiat`)[a].style.display = `flex`});
        }
      }]);
    });

    HL.sort((A, B) => {return B - A});

    View.pop();

    View.DOM([`#gSwapY`, Models.init.toSwap({HL: HL, Y: Y})]);

    //setInterval(() => { if (Tools.typen(Clients.old)[0].length > 0 && Clients.mug) { io().emit(`toSwap`, [Arg.plot[0], Tools.typen(Clients.old)[0], Clients.mug]) } }, 5000);

    //io().on(`toSwap`, Obj => { if (Clients.mug && Clients.mug === Obj[0]) { Clients.old = Tools.coats(Obj[1]) } });

    this.plotState(Arg);
  }

  emailSalt () {

    if (document.querySelector(`#modalMugin`)) {

      this.listen([document.querySelector(`#modalMugin`), `click`, S => {

        View.pop();

        View.DOM([`#modal`, [Models.inputMug([2])]]);

        this.emailSalt()
      }]);
    }

    if (document.querySelector(`#modalMugup`)) {

      this.listen([document.querySelector(`#modalMugup`), `click`, S => {

        View.pop();

        View.DOM([`#modal`, [Models.inputMug([0])]]);

        this.emailSalt()
      }]);
    }

    if (document.querySelector(`#emailAvail`)) {

      this.listen([document.querySelector(`#emailAvail`), `click`, S => {

        if (!Tools.slim(document.querySelector(`input#email`).value) === true) return;

        let XHR = Tools.pull([
          `/json/web`, {email: document.querySelector(`input#email`).value, flag: `emailAvail`, pull: `mug`}]);

        document.querySelector(`input#email`).value = ``;

        XHR.onload = () => {

          let Obj = Tools.typen(XHR.response);

          if (Obj.email) {

            View.pop();

            View.DOM([`#modal`, [Models.inputMug([1])]]);

            this.listen([document.querySelector(`#saltAvail`), `click`, S => {

              if (!Tools.slim(document.querySelector(`input#lock`).value) === true) return;

              let XHR = Tools.pull([
                `/json/web`, {email: Obj.email, salt: document.querySelector(`input#lock`).value, flag: `saltAvail`, pull: `mug`}]);

              XHR.onload = () => {

                let Obj = Tools.typen(XHR.response);

                if (Obj && Obj.md) {

                  Clients.mug = Obj.md;

                  window.location = window.location;
                }
              }
            }]);
          }
        }
      }]);
    }

    if (document.querySelector(`#emailSalt`)) {

      this.listen([document.querySelector(`#emailSalt`), `click`, S => {

        if (!Tools.slim(document.querySelector(`input#email`).value) === true || !Tools.slim(document.querySelector(`input#salt`).value) === true) return;

        let XHR = Tools.pull([
          `/json/web`, {
            email: document.querySelector(`input#email`).value, flag: `emailSalt`, pull: `mug`, salt: document.querySelector(`input#salt`).value}]);

        XHR.onload = () => {

          let Obj = Tools.typen(XHR.response);

          if (Obj && Obj.md) {

            Clients.mug = Obj.md;

            window.location = window.location;
          }
        }
      }]);
    }
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

    let G = document.querySelectorAll(`svg .g`), SVG = [[], [], [], [], [], [], [], [], [], [], [], [], [], []], OM = [[]];

    for (let A = 0; A < 25; A++) {

      let AY = (Tools.yScale([RH/CAV, HL[0]])[0]*16 + Tools.yScale([RH/CAV, HL[0]])[1]) - Tools.yScale([RH/CAV, HL[0]])[0]*A;

      SVG[1].push([`line`, {style: {visibility: (.15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) > .70*Y)? `collapse`: `visible`}, x1: 0, x2: 4000, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);    
    
      SVG[4].push([`text`, {x: 20, y: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${AY}`]);
        
      SVG[6].push([`line`, {x1: 0, x2: 8, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);    
    }

    Vols = Vols.sort((A, B) => {return B - A});

    let tsz = Arg.XY.sort((A, B) => {return B[0] - A[0]})[0][0];

    tsz = new Date(`${new Date(tsz).toLocaleDateString()} ${new Date(tsz).getHours()}:00`).valueOf() + Split.abs*Split.C*4;

    if (Split.abs === 60000*60) tsz = new Date(new Date(tsz).toLocaleDateString()).valueOf() + Split.abs*Split.C;

    let Xlet = [];

    for (let i = 0; i < X/(Split.C*4.75) + 2; i++) {Xlet.push(tsz - i*Split.abs*Split.C);}

    let Old = [];

    Tools.typen(Clients.old)[1].forEach(Obj => {

      if (Clients.plotXSplit === `1D`) {

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} 00:00`).valueOf();

        Old.push(Obj);
      }

      if (Clients.plotXSplit === `1H`) {

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf();

        Old.push(Obj);
      }

      if (Clients.plotXSplit === `30M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/30)*30*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `15M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/15)*15*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `5M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/5)*5*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `3M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/3)*3*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      }

      if (Clients.plotXSplit === `1M`) {

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:${new Date(Obj[3]).getMinutes()}`).valueOf();

        Old.push(Obj);
      }       
    });

    Arg.XY.sort((A, B) => {return A[0] - B[0]}).forEach((K, i) => {

      if (K[2].length > 0) {

        SVG[2].push([`line`, {id: `g${K[0]}`, x1: i*7.125 + .05, y1: .15*Y + ((HL[0] - K[2][0])*.35*Y)/(HL[0] - HL[HL.length - 1]), x2: i*7.125 + .05, y2: .15*Y + ((HL[0] - K[2][1])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: .95}]);
        
        let OC = Tools.typen(Tools.coats(K[1]));

        OC.sort((A, B) => {return B - A});
        
        SVG[3].push([`rect`, {id: `g${K[0]}`, x: (i*7.125) - 2, y: .15*Y + ((HL[0] - OC[0])*.35*Y)/(HL[0] - HL[HL.length - 1]), width: 4.25, height: ((OC[0] - OC[1])*.35*Y)/(HL[0] - HL[HL.length - 1]), fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
        
        SVG[10].push([`rect`, {x: (i*7.125) - 2, y: `${102 - (K[3]*100)/Vols[0]}%`, width: 4.25, height: `${(K[3]*100)/Vols[0] - 3}%`, fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
        
        SVG[13].push([`rect`, {id: Tools.coats(K), class: `info`, x: (i*7.125) - 2, y: 0, width: 4.25, height: `${100}%`, fill: `transparent`, stroke: `transparent`}]);            
      }

      Old.forEach(Obj => {

        if (Obj.indexOf(K[0]) > -1) {

          OM[0].push([`g`, {style: {cursor: `pointer`}}, 
            [[`circle`, {r: 8, cx: i*7.12, cy: .15*Y + ((HL[0] - Obj[2])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: `#fff`, [`stroke-width`]: 1}], 
            [`circle`, {r: 4, cx: i*7.12, cy: .15*Y + ((HL[0] - Obj[2])*.35*Y)/(HL[0] - HL[HL.length - 1]), style: {cursor: `pointer`}, fill: (Obj[0] === `sell`)? `#e3415d`: `#6bc679`, stroke: `none`, [`stroke-width`]: 1}]]]);
        }
      });

      if (Xlet.indexOf(K[0]) > -1 && Clients.plotXSplit !== `30M` && Clients.plotXSplit !== `1D`) {

        SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

        SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
      }

      let X_D = new Date(`${new Date(K[0]).getFullYear()}-${new Date(K[0]).getMonth() + 1}-${new Date(K[0]).getDate()} 00:00`).valueOf();

      if (Clients.plotXSplit === `30M` && K[0] === X_D) {

        SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `intext`, [`font-size`]: `${10.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

        SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
      }

      if (Clients.plotXSplit === `1D` && new Date(K[0]).getDate() === 1) {

        SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

        SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
      }
    });

    SVG[5] = [[`text`, {id: `ZY`, x: 20, y: 0, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}]];

    SVG[8] = [[`text`, {id: `lapse`, x: Arg[`XY`].length*7.12 - 12, y: 17, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, ``]]

    SVG[9] = [[`line`, { x1: 0, x2: 4000, y1: `${102 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, y2: `${102 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]];

    SVG[11] = [[`text`, {x: 20, y: `${106 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${Tools.yScale([.75*Vols[0], Vols[0]])[0]}`]];
        
    SVG[12] = [[`line`, {x1: 0, x2: 8, y1: `${102.5 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, y2: `${102.5 - (Tools.yScale([.75*Vols[0], Vols[0]])[0]*100)/Vols[0]}%`, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]];

    G.forEach((Vect, i) => {

      View.pop();

      Vect.innerHTML = View.ModelDOM(SVG[i]);
    });

    document.querySelector(`#g`).innerHTML = View.ModelDOM(SVG[13]);

    document.querySelector(`#gSwap`).innerHTML = View.ModelDOM(OM[0]);

    document.querySelectorAll(`.ival-alt`).forEach(A => {A.style.display = `flex`;});

    View.pop();

    View.DOM([`#gSwapY`, Models.init.toSwap({HL: HL, Y: Y})]);

    this.plotState(Arg);
  }

  plotSVG (Arg) {

    let CAV = 0, HL = [], RH = 0, Vols = [];

    Arg[0][1].forEach(K => {

      if (K[2].length > 0) {

        HL.push(K[2][0]); 

        HL.push(K[2][1]);

        Vols.push(K[3]);
      }
    });

    HL.sort((A, B) => {return B - A});

    RH = HL[0] - HL[HL.length - 1]; CAV = 2;
    
    let Y = parseFloat(document.body.clientHeight - 70);

    let G = document.querySelectorAll(`svg .g`), OM = [[]], SVG = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

    for (let A = 0; A < 25; A++) {

      let AY = (Tools.yScale([RH/CAV, HL[0]])[0]*16 + Tools.yScale([RH/CAV, HL[0]])[1]) - Tools.yScale([RH/CAV, HL[0]])[0]*A;

      SVG[1].push([`line`, {style: {visibility: (.15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) > .70*Y)? `collapse`: `visible`}, x1: 0, x2: 4000, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);    
    
      SVG[4].push([`text`, {x: 20, y: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + 4, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, `${AY}`]);
        
      SVG[6].push([`line`, {x1: 0, x2: 8, y1: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, y2: .15*Y + ((HL[0] - (AY))*.35*Y)/(HL[0] - HL[HL.length - 1]) + .5, stroke: `#fff`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);    
    }

    Vols = Vols.sort((A, B) => {return B - A});

    let Split = Constants.ival[Clients.plotXSplit];

    let tSZ = Arg[0][1].sort((A, B) => {return B[0] - A[0]})[0][0];

    tSZ = new Date(`${new Date(tSZ).toLocaleDateString()} ${new Date(tSZ).getHours()}:00`).valueOf() + Split.abs*Split.C*4;

    if (Split.abs === 60000*60) tSZ = new Date(new Date(tSZ).toLocaleDateString()).valueOf() - Split.abs*Split.C;

    let Xlet = [];

    for (let i = 0; i < document.body.clientWidth/(Split.C*4.75) + 2; i++) {Xlet.push(tSZ - i*Split.abs*Split.C);}

    let Old = [];

    Tools.typen(Clients.old)[1].forEach(Obj => {

      if (Clients.plotXSplit === `1D`) {

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} 00:00`).valueOf();

        Old.push(Obj);
      }

      if (Clients.plotXSplit === `1H`) {

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf();

        Old.push(Obj);
      }

      if (Clients.plotXSplit === `30M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/30)*30*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `15M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/15)*15*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `5M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/5)*5*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      } 

      if (Clients.plotXSplit === `3M`) {

        let Z = Math.floor(new Date(Obj[3]).getMinutes()/3)*3*60000; 

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:00`).valueOf() + Z;

        Old.push(Obj);
      }

      if (Clients.plotXSplit === `1M`) {

        Obj[3] = new Date(`${new Date(Obj[3]).getFullYear()}-${new Date(Obj[3]).getMonth() + 1}-${new Date(Obj[3]).getDate()} ${new Date(Obj[3]).getHours()}:${new Date(Obj[3]).getMinutes()}`).valueOf();

        Old.push(Obj);
      }       
    });

    Arg[0][1].sort((A, B) => {return A[0] - B[0]}).forEach((K, i) => {

      if (K[2].length > 0) {

        SVG[2].push([`line`, {id: `g${K[0]}`, x1: i*7.125 + .05, y1: .15*Y + ((HL[0] - K[2][0])*.35*Y)/(HL[0] - HL[HL.length - 1]), x2: i*7.125 + .05, y2: .15*Y + ((HL[0] - K[2][1])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: .95}]);
        
        let OC = Tools.typen(Tools.coats(K[1]));

        OC.sort((A, B) => {return B - A});
        
        SVG[3].push([`rect`, {id: `g${K[0]}`, info: Tools.coats(K[1]), x: (i*7.125) - 2, y: .15*Y + ((HL[0] - OC[0])*.35*Y)/(HL[0] - HL[HL.length - 1]), width: 4.25, height: ((OC[0] - OC[1])*.35*Y)/(HL[0] - HL[HL.length - 1]), fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
        
        SVG[10].push([`rect`, {x: (i*7.125) - 2, y: `${102 - (K[3]*100)/Vols[0]}%`, width: 4.25, height: `${(K[3]*100)/Vols[0] - 3}%`, fill: (K[1][0] > K[1][1])? `#e3415d`: `#000`, stroke: (K[1][0] > K[1][1])? `#e3415d`: `#6bc679`, [`stroke-width`]: 1}]);
        
        SVG[13].push([`rect`, {id: Tools.coats(K), class: `info`, x: (i*7.125) - 2, y: 0, width: 4.25, height: `${100}%`, fill: `transparent`, stroke: `transparent`}]);            
      }

      Old.forEach(Obj => {

        if (Obj.indexOf(K[0]) > -1) {

          OM[0].push([`g`, {style: {cursor: `pointer`}}, 
            [[`circle`, {r: 8, cx: i*7.12, cy: .15*Y + ((HL[0] - Obj[2])*.35*Y)/(HL[0] - HL[HL.length - 1]), stroke: `#fff`, [`stroke-width`]: 1}], 
            [`circle`, {r: 4, cx: i*7.12, cy: .15*Y + ((HL[0] - Obj[2])*.35*Y)/(HL[0] - HL[HL.length - 1]), style: {cursor: `pointer`}, fill: (Obj[0] === `sell`)? `#e3415d`: `#6bc679`, stroke: `none`, [`stroke-width`]: 1}]]]);
        }
      });

      if (Xlet.indexOf(K[0]) > -1 && Clients.plotXSplit !== `1D`) {

        SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

        SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
      }

      if (Clients.plotXSplit === `1D` && new Date(K[0]).getDate() === 1) {

        SVG[7].push([`text`, {x: (i*7.12) + Split.tox, y: 17, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}, Tools.formatplanex([K[0], Split.abs, Split.sub])]);

        SVG[0].push([`line`, {x1: i*7.12, y1: 0, x2: i*7.12, y2: 1000, stroke: `#1e1e1e`, [`stroke-dasharray`]: 0, [`stroke-width`]: 1}]);
      }
    });

    if (Clients.plotXSplit === `1M`) {

      let tSZ = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours() }:${new Date().getMinutes()}`).valueOf();        

      SVG[3].push([`rect`, {id: `g${tSZ}`, info: Tools.coats([]), x: (Arg[0][1].length - 3)*7.125 - 2, width: 4.25}]);
    }

    SVG[5] = [[`text`, {id: `ZY`, x: 20, y: 0, fill: `#fff`, style: {[`font-family`]: `insvg`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${.25}px`}}]];

    G.forEach((Vect, i) => {

      View.pop();

      Vect.innerHTML = View.ModelDOM(SVG[i]);
    });

    document.querySelector(`#g`).innerHTML = View.ModelDOM(SVG[13]);

    document.querySelector(`#gSwap`).innerHTML = View.ModelDOM(OM[0]);

    document.querySelectorAll(`.info`).forEach(SVG => {

      this.listen([SVG, `mouseover`, S => {

        let Stat = Tools.typen(this.getSource(S).id);

        document.querySelector(`#info`).style.display = `flex`;

        document.querySelector(`#info`).innerHTML = `${new Date(Stat[0]).toString().substr(4, 17)} Open: ${Stat[1][0]} High: ${Stat[2][0]} Low: ${Stat[2][1]} Close: ${Stat[1][1]} ${((Stat[1][1] - Stat[1][0])/Stat[1][0]*100).toFixed(2)}%`;
      
        document.querySelector(`#volbase`).style.color = (Stat[1][0] > Stat[1][1])? `#E3415D`: `#6BC679`;

        document.querySelector(`#volbase`).innerHTML = Stat[3];
      }])});

    View.pop();

    View.DOM([`#gSwapY`, Models.init.toSwap({HL: HL, Y: Y})]);
  }

  plotState (Arg) {

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

    let M_Z = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours() }:${new Date().getMinutes()}`).valueOf();

    let H_Z = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours() }:00`).valueOf();

    setInterval(() => {

      if (Clients.plotXSplit === `1M`) {

        if (new Date().valueOf() > M_Z + 60000) {

          let tSZ = M_Z;

          if (Clients.tSZ) {

            tSZ = parseInt(Clients.tSZ);

            tSZ = tSZ + 60000;

            Clients.tSZ = tSZ;
          }

          M_Z = M_Z + 60000;

          let tS = new Date().valueOf();
          
          io().emit(`az`, [Arg.plot[0], Clients.plotXSplit, parseInt((((document.body.clientWidth - 360)*.8)/6.95).toFixed(0)), tSZ + 60000*2, tS]);

          io().on(`az`, AZ => {

            if (tS === AZ[0]) {

              this.plotSVG([AZ]);
            }
          });
        }
      }

      if (Clients.plotXSplit === `1H`) {

        if (document.querySelector(`#lapse`)) document.querySelector(`#lapse`).innerHTML = `${(59 - new Date().getMinutes() > 9)? ``: `0`}${59 - new Date().getMinutes()}:${(59 - new Date().getSeconds() > 9)? ``: `0`}${59 - new Date().getSeconds()}`;

        //if (new Date().valueOf() < H_Z + (60000*60)) {}

        if (new Date().valueOf() > H_Z + (60000*60)) {

          H_Z = H_Z + (60000*60);

          let tS = new Date().valueOf();

          io().emit(`az`, [Arg.plot[0], Clients.plotXSplit, parseInt((((document.body.clientWidth - 360)*.8)/6.95).toFixed(0)), H_Z, tS]);

          io().on(`az`, AZ => {

            if (tS === AZ[0]) {

              this.plotSVG([AZ]);
            }
          });
        }
      }
    }, 1000);

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
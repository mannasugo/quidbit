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

      io().on(`plotY`, Spot => {

        let Plot = {};

        Spot.forEach(AB => {

          Plot[AB[0]] = [AB[1]]; 

          Clients.plot = Tools.coats(Plot)
        });

        /*if (Clients.plot)*/ window.location = `/trade/EUR_USD`;
      });
    }

    else if (this.State[3] === `trade`) {

      if (State[4] && !State[5] && !Tools.slim[State[5]]) {

        Clients.tSZ = new Date().valueOf();

        if (!Clients.plotXSplit) {
          Clients.plotXSplit = `1H`}

        let Puts = Tools.pull([
          `/json/web/`, {
            tsDay: DAY,
            mug: (Clients.mug) ? Clients.mug: false,
            pull: `plot`, 
            plot: State[4].split(`_`), splitX: Clients.plotXSplit, x: (document.body.clientWidth > 719)? parseInt((((document.body.clientWidth - 360)*.8)/7.5).toFixed(0)): parseInt((document.body.clientWidth)*.8)/7.5, 
            ts: new Date().valueOf()}]);  

        Puts.onload = () => {

          let Web = Tools.typen(Puts.response);

          if (Web.plot) {

            document.title = `QB:${State[4].replace(`_`, `-`) || (0).toFixed(Web.plot[1])}`;

            Clients.incoming = Tools.coats(Web.incoming);

            Clients.old = Tools.coats(Web.old);

            View.DOM([`div`, [Models.plot(Web)]]);

            document.querySelector(`body`).style.overflowY = `hidden`;

            document.querySelector(`body`).style.overflowX = `hidden`;

            document.querySelector(`body`).style.background = `#000`;

            Event.plot(Web);
          }
        } 
      }
    }
  }
}

Route = new Route();
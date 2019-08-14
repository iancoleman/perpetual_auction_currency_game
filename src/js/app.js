app = new (function() {

    let self = this;

    let nextTick = null;

    function init() {
        // generate initial network
        network.makeRandomSections();

        // add handler for next tick by keypress
        // TODO

        // start the simulation
        self.doTick();
    }

    this.doTick = function() {
        // cancel next tick if it exists
        if (nextTick != null) {
            clearTimeout(nextTick);
        }
        // do actions for this tick
        network.doNeighbourBid();
        // schedule the next tick
        nextTick = setTimeout(self.doTick, speed.msPerTick());
    }

    init();

})();

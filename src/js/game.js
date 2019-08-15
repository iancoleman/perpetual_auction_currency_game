game = new (function() {

    let self = this;

    function init() {
        // generate initial network
        network.makeRandomSections();

        // add handler for next tick by keypress
        // TODO

        // start the simulation
        eventsource.start();
    }

    init();

})();

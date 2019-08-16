game = new (function() {

    let self = this;

    function init() {
        // generate initial neighbourhood
        neighbourhood.makeRandomSections();

        // add handler for next tick by keypress
        // TODO

        // start the simulation
        eventsource.start();
    }

    init();

})();

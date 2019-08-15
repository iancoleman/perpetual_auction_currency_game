eventsource = new (function() {

    let self = this;

    let nextNbEvent = null;

    this.start = function() {
        self.nextEvent();
    }

    this.nextEvent = function() {
        // currently only NB events
        // cancel next event if it exists
        if (nextNbEvent != null) {
            clearTimeout(nextNbEvent);
        }
        // do actions for this event
        network.doNeighbourBid();
        // run any subscriptions to this event
        doAfterNbSubscriptions();
        // schedule the next event
        nextNbEvent = setTimeout(self.nextEvent, speed.msPerTick());
    }

    let eventSubscriptions = {};
    let afterNbSubscriptionIds = [];

    // Allow subscribing to the nb event.
    // These methods will run after the nb event has completed.
    // Returns an id for cancelling the subscription.
    this.afterNbEvent = function(fn) {
        let id = randomId();
        afterNbSubscriptionIds.push(id);
        eventSubscriptions[id] = fn;
        return id;
    }

    this.cancelSubscription = function(id) {
        if (!(id in eventSubscriptions)) {
            console.log("No subscription for " + id);
            return;
        }
        delete eventSubscriptions[id];
    }

    function randomId() {
        return btoa(prng.nextFloat().toString()).substring(10,20);
    }

    function doAfterNbSubscriptions() {
        for (let i=0; i<afterNbSubscriptionIds.length; i++) {
            let id = afterNbSubscriptionIds[i];
            // check if this subscription has been cancelled
            if (!(id in eventSubscriptions)) {
                // TODO remove from afterNbSubscriptionIds
                continue
            }
            // run the subscribed function
            let fn = eventSubscriptions[id];
            fn();
        }
    }

})();

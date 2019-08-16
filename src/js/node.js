Node = function(name) {

    let self = this;

    let changeBidListeners = [];

    let template = document.getElementById("node-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    let nameEl = this.el.querySelectorAll(".name")[0];
    let bidEl = this.el.querySelectorAll(".bid")[0];

    this.name = name;

    this.bid = null;

    this.section = null;

    this.totalRewards = 0;

    // This function can be set by the user.
    // It simply calculates and returns a bid value.
    // It doesn't apply that bid to this node.
    // This is 'how' to bid, not 'when' to bid.
    // For 'when' to bid, look at the updateBid method.
    this.calcBid = calcBidFns.firstRandomThenConstant;

    this.setCalcBidFn = function(fn) {
        self.calcBid = fn;
    }

    this.updateBid = function() {
        self.bid = self.calcBid(self);
        render();
        handleChangeBid();
    }

    this.onBidChange = function(fn) {
        changeBidListeners.push(fn);
    }

    function handleChangeBid() {
        for (let i=0; i<changeBidListeners.length; i++) {
            changeBidListeners[i]();
        }
    }

    function render() {
        nameEl.textContent = self.name;
        bidEl.textContent = self.bid;
    }

    self.updateBid();
    render();

    // update the bid after every new neighbour bid arrives
    eventsource.afterNbEvent(self.updateBid);

}

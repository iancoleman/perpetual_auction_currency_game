Node = function() {

    let self = this;

    let template = document.getElementById("node-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    this.bid = null;

    this.totalRewards = 0;

    // This function can be set by the user.
    // It simply calculates and returns a bid value.
    // It doesn't apply that bid to this node.
    // Indentation is unusual for this so that when calcBid.toString()
    // is called the indentation will be for a non-nested function.
    this.calcBid = function() {
    // if no bid, generate a random bid
    if (!self.bid) {
        return prng.nextRange(config.bid.min, config.bid.max);
    }
    // return the current bid
    return self.bid
}

    this.setCalcBidFn = function(fnStr) {
        eval("self.calcBid = " + fnStr);
    }

    this.updateBid = function() {
        self.bid = self.calcBid();
        render();
    }

    function render() {
        self.el.textContent = self.bid;
    }

    self.updateBid();
    render();

}

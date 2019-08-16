Bidder = function(name) {

    let self = this;

    let changeBidListeners = [];

    let template = document.getElementById("bidder-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    this.name = name;
    this.section = null;
    this.bid = prng.nextRange(config.bid.min, config.bid.max);

    this.totalRewards = 0;

    let input = this.el.querySelectorAll("input")[0];
    input.setAttribute("min", config.bid.min);
    input.setAttribute("max", config.bid.max);
    input.value = this.bid;

    input.addEventListener("input", handleChangeBid);

    this.focus = function() {
        input.focus();
    }

    this.onBidChange = function(fn) {
        changeBidListeners.push(fn)
    }

    function handleChangeBid(e) {
        self.bid = parseInt(input.value);
        for (let i=0; i<changeBidListeners.length; i++) {
            changeBidListeners[i]();
        }
    }

}

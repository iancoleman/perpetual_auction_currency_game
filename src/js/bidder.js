Bidder = function() {

    let self = this;

    let inputListeners = [];

    let template = document.getElementById("bidder-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    this.bid = prng.nextRange(config.bid.min, config.bid.max);

    this.totalRewards = 0;

    let input = this.el.querySelectorAll("input")[0];
    input.setAttribute("min", config.bid.min);
    input.setAttribute("max", config.bid.max);
    input.value = this.bid;

    input.addEventListener("input", handleInput);

    this.focus = function() {
        input.focus();
    }

    this.onInput = function(fn) {
        inputListeners.push(fn)
    }

    function handleInput(e) {
        self.bid = parseInt(input.value);
        for (let i=0; i<inputListeners.length; i++) {
            inputListeners[i]();
        }
    }

}

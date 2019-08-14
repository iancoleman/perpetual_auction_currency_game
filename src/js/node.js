Node = function() {

    let self = this;

    let template = document.getElementById("node-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    this.value = prng.nextRange(config.bid.min, config.bid.max);

    this.totalRewards = 0;

    this.el.textContent = this.value;

}

Bidder = function() {

    let self = this;

    let inputListeners = [];
    let enterListeners = [];

    let template = document.getElementById("bidder-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    this.value = prng.nextRange(1000,2000);

    let input = this.el.querySelectorAll("input")[0];
    input.value = this.value;

    input.addEventListener("input", handleInput);
    input.addEventListener("keyup", handleKeyup);

    this.focus = function() {
        input.focus();
    }

    this.onInput = function(fn) {
        inputListeners.push(fn)
    }

    this.onEnter = function(fn) {
        enterListeners.push(fn)
    }

    function handleInput(e) {
        self.value = parseInt(input.value);
        for (let i=0; i<inputListeners.length; i++) {
            inputListeners[i]();
        }
    }

    function handleKeyup(e) {
        // handle Enter
        if (e.keyCode == 13) {
            for (let i=0; i<enterListeners.length; i++) {
                enterListeners[i]();
            }
        }
    }
}

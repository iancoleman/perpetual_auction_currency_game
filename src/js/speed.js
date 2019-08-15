speed = new (function() {

    let self = this;

    let speeds = [
        100,
        200,
        500,
        1000,
        2000,
        3000,
        4000,
        5000,
        6000,
        7000,
        8000,
        9000,
        10000,
        3600000,
    ]

    let speedSlider = document.getElementById("speed");
    let speedText = document.getElementById("speed-text");

    speedSlider.addEventListener("change", sliderChanged);
    speedSlider.setAttribute("max", speeds.length-1);

    this.msPerTick = function() {
        let index = parseInt(speedSlider.value);
        return speeds[index];
    }

    function sliderChanged() {
        updateText();
        eventsource.nextEvent();
    }

    function updateText() {
        let period = self.msPerTick() / 1000;
        let units = "seconds";
        if (period >= 60) {
            period = period / 60;
            units = "minutes";
        }
        if (period >= 60) {
            period = period / 60;
            units = "hours";
        }
        speedText.textContent = period + " " + units;
    }

})()

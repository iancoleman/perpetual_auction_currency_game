(function() {

    let mmEl = document.querySelectorAll(".median-medians")[0];
    let aaEl = document.querySelectorAll(".average-averages")[0];
    let amEl = document.querySelectorAll(".average-medians")[0];
    let maEl = document.querySelectorAll(".median-averages")[0];

    function renderNeighbourhoodStats() {
        let medians = neighbourhood.sections.map(function(s) { return s.median() });
        let averages = neighbourhood.sections.map(function(s) { return s.average() });
        let mm = Stats.median(medians);
        let aa = Stats.average(averages);
        let am = Stats.average(medians);
        let ma = Stats.median(averages);
        mmEl.textContent = mm.toFixed(1);
        aaEl.textContent = aa.toFixed(1);
        amEl.textContent = am.toFixed(1);
        maEl.textContent = ma.toFixed(1);
    }

    eventsource.afterNbEvent(renderNeighbourhoodStats);

})();

/*
 * Copy and paste this file into dev tools.
 * Not a framework for sure but it's better than no tests
 */

(function() {

    // Stats.median
    let x = [1,3,2];
    let median = Stats.median(x);
    if (median != 2) {
        throw "failed calculating Stats.median";
    }
    if (x[1] != 3) {
        throw "failed Stats.median changes order of array";
    }

    // Stats.average
    let average = Stats.average(x);
    if (average != 2) {
        throw "failed calculating Stats.average";
    }
    if (x[1] != 3) {
        throw "failed Stats.average changes order of array";
    }

    console.log("All tests pass");

})();

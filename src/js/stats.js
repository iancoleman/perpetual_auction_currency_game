Stats = {};

Stats.median = function(arrOriginal) {
    // copy to temporary array for sorting,
    // don't want to modify the original.
    let arr = arrOriginal.slice(0);
    // sort array
    arr.sort();
    // get indexes of middle value(s)
    let indexes = [];
    let index = (arr.length - 1) / 2;
    if (arr.length % 2 == 0) {
        indexes.push(Math.floor(index));
        indexes.push(Math.ceil(index));
    }
    else {
        indexes.push(index);
    }
    // calculate median from the middle indexes
    let medianSum = 0;
    for (let i=0; i<indexes.length; i++) {
        let mi = indexes[i];
        let medianValue = arr[mi];
        medianSum = medianSum + medianValue;
    }
    let median = medianSum / indexes.length
    return median;
}

Stats.average = function(arr) {
    let avgSum = 0;
    for (let i=0; i<arr.length; i++) {
        avgSum = avgSum + arr[i];
    }
    let avg = avgSum / arr.length
    return avg;
}

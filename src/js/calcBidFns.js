// a range of strategies for calculating bids

calcBidFns = {};

calcBidFns.firstRandomThenConstant = function(node) {
    // if no bid, generate a random bid
    if (!node.bid) {
        return prng.nextRange(config.bid.min, config.bid.max);
    }
    // return the current bid
    return node.bid
}

calcBidFns.convergeToNb = function(node) {
    // if no bid, generate a random bid
    if (!node.bid) {
        return prng.nextRange(config.bid.min, config.bid.max);
    }
    // if no neighbourBid, return the current bid
    if (!node.section || !node.section.neighbourBid) {
        return node.bid
    }
    // if currently not at the NB, maybe move closer toward it
    // if equal to the NB, return the current bid.
    let shouldMove = prng.nextFloat() < 0.5;
    if (node.bid < node.section.neighbourBid && shouldMove) {
        return node.bid + 1;
    }
    else if (node.bid > node.section.neighbourBid && shouldMove) {
        return node.bid - 1;
    }
    else {
        return node.bid;
    }
}

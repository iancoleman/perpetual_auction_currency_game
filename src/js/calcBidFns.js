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

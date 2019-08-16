// a range of strategies for calculating bids

calcBidFns = {};

calcBidFns.firstRandomThenConstant = function() {
    // if no bid, generate a random bid
    if (!self.bid) {
        return prng.nextRange(config.bid.min, config.bid.max);
    }
    // return the current bid
    return self.bid
}

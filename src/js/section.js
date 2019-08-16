Section = function(name) {

    let self = this;

    this.name = name;

    this.nodes = [];

    this.neighbourBid = null;

    let template = document.getElementById("section-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];
    let nameEl = this.el.querySelectorAll(".name")[0];
    let medianEl = this.el.querySelectorAll(".median")[0];
    let averageEl = this.el.querySelectorAll(".average")[0];
    let nodesEl = this.el.querySelectorAll(".nodes")[0];

    this.addNode = function(n) {
        self.nodes.push(n);
        n.section = self;
        render();
        // rerender if bid changes
        n.onBidChange(renderStats);
    }

    this.average = function() {
        let nodeBids = self.nodes.map(function(n) { return n.bid });
        return Stats.average(nodeBids);
    }

    this.median = function() {
        let nodeBids = self.nodes.map(function(n) { return n.bid });
        return Stats.median(nodeBids);
    }

    this.getBid = function() {
        // calculate median
        let median = self.median();
        // calculate average
        let avg = self.average();
        let bid = {
            "average": avg,
            "median": median,
            "use": "median",
        };
        // median 95% of the time, average 5% of the time
        if(prng.nextFloat() > 0.95) {
            bid["use"] = "average";
        }
        return bid;
    }

    this.calcRewards = function(nb) {
        // Uses a weighting system.
        // This will change in the future.
        // Code here is not very efficient but is ok for now.
        let totalDistance = 0;
        // Calculate total distance
        for (let i=0; i<self.nodes.length; i++) {
            let distance = Math.abs(self.nodes[i].bid - nb);
            totalDistance = totalDistance + distance;
        }
        // Calculate total weight
        let totalWeight = 0;
        for (let i=0; i<self.nodes.length; i++) {
            let distance = Math.abs(self.nodes[i].bid - nb);
            let weight = totalDistance - distance;
            totalWeight = totalWeight + weight;
        }
        // Calculate reward from portion of weight
        let rewards = [];
        for (let i=0; i<self.nodes.length; i++) {
            let node = self.nodes[i];
            let distance = Math.abs(node.bid - nb);
            let weight = totalDistance - distance;
            let portion = weight / totalWeight;
            let reward = nb * portion;
            let isMyBid = node instanceof Bidder;
            // TODO consider the accumulation of rewards.
            // There might be N Gets between NBs
            // So it should be N * reward
            // But right now it's just 1 * reward
            node.totalRewards = node.totalRewards + reward;
            rewards.push({
                "name": node.name,
                "bid": node.bid,
                "reward": reward,
                "total": node.totalRewards,
                "me": isMyBid,

            });
        }
        return rewards;
    }

    function render() {
        // clear current node elements
        while (nodesEl.firstChild) {
            nodesEl.removeChild(nodesEl.firstChild);
        }
        // show nodes
        for (let i=0; i<self.nodes.length; i++) {
            let n = self.nodes[i];
            nodesEl.appendChild(n.el);
        }
        // show name
        nameEl.textContent = self.name;
        // show stats
        renderStats();
        // focus on bidder input if present
        for (let i=0; i<self.nodes.length; i++) {
            let n = self.nodes[i];
            if (n instanceof Bidder) {
                n.focus();
            }
        }

    }

    function renderStats() {
        // show median
        medianEl.textContent = self.median();
        // show average
        averageEl.textContent = self.average().toFixed(1);
    }

}

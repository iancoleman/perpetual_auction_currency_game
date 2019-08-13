Section = function() {

    let self = this;

    this.nodes = [];

    let template = document.getElementById("section-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    this.addNode = function(n) {
        self.nodes.push(n);
        render();
        // rerender if bidder changes
        if (n instanceof Bidder) {
            n.onInput(render);
        }
    }

    this.average = function() {
        let avgSum = 0;
        for (let i=0; i<self.nodes.length; i++) {
            avgSum = avgSum + self.nodes[i].value;
        }
        let avg = avgSum / self.nodes.length
        return avg;
    }

    this.median = function() {
        let medianIndexes = getMedianIndexes();
        let medianSum = 0;
        for (let i=0; i<medianIndexes.length; i++) {
            let mi = medianIndexes[i];
            let medianValue = self.nodes[mi].value;
            medianSum = medianSum + medianValue;
        }
        let median = medianSum / medianIndexes.length
        return median;
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
            let distance = Math.abs(self.nodes[i].value - nb);
            totalDistance = totalDistance + distance;
        }
        // Calculate total weight
        let totalWeight = 0;
        for (let i=0; i<self.nodes.length; i++) {
            let distance = Math.abs(self.nodes[i].value - nb);
            let weight = totalDistance - distance;
            totalWeight = totalWeight + weight;
        }
        // Calculate reward from portion of weight
        let rewards = [];
        for (let i=0; i<self.nodes.length; i++) {
            let node = self.nodes[i];
            let distance = Math.abs(node.value - nb);
            let weight = totalDistance - distance;
            let portion = weight / totalWeight;
            let reward = nb * portion;
            let isMyBid = node instanceof Bidder;
            rewards.push({
                "bid": node.value,
                "reward": reward,
                "me": isMyBid,
            });
        }
        return rewards;
    }

    function render() {
        // clear current node elements
        while (self.el.firstChild) {
            self.el.removeChild(self.el.firstChild);
        }
        // put nodes in correct order
        sort();
        // show nodes
        for (let i=0; i<self.nodes.length; i++) {
            let n = self.nodes[i];
            setNotMedian(n);
            self.el.appendChild(n.el);
        }
        // highlight median
        let medianIndexes = getMedianIndexes();
        for (let i=0; i<medianIndexes.length; i++) {
            let mi = medianIndexes[i];
            let n = self.nodes[mi];
            setAsMedian(n);
        }
        // focus on bidder input if present
        for (let i=0; i<self.nodes.length; i++) {
            let n = self.nodes[i];
            if (n instanceof Bidder) {
                n.focus();
            }
        }
    }

    function getMedianIndexes() {
        let indexes = [];
        let nodeIndex = (self.nodes.length - 1) / 2;
        if (self.nodes.length % 2 == 0) {
            indexes.push(Math.floor(nodeIndex));
            indexes.push(Math.ceil(nodeIndex));
        }
        else {
            indexes.push(nodeIndex);
        }
        return indexes;
    }

    function setNotMedian(n) {
        n.el.classList.remove("median");
    }

    function setAsMedian(n) {
        n.el.classList.add("median");
    }

    function sort() {
        self.nodes.sort(function(a, b) {
            if (a.value > b.value) {
                return 1;
            }
            if (a.value < b.value) {
                return -1;
            }
            return 0;
        });
    }

}

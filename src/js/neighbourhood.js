neighbourhood = new (function() {

    let self = this;

    this.el = document.getElementById("neighbourhood");

    this.sections = [];

    let mySectionIndex = -1;
    let myNodeIndex = -1;

    this.makeRandomSections = function() {
        self.sections = [];
        let totalSections = prng.nextRange(config.sections.min, config.sections.max);
        mySectionIndex = prng.nextRange(0, totalSections);
        for (let i=0; i<totalSections; i++) {
            let sectionName = "s" + self.sections.length;
            let s = new Section(sectionName);
            self.sections.push(s);
            self.el.appendChild(s.el);
            let nodesInSection = prng.nextRange(config.nodes_per_section.min, config.nodes_per_section.max);
            let isMySection = mySectionIndex == i;
            if (isMySection) {
                myNodeIndex = prng.nextRange(0, nodesInSection);
            }
            for (let j=0; j<nodesInSection; j++) {
                let nodeName = sectionName + "n" + s.nodes.length;
                if (isMySection && j == myNodeIndex) {
                    let b = new Bidder(nodeName);
                    s.addNode(b);
                }
                else {
                    let n = new Node(nodeName);
                    s.addNode(n);
                }
            }
        }
    }

    this.doNeighbourBid = function() {
        // select random neighbour (must not be my section)
        let neighbourIndex = prng.nextRange(0, self.sections.length);
        while (neighbourIndex == mySectionIndex) {
            neighbourIndex = prng.nextRange(0, self.sections.length);
        }
        let neighbour = self.sections[neighbourIndex];
        // calculate neighbour bid
        let nb = neighbour.getBid();
        // unhighlight all neighbours
        for (let i=0; i<self.sections.length; i++) {
            self.sections[i].el.classList.remove("active-neighbour");
        }
        // highlight neighbour
        neighbour.el.classList.add("active-neighbour");
        // calculate reward distribution
        let bid = nb.use == "median" ? nb.median : nb.average;
        let mySection = self.sections[mySectionIndex];
        let rewards = mySection.calcRewards(bid);
        // display neighbour bid details
        document.querySelectorAll(".neighbour-bid .using")[0].textContent = nb.use;
        document.querySelectorAll(".neighbour-bid .bid")[0].textContent = bid;
        document.querySelectorAll(".neighbour-bid")[0].classList.remove("hidden");
        // display rewards leaderboard
        let leaderboard = new Leaderboard(rewards);
        let lbEl = document.getElementById("leaderboard");
        while (lbEl.firstChild) {
            lbEl.removeChild(lbEl.firstChild);
        }
        lbEl.appendChild(leaderboard.el);
    }

})();

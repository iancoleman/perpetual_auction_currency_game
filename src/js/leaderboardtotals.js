LeaderboardTotals = function (rewards) {

    let self = this;

    let template = document.getElementById("leaderboard-template-totals").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    rewards.sort(byHighestTotals);
    for (let i = 0; i < rewards.length; i++) {
        let reward = rewards[i];
        reward.rank = i + 1;
        let row = new LeaderboardTotalsRow(reward);
        self.el.appendChild(row.el);
    }

    function byHighestTotals(a, b) {
        if (a.totals < b.totals) {
            return 1;
        }
        if (a.totals > b.totals) {
            return -1;
        }
        return 0;
    }
}

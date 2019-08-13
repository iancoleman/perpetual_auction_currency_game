Leaderboard = function(rewards) {

    let self = this;

    let template = document.getElementById("leaderboard-template").innerHTML;
    container = document.createElement("div");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    rewards.sort(byMostReward);
    for (let i=0; i<rewards.length; i++) {
        let reward = rewards[i];
        reward.rank = i + 1;
        let row = new LeaderboardRow(reward);
        self.el.appendChild(row.el);
    }

    function byMostReward(a,b) {
        if (a.reward < b.reward) {
            return 1;
        }
        if (a.reward > b.reward) {
            return -1;
        }
        return 0;
    }
}

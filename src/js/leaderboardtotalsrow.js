LeaderboardTotalsRow = function (reward) {

    let template = document.getElementById("leaderboard-row-template-totals").innerHTML;
    container = document.createElement("table");
    container.innerHTML = template;
    this.el = container.querySelectorAll("*")[0];

    let totalsStr = reward.totals.toFixed(2);

    this.el.querySelectorAll(".rank")[0].textContent = reward.rank;
    this.el.querySelectorAll(".bid")[0].textContent = reward.bid;
    this.el.querySelectorAll(".reward")[0].textContent = totalsStr;

    if (reward.me) {
        this.el.classList.add("my-bid");
    }
}

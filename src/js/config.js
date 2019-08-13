config = {
    sections: {
        min: 6,
        max: 10,
    },
    nodes_per_section: {
        min: 15,
        max: 30,
    },
    bid: {
        min: 1200,
        max: 1400,
    },
};

(function() {

    let DOM = {};
    DOM.settingsShow = document.getElementById("settings-show");
    DOM.settingsHide = document.getElementById("settings-hide");
    DOM.settingsModal = document.getElementById("settings-modal");

    DOM.settingsShow.addEventListener("click", showSettings);
    DOM.settingsHide.addEventListener("click", hideSettings);

    function showSettings() {
        DOM.settingsModal.classList.remove("hidden");
    }

    function hideSettings() {
        DOM.settingsModal.classList.add("hidden");
    }

})();

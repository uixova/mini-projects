const adsClose = document.getElementById("ads-close");
const adsContainer = document.getElementsByClassName("header-ads-container")[0];

adsClose.addEventListener("click", (e) => {
    adsContainer.classList.add("hidden");
});

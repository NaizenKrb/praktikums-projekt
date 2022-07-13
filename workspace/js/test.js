// Language: javascript
"use strict";

const profileButton = document.querySelector("#buttonProfile");
profileButton.addEventListener("click", openDropdown);

function openDropdown() {
    const profile = document.querySelector("#profileDropdown");
    profile.classList.toggle("hidden");
}
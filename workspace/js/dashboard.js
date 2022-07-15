// Language: javascript
"use strict";

const profileButton = document.querySelector("#profileButton");
profileButton.addEventListener('click', () => {
    let profile = document.querySelector(".profileMenu");
    profile.classList.toggle('hidden');
});
const month = ["Januar","Februar","Maerz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const d = new Date();
var month_index = d.getMonth()
const current_month = month[month_index];


document.getElementById("month").innerHTML = current_month;

document.getElementById("next").onclick = function() {nextMonth()};
document.getElementById("last").onclick = function() {lastMonth()};


function nextMonth() {
    if (month_index < 11) {
        month_index += 1;
    }
    document.getElementById("month").innerHTML = month[month_index];
};

function lastMonth() {
    if (month_index > 0) {
        month_index -= 1;
    }
    document.getElementById("month").innerHTML = month[month_index];
};
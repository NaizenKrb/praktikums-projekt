const months = ["Januar","Februar","Maerz","April",
                "Mai","Juni","Juli","August","September",
                "Oktober","November","Dezember"];

const weekDays = ["Sonntag", "Montag","Dienstag","Mittwoch",
                "Donnerstag","Freitag","Samstag"];

const d = new Date();
let monthIndex = d.getMonth();
let year = d.getFullYear();
const currentMonth = months[monthIndex];


document.getElementById("month").innerHTML = currentMonth + " " + year;

document.getElementById("next").onclick = function() {nextMonth()};
document.getElementById("last").onclick = function() {lastMonth()};


function nextMonth() {
    if (monthIndex < 11) {
        monthIndex += 1;
    }
    document.getElementById("month").innerHTML = months[monthIndex] + " " + year;
}

function lastMonth() {
    if (monthIndex > 0) {
        monthIndex -= 1;
    }
    document.getElementById("month").innerHTML = months[monthIndex] + " " + year;
}


const date = new Date();
const currentYear = date.getFullYear();
const currentDay = date.getDate();

const monthIndex2 = date.getMonth();
const currentMonth2 = months[monthIndex2];


const daysInCurrentMonth = getDaysInMonth(currentYear, monthIndex2);
const weekDay = getWeekDay();

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function getWeekDay() {
    const weekdayIndex = date.getDay();
    return weekDays[weekdayIndex];
}

alert("Derzeit ist der Monat " + currentMonth2 + "\nDer Monat hat so viele Tage: " + daysInCurrentMonth + "\nDas ist unser Tag: " + currentDay  + "\nDas ist welcher Tag es in der Woche ist: " + weekDay);


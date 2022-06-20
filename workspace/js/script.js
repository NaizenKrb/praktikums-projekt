// Language: javascript

const months = ["Januar","Februar","Maerz","April",
                "Mai","Juni","Juli","August","September",
                "Oktober","November","Dezember"];

const weekDays = ["Sonntag", "Montag","Dienstag","Mittwoch",
                "Donnerstag","Freitag","Samstag"];


const date = new Date();
const currentYear = date.getFullYear();
const currentDay = date.getDate();


let monthIndex = date.getMonth();
const currentMonth = months[monthIndex];


const lastMonth = getDaysInMonth(currentYear, monthIndex - 1);
const nextMonth = getDaysInMonth(currentYear, monthIndex + 1);


const lastMonthDays = getDaysInMonth(currentYear, monthIndex - 1);
const nextMonthDays = getDaysInMonth(currentYear, monthIndex + 1);


const daysInCurrentMonth = getDaysInMonth(currentYear, monthIndex);
const weekDay = getWeekDay();

document.getElementById("month").innerHTML = currentMonth + " " + currentYear;

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function getWeekDay() {
    const weekdayIndex = date.getDay();
    return weekDays[weekdayIndex];
}

alert("Derzeit ist der Monat " + currentMonth + "\nDer Monat hat so viele Tage: " + daysInCurrentMonth + "\nDas ist unser Tag: " + currentDay  + "\nDas ist welcher Tag es in der Woche ist: " + weekDay);

const nextButtonClicked = document.getElementById("next")
if (nextButtonClicked != null) {
    nextButtonClicked.addEventListener("click", function() {
        setNextMonth();
    });
}

const lastButtonClicked = document.getElementById("last")
if (lastButtonClicked != null) {
    lastButtonClicked.addEventListener("click", function() {
        setLastMonth();
    });
}

function setNextMonth() {
    if (monthIndex < 11) {
        console.log(monthIndex);
        monthIndex += 1;
    }
    document.getElementById("month").innerHTML = months[monthIndex] + " " + currentYear;
}

function setLastMonth() {
    if (monthIndex > 0) {
        monthIndex -= 1;
    }
    document.getElementById("month").innerHTML = months[monthIndex] + " " + currentYear;
}
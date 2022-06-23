// Language: javascript
"use strict";
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

const daysInCurrentMonth = getDaysInMonth(currentYear, monthIndex);
const weekDay = getWeekDay(currentYear, monthIndex, currentDay);

const viewButton = document.getElementById("viewButton");
const viewMenu = document.getElementById("menu");
viewButton.addEventListener("click", changeViewButton);

document.getElementById("month").innerHTML = currentMonth + " " + currentYear;
getDaysPlusWeekday(monthIndex, currentYear);


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

// Get all the Dates + the Weekday

function getDaysPlusWeekday(monthIndex, year) {
    const days = getDaysInMonth(year, monthIndex);
    console.log(monthIndex);
    for (let i = 1; i <= days; i++) {
        const weekDay = getWeekDay(year, monthIndex, i);
        const date = i;
        const day = weekDay + ", " + date;
        const weekEnd = weekDay === "Samstag" || weekDay === "Sonntag";
        const normalDay = weekDay !== "Samstag" && weekDay !== "Sonntag";
        let ausgabe = (weekEnd ?? normalDay) ?
        `
        <div class="border-r border-b border-slate-600 bg-slate-300">
            <div class="py-1 px-3 border-b border-slate-600 bg-slate-400 text-gray-800 truncate">
            ${day.split(",")[1]}.
            ${day.split(",")[0]}
            </div>
            <div class="py-1 h-24 min-h-[12rem]"></div>
        </div>` 
        :
        `
        <div class="border-r border-b border-slate-600 bg-slate-100">
            <div class="py-1 px-3 border-b border-slate-600 bg-slate-300  truncate">
                ${day.split(",")[1]}.
                ${day.split(",")[0]}
            </div>
            <div class="py-1 min-h-[12rem] break-words">
                "Here you can add some content"
            </div>
        </div>
        `;

        document.getElementById("days").innerHTML += ausgabe;
    }
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getDaysOfLastMonth(year, month) {
    return new Date(year, month +1, 0).getDate();
}

function getDaysOfNextMonth(year, month) {
    return new Date(year, month +1, 0).getDate();
}

function getWeekDay(year, month, day) {
    const date = new Date(year, month, day);

    return weekDays[date.getDay()];
}

function setNextMonth() {
    if (monthIndex < 11) {
        monthIndex += 1;
    }
    document.getElementById("month").innerHTML = months[monthIndex] + " " + currentYear;
    document.getElementById("days").innerHTML = "";
    getDaysPlusWeekday(monthIndex, currentYear);
}

function setLastMonth() {
    if (monthIndex > 0) {
        monthIndex -= 1;
    }
    document.getElementById("month").innerHTML = months[monthIndex] + " " + currentYear;
    document.getElementById("days").innerHTML = "";
    getDaysPlusWeekday(monthIndex, currentYear);
}

const eventButton = document.getElementById("addEvent");
eventButton.addEventListener("click", addEvent);


function changeViewButton() {
    console.log("View changed");
    if (viewMenu.classList.contains("hidden")) {
        viewMenu.classList.remove("hidden");
    } else {
        viewMenu.classList.add("hidden");
    }
}

function addEvent() {
    console.log("Event added");
    
    
};

const thisMonthButton = document.getElementById("thisMonth");
thisMonthButton.addEventListener("click", jumpToThisMonth);

function jumpToThisMonth() {
    monthIndex = date.getMonth();
    document.getElementById("month").innerHTML = months[monthIndex] + " " + currentYear;
    document.getElementById("days").innerHTML = "";
    getDaysPlusWeekday(monthIndex, currentYear);
}

// Function to place the Days in the correct order 
// and fill the empty spaces with 
// the last month's days and the next month's days

function fillCalendar() {
    const days = getDaysInMonth(currentYear, monthIndex);

    const lastMonthDays = getDaysOfLastMonth(currentYear, monthIndex - 1);
    const nextMonthDays = getDaysOfNextMonth(currentYear, monthIndex + 1);

    const weekDay = getWeekDay(currentYear, monthIndex, currentDay);
    const weekEnd = weekDay === "Samstag" || weekDay === "Sonntag";
    const normalDay = weekDay !== "Samstag" && weekDay !== "Sonntag";
    let ausgabe = "";

    
    for (let i = 1; i <= days; i++) {
        const weekDay = getWeekDay(currentYear, monthIndex, i);
        const date = i;
        const day = weekDay + ", " + date;
        const weekEnd = weekDay === "Samstag" || weekDay === "Sonntag";
        const normalDay = weekDay !== "Samstag" && weekDay !== "Sonntag";
        let ausgabe = (weekEnd ?? normalDay) ?
        `
        <div class="border-r border-b border-slate-600 bg-slate-300">
            <div class="py-1 px-3 border-b border-slate-600 bg-slate-400 text-gray-800 truncate">
            ${day.split(",")[1]}.
            ${day.split(",")[0]}
            </div>
            <div class="py-1 h-24 min-h-[12rem]"></div>
        </div>`
        :
        `
        <div class="border-r border-b border-slate-600 bg-slate-100">
            <div class="py-1 px-3 border-b border-slate-600 bg-slate-300  truncate">
                ${day.split(",")[1]}.
                ${day.split(",")[0]}
            </div>
            <div class="py-1 min-h-[12rem] break-words">
                "Here you can add some content"
            </div>
        </div>
        `;
        document.getElementById("days").innerHTML += ausgabe;
    }
}


console.log("Derzeit ist der Monat " + currentMonth + "\nDer Monat hat so viele Tage: " + daysInCurrentMonth + "\nDas ist unser Tag: " + currentDay  + "\nDas ist welcher Tag es in der Woche ist: " + weekDay);


console.log(getDaysInMonth(currentYear, monthIndex));
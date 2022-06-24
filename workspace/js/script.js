// Language: javascript
"use strict";
const months = ["Januar","Februar","Maerz","April",
                "Mai","Juni","Juli","August","September",
                "Oktober","November","Dezember"];

const weekDays = ["Sonntag", "Montag","Dienstag","Mittwoch",
                "Donnerstag","Freitag","Samstag"];

let date = new Date();
let currentYear = date.getFullYear();
let currentDay = date.getDate();


let monthIndex = date.getMonth();
let currentMonth = months[monthIndex];

let daysInCurrentMonth = getDaysInMonth(currentYear, monthIndex);
let weekDay = getWeekDay(currentYear, monthIndex, currentDay);

//let viewButton = document.querySelectorAll(".viewButton");

let buttonContainer = document.querySelectorAll(".buttoncontainer");

buttonContainer.forEach((entry) =>{

    entry.querySelector('.viewButton').addEventListener('click', () => {
        let menu = entry.querySelector(".viewMenu");
        
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
        } else {
            menu.classList.add("hidden");
        }
    });         
});

const thisMonthButton = document.querySelectorAll(".thisMonth");
thisMonthButton.forEach((entry) =>{
    entry.addEventListener("click", () => {
        if(monthIndex !== date.getMonth()) {
            console.log("Month changed");
            monthIndex = date.getMonth();
            currentYear = date.getFullYear();
            document.querySelector("#days").innerHTML = "";
            document.querySelector("#month").innerHTML = currentMonth + " " + currentYear;
            getDaysPlusWeekday(monthIndex, currentYear);
        } else {
            console.log("Month not changed");
            /// Alert or smth else later
        }

    });
});

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

    let daysLastMonth = getDaysInMonth(year, monthIndex - 1);
    let daysNextMonth = getDaysInMonth(year, monthIndex + 1);


    let firstDayOfMonth = getWeekDay(year, monthIndex, 1);
    let colStart;

    if(firstDayOfMonth !== "Montag") {
         colStart = weekDays.indexOf(firstDayOfMonth);
    } else {
         colStart = 0;
    }



    for (let i = 1; i <= days; i++) {
        const weekDay = getWeekDay(year, monthIndex, i);
        let date = i;
        let day = weekDay + ", " + date;
        const weekEnd = weekDay === "Samstag" || weekDay === "Sonntag";
        const normalDay = weekDay !== "Samstag" && weekDay !== "Sonntag";
        let colStartLastMonth;


        if (colStart === 0) {
            let ausgabe = (weekEnd ?? normalDay) ?
                `
            <div class="col-start-${i} col-span-1 border-r border-b border-slate-600 bg-slate-300">
                <div class="py-1 px-3 border-b border-slate-600 bg-slate-400 text-gray-800 truncate">
                ${day.split(",")[1]}.
                ${day.split(",")[0]}
                </div>
                <div class="py-1 h-24 min-h-[12rem]"></div>
            </div>`
                    :
                    `
            <div class="col-start-${i} col-span-1 border-r border-b border-slate-600 bg-slate-100">
                <div class="py-1 px-3 border-b border-slate-600 bg-slate-300  truncate">
                    ${day.split(",")[1]}.
                    ${day.split(",")[0]}
                </div>
                <div class="py-1 min-h-[12rem] break-words">
                    "Here you can add some content"
                </div>
            </div>
            `;
            document.querySelector("#days").innerHTML += ausgabe;
        } else {
            let getFillDaysOfLastMonth = daysLastMonth - colStart;
            console.log(getFillDaysOfLastMonth);

            for (let i = 0; i < colStart; i++) {
                colStartLastMonth = i*-1;



                getFillDaysOfLastMonth--;

            }

            let ausgabe = (weekEnd ?? normalDay) ?
                `
            <div class="col-start-${colStart + i} col-span-1 border-r border-b border-slate-600 bg-slate-300">
                <div class="py-1 px-3 border-b border-slate-600 bg-slate-400 text-gray-800 truncate">
                ${day.split(",")[1]}.
                ${day.split(",")[0]}
                </div>
                <div class="py-1 h-24 min-h-[12rem]"></div>
            </div>`
                    :
                    `
            <div class="col-start-${colStart + i} col-span-1 border-r border-b border-slate-600 bg-slate-100">
                <div class="py-1 px-3 border-b border-slate-600 bg-slate-300  truncate">
                    ${day.split(",")[1]}.
                    ${day.split(",")[0]}
                </div>
                <div class="py-1 min-h-[12rem] break-words">
                    "Here you can add some content"
                </div>
            </div>
            `;

            document.querySelector("#days").innerHTML += ausgabe;
        };


    }

}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


function getWeekDay(year, month, day) {
    let date = new Date(year, month, day);

    return weekDays[date.getDay()];
}

function setNextMonth() {
    if (monthIndex === 11) {
        monthIndex = 0;
        currentYear += 1;
    } else {
        monthIndex += 1;
    }
    document.querySelector("#month").innerHTML = months[monthIndex] + " " + currentYear;
    document.querySelector("#days").innerHTML = "";
    getDaysPlusWeekday(monthIndex, currentYear);
}

function setLastMonth() {
    if (monthIndex === 0) {
        monthIndex = 11;
        currentYear -= 1;
    } else {
        monthIndex -= 1;
    }
    document.querySelector("#month").innerHTML = months[monthIndex] + " " + currentYear;
    document.querySelector("#days").innerHTML = "";
    getDaysPlusWeekday(monthIndex, currentYear);
}

const eventButton = document.getElementById("addEvent");
eventButton.addEventListener("click", addEvent);

function addEvent() {
    console.log("Event added");
    
    
}

// Function to place the Days in the correct order 
// and fill the empty spaces with 
// the last month's days and the next month's days

function fillCalendar() {
    const days = getDaysInMonth(currentYear, monthIndex);

    const lastMonthDays = getDaysInMonth(currentYear, monthIndex - 1);
    const nextMonthDays = getDaysInMonth(currentYear, monthIndex + 1);

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
        document.querySelector("#days").innerHTML += ausgabe;
    }
}


console.log("Derzeit ist der Monat " + currentMonth + "\nDer Monat hat so viele Tage: " + daysInCurrentMonth + "\nDas ist unser Tag: " + currentDay  + "\nDas ist welcher Tag es in der Woche ist: " + weekDay);

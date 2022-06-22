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


const lastMonth = getDaysInMonth(currentYear, monthIndex - 1);
const nextMonth = getDaysInMonth(currentYear, monthIndex + 1);


const lastMonthDays = getDaysInMonth(currentYear, monthIndex - 1);
const nextMonthDays = getDaysInMonth(currentYear, monthIndex + 1);


const daysInCurrentMonth = getDaysInMonth(currentYear, monthIndex);
const weekDay = getWeekDay();

document.getElementById("month").innerHTML = currentMonth + " " + currentYear;


// Get all the Dates + the Weekday

function getDaysPlusWeekday(monthIndex, year) {
    const days = getDaysInMonth(year, monthIndex);
    console.log(monthIndex);
    for (let i = 1; i <= days; i++) {
        const weekDay = getWeekDay(year, monthIndex, i);
        const date = i;
        const day = weekDay + ", " + date;
        //document.getElementById("days").innerHTML += `"<li>" + day + "</li>"`;
        
        const weekEnd = weekDay === "Samstag" || weekDay === "Sonntag";
        const normalDay = !weekEnd;

        var ausgabe = (day !=  weekEnd) ?
        `
        <div class="border-b border-slate-600 bg-slate-300 truncate">
            <div class="py-1 px-3 border-b border-slate-600 bg-slate-400 text-gray-800">
            ${day.split(",")[1]}
            </div>
            <div class="py-1 h-24 min-h-[12rem]"></div>
        </div>` 
        :
        `
        <div class="border-r border-b border-slate-600 bg-slate-100 truncate">
            <div class="border-b border-slate-600 bg-slate-300 py-1 px-3">
                ${day.split(",")[1]}
            </div>
            <div class="py-1 min-h-[12rem]">
                <div class="my-2 px-3 ml-1 rounded-l-lg text-red-900 bg-red-300">
                    NG
                </div>
                <div class="my-2 px-3 ml-1 rounded-l-lg text-red-900 bg-red-300">
                    NG
                </div>
                <div class="my-2 px-3 ml-1 rounded-l-lg text-red-900 bg-red-300">
                    NG
                </div>
                <div class="my-2 px-3 ml-1 rounded-l-lg text-red-900 bg-red-300">
                    NG
                </div>
                <div class="my-2 px-3 gap ml-1 rounded-l-lg text-blue-900 bg-blue-300">
                    NH
                </div>
            </div>
        </div>
        `;
        document.getElementById("days").innerHTML += ausgabe;


        // if(weekDay === "Samstag" || weekDay === "Sonntag") {
        //     document.getElementById("days").innerHTML += `
        //     <div class="border-b border-slate-600 bg-slate-300 truncate">
        //         <div class="py-1 px-3 border-b border-slate-600 bg-slate-400 text-gray-800">
        //         ${day.split(",")[1]}
        //         </div>
        //         <div class="py-1 h-24 min-h-[12rem]">
        //         </div>
        //     </div>
        //     `;
        // } else {
        // document.getElementById("days").innerHTML += `
        // <div class="border-r border-b border-slate-600 bg-slate-100 truncate">
        //     <div class="border-b border-slate-600 bg-slate-300 py-1 px-3">
        //         ${day.split(",")[1]}
        //     </div>
        //     <div class="py-1 min-h-[12rem]">
        //         <div class="my-2 px-3 ml-1 rounded-l-lg text-red-900 bg-red-300">
        //             NG
        //         </div>
        //         <div class="my-2 px-3 ml-1 rounded-l-lg text-red-900 bg-red-300">
        //             NG
        //         </div>
        //         <div class="my-2 px-3 ml-1 rounded-l-lg text-red-900 bg-red-300">
        //             NG
        //         </div>
        //         <div class="my-2 px-3 ml-1 rounded-l-lg text-red-900 bg-red-300">
        //             NG
        //         </div>
        //         <div class="my-2 px-3 gap ml-1 rounded-l-lg text-blue-900 bg-blue-300">
        //             NH
        //         </div>
        //     </div>
        // </div>
        // `
        // }
    }
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


function getWeekDay(year, month, day) {
    const date = new Date(year, month, day);

    return weekDays[date.getDay()];
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




console.log(getDaysInMonth(currentYear, monthIndex));
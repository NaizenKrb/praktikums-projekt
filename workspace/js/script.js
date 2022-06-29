// Language: javascript
"use strict";
const months = ["January","February","March","April",
                "May","June","July","August","September",
                "October","November","December"];

const weekDays = ["Sonntag", "Montag","Dienstag","Mittwoch",
                "Donnerstag","Freitag","Samstag"];

let date = new Date();
let currentYear = date.getFullYear();
let currentDay = date.getDate();

let monthIndex = date.getMonth();
let currentMonth = months[monthIndex];

let daysInCurrentMonth = getDaysInMonth(currentYear, monthIndex);
let weekDay = getWeekDay(currentYear, monthIndex, currentDay);

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
        if(monthIndex !== date.getMonth() || currentYear !== date.getFullYear()) {
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

// Modal Part ---------------------------------------------------------------
let openmodal = document.querySelectorAll(".addEvent");
openmodal.forEach((entry) =>{
    entry.addEventListener("click", function (event) {
        event.preventDefault();
        toggleModal();
    });
});

const overlay = document.querySelector('.modal-overlay');
overlay.addEventListener('click', toggleModal);

const closemodal = document.querySelectorAll('.modal-close')
for (let i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal);
}

document.onkeydown = function(evt) {
    evt = evt || window.event
    let isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal();
    }
    if (isEscape && document.body.classList.contains('overflow-hidden')) {
        toggleModal();
    }
};

function toggleModal () {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    body.classList.toggle('modal-active');
    body.classList.toggle('overflow-hidden');
}
// End of Modal Part ---------------------------------------------------------
const addButton = document.querySelector(".addButton");
addButton.addEventListener("click", addEvent);

let jsonEvent;

let jsonEventList = "events" in localStorage? JSON.parse(localStorage.getItem('events')) : {};

function addEvent() {
    let name = document.querySelector(".name").value;
    let startDate = document.querySelector(".startDate").value;
    let endDate = document.querySelector(".endDate").value;
    
    jsonEventList[`${name}`] = {name: name, start: startDate, end: endDate};
    localStorage.setItem("events", JSON.stringify(jsonEventList));

    console.log(localStorage.getItem('events'));
    console.log(jsonEventList);
    console.log("spacer");
    //toggleModal();
}

// Get all the Dates + the Weekday
function getDaysPlusWeekday(monthIndex, year) {

    // Start-Datum mit Jahr, Monat und dem 1. Tag
    const startDate = new Date(year, monthIndex, 1);

    // End-Datum, der "Nullte Tag" des folgenden Monats, ein kleiner Trick um einen Tag in die 
    // Vergangenheit zu springen und so das richtige End-Datum des Monats zu erhalten.
    const endDate = new Date(year, monthIndex + 1, 0);

    // Wenn das Start-Datum nicht bei Montag anfängt, dann gehen wir die notwendigen Tage mit einem
    // negativen Wert bei der `setDate` methode zurück. Das Problem hierbei: JavaScript bietet mit 
    // `getDay()` zwar eine Möglichkeit an den Wochentag als nummerischen Wert zu erhalten, nutzt
    // allerdings die folgenden Werte:
    //      0 = Sonntag
    //      1 = Montag
    //      2 = Dienstag
    //      3 = Mittwoch
    //      4 = Donnerstag
    //      5 = Freitag
    //      6 = Samstag
    // da wir allerdings bei Montag anfangen möchten, müssen wir diese Werte sortieren, und können
    // dadurch die Anzahl der vorherigen Tage ermitteln (-1, da wir beim aktuellen startDate
    // Objekt in die Vergangenheit springen möchten und daher 0-index basiert arbeiten):
    if (startDate.getDay() !== 1) {
        startDate.setDate(-([1, 2, 3, 4, 5, 6, 0].indexOf(startDate.getDay()) - 1));
    }

    // Ähnlich können wir auch das Ende unseres Kalenders berechnen, müssen allerdings die Anzahl
    // der nachfolgenden Tage (bis Sonntag) auf das aktuelle End-Datum draufrechnen. Um diese Zahl 
    // zu ermitteln, rechnen wir die Position in unserem "sortierten Wochentag-array" gegen die
    // Gesamtanzahl der Wochentage. (7, allerdings 0-index basiert... also 6).
    if (endDate.getDay() !== 0) {
        endDate.setDate(
            endDate.getDate() + 
            (6 - [1, 2, 3, 4, 5, 6, 0].indexOf(endDate.getDay()))
        );
    }

    // Jetzt wo startDate und endDate den Kalender des entsprechenden Monats enthält + die Wochen-
    // tage am Anfang sowie am Ende ergänzt haben, können wir mit einem kleinen Trick sämtliche 
    // Daten in einer einzigen While Schleife ausgeben:
    // Die `toJSON` Methode gibt einen DateTime String zurück, die ersten 10 Zeichen enthalten das
    // Datum als "[JAHR]-[MONAT]-[TAG]", welches wir mit `≤` gut mit dem Ende vergleichen können:
    const output = [];
    const until = endDate.toJSON().slice(0, 10);        // Da sich endDate nicht ändern, können wir es als Konstante festlegen
    while(startDate.toJSON().slice(0, 10) <= until) {

        // Der aktuelle Monat / das aktuelle Jahr, basierend auf die Funktions-Argumente
        const current = startDate.getMonth() === monthIndex && startDate.getFullYear() === year;

        const isWeekEnd = startDate.getDay() === 6 || startDate.getDay() === 0;

        // Die folgende Funktion "übersetzt" das aktuelle Date-Object auf Österreichisch (um die Kollegen zu ärgern).
        // Intl.DateTimeFormat -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
        const dayFormat = new Intl.DateTimeFormat('de-AT', {
            day: 'numeric',
            weekday: 'short',
            month: 'short'
        }).format(startDate);


        // HTML Inhalt
        if(isWeekEnd && current) {
            if(startDate.getDay() === 6) {
                output.push(`
                <div class="col-span-1 border-r border-slate-600 bg-slate-300">
                    <div class="py-1 px-3 border-y border-slate-600 bg-slate-400 text-gray-500 truncate">
                        ${dayFormat}
                    </div>
                    <div class="py-1 min-h-[12rem] break-words">
                    </div>
                </div>
                `);
            } else {
                output.push(`
                <div class="col-span-1 bg-slate-300">
                    <div class="py-1 px-3 border-y border-slate-600 bg-slate-400 text-gray-500 truncate">
                        ${dayFormat}
                    </div>
                    <div class="py-1 min-h-[12rem] break-words">
                    </div>
                </div>
                `);
            }
        } else {
            output.push(
            current?
                `
                <div class="col-span-1 border-r border-slate-600 bg-slate-50 group hover:bg-slate-300 active:bg-slate-200">
                    <div class="py-1 px-3 border-y border-slate-600 bg-slate-200 truncate group-hover:bg-slate-400 group-active:bg-slate-300 ">
                        ${dayFormat}
                    </div>
                    <div class="vacationInput py-1 min-h-[12rem] break-words">
                        "Here you can add some content"
                    </div>
                </div>
            `:
                `
                <div class="col-span-1 border-r border-slate-600 bg-slate-400">
                    <div class="py-1 px-3 border-y border-slate-600 bg-slate-500 text-gray-800 truncate">
                        ${dayFormat}
                    </div>
                    <div class="py-1 h-24 min-h-[12rem]"></div>
                </div>
            `)
        }

        // Der While-Loop ändert die bestehenden Vergleichswerte nicht, daher müssen wir das tun:
        startDate.setDate(startDate.getDate() + 1);
    }

    document.querySelector("#days").innerHTML += output.join("");
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

console.log("Derzeit ist der Monat " + currentMonth + "\nDer Monat hat so viele Tage: " + daysInCurrentMonth + "\nDas ist unser Tag: " + currentDay  + "\nDas ist welcher Tag es in der Woche ist: " + weekDay);

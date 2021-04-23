// current date 
var currentDay=moment(); 
$("#currentDay").text(currentDay.format("dddd, MMMM Do YYYY"));

// get current time value
var timeValue=currentDay.format("hA");
console.log("["+timeValue+"]");

var schedules = [
    {  time:"9AM",
       detail:""
    }
];

//variables
var eventListEl = $('.container');

///////////******************************* */
var eventList = document.querySelector(".container");

var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");



var events = [];

// The following function renders items in a todo list as <li> elements
function renderEvents() {
  // Clear todoList element and update todoCountSpan
  eventList.innerHTML = "";


  // Render a new event
  for (var i = 0; i < events.length; i++) {
    var event = events[i];

    var div = document.createElement("div");
    div.setAttribute('class', 'time-block row');
    div.textContent=event.time;
    div.setAttribute("data-index", i);

        var div1 = document.createElement("div");
        div1.setAttribute('class', 'hour col-1');
        div1.textContent=event.time; 
        div.appendChild(div1);

        var textArea1 = document.createElement("textarea");
        textArea1.setAttribute('class', 'past col-md');
        textArea1.textContent=event.detail;
        div.appendChild(textArea1);

        var btn1 = document.createElement("button");
        btn1.setAttribute('class', 'saveBtn col-1');
        var iE = document.createElement("i");
        iE.setAttribute('style', 'font-size:24px');
        iE.setAttribute('class', 'fa');
        btn1.appendChild(iE);
        btn1.innerHTML="&#xf0c7;";
        div.appendChild(btn1);

    div.appendChild(button);
    eventList .appendChild(div);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  var storedSchedules = JSON.parse(localStorage.getItem("events"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedSchedules !== null) {
    events = storedSchedules;
  }

  // This is a helper function that will render todos to the DOM
  renderEvents();
}

function storeEvents() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("events", JSON.stringify(events));
}

// Add submit event to form
todoForm.addEventListener("click", function(event) {
  event.preventDefault();

  var eventText = eventTextarea.value.trim();

  // Return from function early if submitted todoText is blank
  if (eventText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  events.push(eventText);
  eventTextarea.value = "";

  // Store updated todos in localStorage, re-render the list
  storeEventss();
  renderEvents();
});

// Add click event to todoList element
todoList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    // todos.splice(index, 1);
    events[i].detail="";

    // Store updated todos in localStorage, re-render the list
    storeEvents();
    renderEvents();
  }
});

// Calls init to retrieve data and render it to the page on load
init()

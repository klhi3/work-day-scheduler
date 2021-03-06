// current date 
var currentDay=moment(); 
$("#currentDay").text(currentDay.format("dddd, MMMM Do YYYY"));

// get current time value
var timeValue=currentDay;  //hA

//business hours
var schedules = [
    {  time:"9AM",  detail:""},  //0
    {  time:"10AM", detail:""},  //1
    {  time:"11AM", detail:""},  //2  
    {  time:"12PM", detail:""},  //3
    {  time:"1PM",  detail:""},  //4
    {  time:"2PM",  detail:""},  //5
    {  time:"3PM",  detail:""},  //6
    {  time:"4PM",  detail:""},  //7
    {  time:"5PM",  detail:""}   //8
];

//variables
// var eventListEl = $('.container');
var eventList = document.querySelector(".container");

var events = schedules;

// The following function renders items in a todo list as <li> elements
function renderEvents() {
  // Clear eventList element 
  eventList.innerHTML = "";

  // Render a new event
  for (var i = 0; i < events.length; i++) {
    var event = events[i];

    var div = document.createElement("div");
    div.setAttribute('class', 'time-block row');
    div.setAttribute("data-index", i);

        var div1 = document.createElement("div");
        div1.setAttribute('class', 'hour col-1');
        div1.textContent=event.time; 
        div.appendChild(div1);

        var textArea1 = document.createElement("textarea");

        // compare actual time to schedule time=> change background color
        var aT = moment(event.time, 'hA').hour();
        var bT = timeValue.hour();

        if (aT>bT) textArea1.setAttribute('class', 'future col-md');
        else if (aT<bT) textArea1.setAttribute('class', 'past col-md');
        else  textArea1.setAttribute('class', 'present col-md');

        textArea1.textContent=event.detail;
        textArea1.setAttribute("style", "color: black;");
        div.appendChild(textArea1);

        var btn1 = document.createElement("button");
        btn1.setAttribute('class', 'saveBtn col-1');
        btn1.setAttribute('data-index', i);
        var iE = document.createElement("i");
        iE.setAttribute('class', 'fa fa-floppy-o');  
        btn1.appendChild(iE);

        div.appendChild(btn1);
 
    eventList .appendChild(div);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored events from localStorage
  var storedSchedules = JSON.parse(localStorage.getItem("events"));

  // If events were retrieved from localStorage, update the todos array to it
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

// Add click event to schedule element
eventList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    var content = element.previousSibling.value;

    events[index].detail=content;

    // Store updated todos in localStorage, re-render the list
    storeEvents();
    renderEvents();
  }
});

// Calls init to retrieve data and render it to the page on load
init()

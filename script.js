// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    let saveButtons = document.querySelectorAll('.save-btn');

    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            // `this` references the button that was clicked
            let timeBlock = this.closest('.time-block');
            let hourId = timeBlock.id; // "hour-x"
            let userInput = timeBlock.querySelector('.user-input').value;

        // Save the user input in local storage using the hourId as the key
        localStorage.setItem(hourId, userInput);
        });
    });
    
    
});
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    let timeBlocks = document.querySelectorAll('.time-block');

    // Get the current hour in 24-hour time format
    let currentHour = new Date().getHours();

    timeBlocks.forEach(block => {
        let hourId = parseInt(block.id.split('-')[1]); // Extract the hour number from the id

        // Add or remove classes based on the comparison with the current hour
        if (hourId < currentHour) {
            block.classList.add('past');
            block.classList.remove('present', 'future');
        } else if (hourId === currentHour) {
            block.classList.add('present');
            block.classList.remove('past', 'future');
        } else {
            block.classList.add('future');
            block.classList.remove('past', 'present');
        }
    });
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    let timeBlocks = document.querySelectorAll('.time-block');

    timeBlocks.forEach(block => {
        let hourId = block.id;
        let userInput = localStorage.getItem(hourId);
        let textarea = block.querySelector('.user-input');
        if (userInput) {
            textarea.value = userInput;
        }
    });
    //
    // TODO: Add code to display the current date in the header of the page.
    
var day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];
document.getElementById("currentDay").innerHTML = day;



  


  $(document).ready(function() {
    // Display the current day in the header
    var time = dayjs().format('MMM D, YYYY, hh:mm:ss');
    $('#currentDay').text(time);
    let currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);
  
    // Color code timeblocks based on past, present, or future
    let currentHour = moment().hour();
    $(".time-block").each(function() {
      let hour = parseInt($(this).attr("id").split("-")[1]);
      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  
    // Save event when save button is clicked
    $(".saveBtn").click(function() {
      let hourId = $(this).parent().attr("id");
      let event = $(this).siblings(".description").val();
      localStorage.setItem(hourId, event);
    });
  
    // Retrieve saved events from local storage and display in timeblocks
    $(".time-block").each(function() {
      let hourId = $(this).attr("id");
      let event = localStorage.getItem(hourId);
      if (event) {
        $(this).find(".description").val(event);
      }
    });
  });
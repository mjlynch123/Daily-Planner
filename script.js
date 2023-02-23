var today = dayjs();
var save = $("button");
var currentHour = today.format("H");

$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // This is the event handler for the save button
  // .click does the same thing as .on("click");
  save.click(function() {
    // Get the id of the previous sibling with the class description and then we get that id of that element
    var inputId = $(this).prev('.description').attr('id');
    //Get the value of the id we got in the previous line
    var task = $(this).prev('.description').val();
    // Get any items saved to local storage, if tasks is empty then we will create a new object
    var taskObj = JSON.parse(localStorage.getItem('tasks')) || {};

    // Save the input value task to the correct id in taskObj
    taskObj[inputId] = task;

    // Save taskObj to local storage
    localStorage.setItem('tasks', JSON.stringify(taskObj));
  });

  function getLocal() {
    var taskObj = JSON.parse(localStorage.getItem('tasks')) || {};

    // For in loop iterates over each property of the taskObj
    for (var inputId in taskObj) {
      // If object has the property of the given inputId then add the value of that object to the input that matches that ID
      if (taskObj.hasOwnProperty(inputId)) {
        $("#" + inputId).val(taskObj[inputId]);
      }
    }
  }

  function getHour(){
    for (var i = 9; i < 18; i++) {
      // Setting current hour from string to int
      currentHour = parseInt(currentHour);
      var hour = $("#hour-" + i); // This code will change what element we are talking about depending on what the value of i is
      // If the current hour is greater that i, remove future and display past 
      if (currentHour > i) {
        hour.removeClass('future');
        hour.addClass("past");
        // If current hour is equal to i then we will remove future and display past
      } else if (currentHour === i) {
        hour.removeClass('future');
        hour.addClass('present');
      } else {
        hour.removeClass('present');
        hour.addClass('future');
      }

      // If the current hour is less than 9 or greater than 18, we will make add the future class to all timeslots
      if (currentHour < 9 || currentHour > 17) {
        hour.removeClass('past');
        hour.removeClass('present');
        hour.addClass('future');
      }
    }
  }

  setInterval(getHour(), 1000);
  getLocal();

  // Added current day and time to the top of the page
  $("#currentDay").text(today.format('dddd MMMM D') + "th, " + today.format("YYYY"));
});

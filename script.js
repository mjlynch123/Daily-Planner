var today = dayjs();
var save = $("button");

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

  // This is the event handler for the save button
  save.on("click", function() {
    alert("Hello");
  });

  var currentHour = today.format("H");
  console.log(currentHour);

  function getHour(){
    for (var i = 9; i < 18; i++) {
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
      if (currentHour < 9 || currentHour > 18) {
        hour.removeClass('past');
        hour.removeClass('present');
        hour.addClass('future');
      }
  }
}

getHour();
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(today.format('dddd MMMM, D') + "th");
});

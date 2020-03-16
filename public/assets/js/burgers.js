// ******************************************************************************************************
// burgers.js [Logic]
// ******************************************************************************************************

// Devour It Button Clicked
// =============================================================
$(function() {
    $("#change-devour").on("click", function(event) {
      var id = $(this).data("id");
  
      var newDevouredState = {
        devoured: 1
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
      }).then(
        function() {
          console.log("changed devoured to: ", 1);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

// Submit Button Clicked
// =============================================================
    $(".create-burger").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#burger").val().trim(),
        devoured: 0
      };
      
      console.log(newBurger);
  
      // Send the POST request
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

  });
  
// =============================================================
// burgers.js [Logic]
// =============================================================


$(document).ready(function () {

  // Global Variables
  // =============================================================
  // =============================================================

  // Customer Variables
  // ------------------------------------------------
  var cust_name;
  var errCustName = false;
  var cust_email;
  var errCustEmail = false;

  // Customer Form Error Variables
  // ------------------------------------------------
  var msgName = document.getElementById('msgName');
  var msgEmail = document.getElementById('msgEmail');

  // Burger Variables
  // ------------------------------------------------
  var burger_name;
  var errBurgerName = false;
  var msgBurger = document.getElementById('msgBurger');


  // Logic
  // =============================================================
  // =============================================================

  // Customer Entry Validations
  // =============================================================
  function isValidName(name) {
    if (name.length < 3) {
      return false;
    }
    var regEx = /^[a-zA-Z]+$/;
    var validName = regEx.test(name);

    if (!validName) {
      return false;
    }
    return true;
  }

  function isValidEmail(email) {
    if (email.length < 3) {
      return false;
    }

    var regEx = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    var validEmail = regEx.test(email);

    if (!validEmail) {
      return false;
    }
    return true;
  };

  // Login Button Clicked
  // =============================================================
  $("#login").on("click", function (event) {
    // Prevent Default button action
    event.preventDefault();

    // Clear variables and local storage
    cust_name = "";
    cust_email = "";
    msgName.innerHTML = '';
    msgEmail.innerHTML = '';
    localStorage.removeItem('cust_name')
    localStorage.removeItem('cust_email')


    // Capture and validate the name input
    cust_name = $("#name").val().trim();

    if (isValidName(cust_name)) {
      errCustName = false;
    } else {
      errCustName = true;
      msgName.innerHTML += 'First name must be at least 3 characters and contain no numbers!';
    }
    // Capture and validate the email input
    cust_email = $("#email").val().trim();

    if (isValidEmail(cust_email)) {
      errCustEmail = false;
    } else {
      errCustEmail = true;
      msgEmail.innerHTML += 'Email address must be at least 6 characters and formatted as an email.';
    };

    // No errors found
    if (errCustName === false && errCustEmail === false) {
      // Clear error messages
      msgName.innerHTML = '';
      msgEmail.innerHTML = '';
      // Check if email in the database
      $.get("/api/customers/" + cust_email, function (data) { })
        .then(function (data) {

          // If not in the database, create a new account
          if (data === null) {
            var newCustomer = {
              cust_name: cust_name,
              cust_email: cust_email
            }
            console.log("-- New Customer Information --")
            console.log(cust_name);
            console.log(cust_email);
            console.log(newCustomer);
            // Send the POST request
            $.ajax("/api/customers", {
              type: "POST",
              data: newCustomer
            }).then(

              function () {
                // Store customer information in local storage
                console.log("Created new customer.");
                localStorage.setItem('cust_name', JSON.stringify(cust_name));
                localStorage.setItem('cust_email', JSON.stringify(cust_email));

                // Navigate to burgers' page
                alert("Welcome " + cust_name + "!");
                window.location.href = "/burgers"
              }
            );

          } else {
            // if yes, pass the name to the next page
            console.log("Welcome back!")
            localStorage.setItem('cust_name', JSON.stringify(cust_name));
            localStorage.setItem('cust_email', JSON.stringify(cust_email));

            // Navigate to burgers' page
            alert("Welcome back " + cust_name + "!");
            window.location.href = "/burgers";
          }
        });
    }
  });

  // Devour It Button Clicked
  // =============================================================
  $(document).on("click", "#change-devour", function () {

    cust_name = JSON.parse(localStorage.getItem('cust_name'));

    var id = $(this).data("id");

    var newDevouredState = {
      devoured: 1,
      cust_name: cust_name
    };
    console.log(id);
    console.log(newDevouredState);
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {

        console.log("changed devoured to: ", 1);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  //  Burger Button Clicked
  // =============================================================
  $("#newBurger").on("click", function (event) {

    // Prevent Default button action
    event.preventDefault();

    msgBurger.innerHTML = '';

    burger_name = $("#burger").val().trim();

    if (burger_name.length < 3) {
      errBurgerName = true;
      msgBurger.innerHTML += 'Burger name must be at least 3 characters!';
    } else {
      errBurgerName = false;
      msgBurger.innerHTML = '';
    }

    if (errBurgerName === false) {
      // Clear error messages
      msgBurger.innerHTML = '';
      var newBurger = {
        burger_name: burger_name
      };

      console.log(newBurger);

      // Send the POST request
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function () {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    };
  });
});
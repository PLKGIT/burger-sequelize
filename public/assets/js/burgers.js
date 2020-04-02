// ******************************************************************************************************
// burgers.js [Logic]
// ******************************************************************************************************


$(document).ready(function () {

  // Global Variables
  // --------------------------------------------------------
  // --------------------------------------------------------

  // Customer Variables
  // ------------------------------------------------
  var cust_name;
  var errCustName = false;
  var cust_email;
  var errCustEmail = false;

  // Burger Variables
  // ------------------------------------------------
  var burger_name;
  var errBurgerName = false;

  // Entry Validations
  // ------------------------------------------------
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


  function isValidBurger(name) {
    if (name.length < 6) {
      return false;
    }
    var regEx = /^[a-zA-Z]+$/;
    var validName = regEx.test(name);

    if (!validName) {
      return false;
    }
    return true;
  }

    // Login Button Clicked
    // =============================================================
    $("#login").on("click", function (event) {

      // Clear variables and local storage
      cid = "";
      cust_name = "";
      cust_email = "";
      localStorage.removeItem('cid')
      localStorage.removeItem('name')
      localStorage.removeItem('email')

      cust_name = $("#name").val().trim();

      if (isValidName(cust_name)) {
        errCustName = false;
      } else {
        errCustName = true;
        alert("Please make sure your Name entry is at least 3 characters and does not contain numbers.")
      }

      cust_email = $("#email").val().trim();

      if (isValidEmail(cust_email)) {
        errCustEmail = false;
      } else {
        errCustEmail = true;
        alert("Please make sure that your Email entry is at least 6 characters and formatted as an email.")
      };

      if (errCustName === false && errCustEmail === false) {
        // Check if email in the db
        $.get("/api/customers/" + cust_email, function (data) { })
          .then(function (data) {
            if (data === null) {
              var newCustomer = {
                cust_name: cust_name,
                cust_email: cust_email
              }
              console.log("--cust info--")
              console.log(cust_name);
              console.log(cust_email);
              console.log(newCustomer);
              // Send the POST request
              $.ajax("/api/customers", {
                type: "POST",
                data: newCustomer
              }).then(
                function () {
                  console.log("created new customer");
                  localStorage.setItem('cust_name', JSON.stringify(cust_name));
                  localStorage.setItem('cust_email', JSON.stringify(cust_email));
                  window.location.href = "/burgers"
                }
              );

            } else {

              // if yes, pass the name to the next page
              console.log("welcome back!")
              localStorage.setItem('cust_name', JSON.stringify(cust_name));
              localStorage.setItem('cust_email', JSON.stringify(cust_email));
              window.location.href = "/burgers";
            }
          });
      }
    });

    // Devour It Button Clicked
    // =============================================================
    $("#change-devour").on("click", function (event) {

      cust_name = JSON.parse(localStorage.getItem('cust_name'));
      cust_email = JSON.parse(localStorage.getItem('cust_email'));

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

      burger_name = $("#burger").val().trim();

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
    });

  });
// *********************************************************************************
// Server.js
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 8080;
var app = express();

// Static directory
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine.
// =============================================================
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Import the DB folder
// =============================================================
var db = require("./models");


// Routes
// =============================================================
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Server listening on http://localhost: " + PORT);
  });
});

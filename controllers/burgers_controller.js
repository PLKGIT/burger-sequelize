// ******************************************************************************************************
// burgers_controller.js [Controllers]
// ******************************************************************************************************

var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
  // burger.all(function(data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });

  db.Burger.findAll({}).then(function (data) {
    var burgerObj = {
      burgers: data
    };
    res.render("index", burgerObj);
  });

});

router.post("/api/burgers", function (req, res) {
  // burger.create([
  //   "burger_name", "devoured"
  // ], [
  //   req.body.burger_name, req.body.devoured
  // ], function(result) {
  //   // Send back the ID of the new burger
  //   res.json({ id: result.insertId });
  // });

  db.Burger.create({
    burger_name: req.body.burger_name,
    devoured: false
  }).then(function (data) {
    res.json({ id: data.id });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  // var condition = "id = " + req.params.id;

  // console.log("condition", condition);

  // burger.update({
  //   devoured: req.body.devoured
  // }, condition, function(result) {
  //   if (result.changedRows == 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  // });

  db.Burger.update({
    devoured: true
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.status(200);
  });

});


module.exports = router;
// Required
//---------------------------------------
var db = require("../models");

// HTML Routes
//---------------------------------------
module.exports = function (app) {

    // Index
    //---------------------------------------

    app.get("/", function (req, res) {
        res.render("index");
    });


    // Burgers
    //---------------------------------------

    app.get("/burgers", function (req, res) {
        db.Burger.findAll({
            order: [
                ['burger_name', 'ASC']
            ]
        }).then(function (data) {
            var hbsObject = {
                burgers: data
            };
            res.render("burgers", hbsObject)
        });
    });

    
    // 404
    //---------------------------------------

    app.get("*", function (req, res) {
        res.render("404");
    });

};
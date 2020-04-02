// ******************************************************************************************************
// apiRoutes.js
// ******************************************************************************************************

// Required
//---------------------------------------
var db = require("../models");
var express = require("express");

// API Routes
//---------------------------------------
module.exports = function (app) {
    // Customers API Get Route
    app.get("/api/customers", function (req, res) {
        db.Customer.findAll({}).then(function (data) {
            res.json(data);
            console.log(data);
        });
    });

    // Customers API Get Route by Customer Email
    app.get("/api/customers/:cust_email", function (req, res) {
        db.Customer.findOne({
            where: {
                cust_email: req.params.cust_email
            }
        }).then(function (data) {
            res.json(data);
            console.log("+++++++++++ customer email received.....");
            console.log(data);
        })
            .catch(function (err) {
                res.json(err);
            });
        console.log("------- no emails found ---------");
        return null;
    });
    // Customers API Post Route
    app.post("/api/customers", function (req, res) {
        db.Customer.create({
            cust_name: req.body.cust_name,
            cust_email: req.body.cust_email
        }).then(function (data) {
            res.json({ bid: data.cid });
            console.log(data)
        });
    });

    // Burgers API Get Route
    app.get("/api/burgers", function (req, res) {
        db.Burger.findAll({
            order: [
                ['burger_name', 'ASC']
            ]
        }).then(function (data) {
            res.json(data);
            console.log(data);
        });
    });
    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured
        }).then(function (data) {
            res.json({ bid: data.bid });
        });
    });

    app.put("/api/burgers/:bid", function (req, res) {
        db.Burger.update({
            devoured: req.body.devoured,
            cust_name: req.body.cust_name
        }, {
            where: {
                bid: req.params.bid
            }
        }).then(function (data) {
            if (data.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
              } else {
                res.status(200).end();
              }
        });

    });
};
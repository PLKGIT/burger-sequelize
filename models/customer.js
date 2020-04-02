// ******************************************************************************************************
// customers.js [Models]
// ******************************************************************************************************
"use strict";
module.exports = function (sequelize, Sequelize) {
    var Customer = sequelize.define("Customer", {
        cid: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        cust_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: 3,
                    msg: "Name must be at least 3 characters in length"
                }
            }
        },
        cust_email: {
            type: Sequelize.STRING(50),
            allowNull: false,
             validate: {
                len: {
                    args: [6, 128],
                    msg: "Email address must be between 6 and 128 characters in length"
                },
                isEmail: {
                    msg: "Email address must be valid"
                }
            }
        }
    }, { timestamps: false });
    Customer.associate = function (db) {
        db.Customer.hasMany(db.Burger, {
            foreignKey: 'cid'
        });
    };
    return Customer;
};
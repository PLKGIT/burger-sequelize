// ******************************************************************************************************
// burger.js [Models]
// ******************************************************************************************************
"use strict";
module.exports = function (sequelize, Sequelize) {
  var Burger = sequelize.define("Burger", {
    bid: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    burger_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
          len: {
              args: 3,
              msg: "Name must be at least 3 characters in length"
          }
      }
    },
    cid: {
      type: Sequelize.INTEGER(11)
    },
    cust_name: {
      type: Sequelize.STRING(50)
  },
    devoured: {
      type: Sequelize.TINYINT(1),
      allowNull: false,
      defaultValue:0
    }
  }, { timestamps: false });

  Burger.associate = function (db) {
    db.Burger.belongsTo(db.Customer, { 
      foreignKey: 'cid', 
      onDelete: "CASCADE"
    });
  };
  return Burger;
};
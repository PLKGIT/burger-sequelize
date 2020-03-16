// ******************************************************************************************************
// burger.js [Models]
// ******************************************************************************************************

module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    burger_name: DataTypes.STRING,
    devoured: DataTypes.TINYINT
  });
  return Burger;
};
module.exports = Burger;


// Variable = Burger --> convenion is to capitalize the variable and export
// Table = Burger (see line 6 - sequelize will add an "s" unless you specify 'freezeTableName:true' after last column name)
// Sequelize will create an 'id' column, so I do not need to specify that
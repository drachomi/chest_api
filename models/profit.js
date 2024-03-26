const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./user");



module.exports = (sequelize) =>
  sequelize.define("profit", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    profit: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: userModel(sequelize),
          key: "id",
        },
      },
      date: {
        type: DataTypes.TEXT
      },
      
    balance: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    sort_date:{
      type: DataTypes.BIGINT
    }
      

  });

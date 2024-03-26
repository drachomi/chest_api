const { Sequelize, DataTypes } = require("sequelize");

const propertyModel = require("./property");
const userModel = require("./user");
const orderModel = require("./order");

module.exports = (sequelize) =>
  sequelize.define("firstfundings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: userModel(sequelize),
        key: "id",
      },
    }
  });

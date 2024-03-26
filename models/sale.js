const { Sequelize, DataTypes } = require("sequelize");

const propertyModel = require("./property");
const userModel = require("./user");
const orderModel = require("./order");

module.exports = (sequelize) =>
  sequelize.define("sale", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    property:{
      type: DataTypes.TEXT
          },
    propertyId: {
      type: DataTypes.UUID,
      references: {
        model: propertyModel(sequelize),
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: userModel(sequelize),
        key: "id",
      },
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: orderModel(sequelize),
        key: "id",
      },
    },

  });

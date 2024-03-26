const { Sequelize, DataTypes } = require("sequelize");

const propertyModel = require("./property");
const userModel = require("./user");
const orderModel = require("./order");
const companyModel = require("./company");

module.exports = (sequelize) =>
  sequelize.define("transaction", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    narration:{
      type: DataTypes.TEXT,
    },
    type:{
      type: DataTypes.TEXT,
    },
    status:{
      type: DataTypes.TEXT,
    },
    txid:{
      type: DataTypes.TEXT,
    },
    category:{
      type: DataTypes.TEXT,
    },
    companyId: {
      type: DataTypes.UUID,
      references: {
        model: companyModel(sequelize),
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: userModel(sequelize),
        key: "id",
      },
    },

  });

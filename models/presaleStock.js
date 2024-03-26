const { Sequelize, DataTypes } = require("sequelize");

const propertyModel = require("./property");
const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("presale_stock", {
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
    property: {
      type: DataTypes.TEXT
    },
    hold_off: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
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
    }
  });

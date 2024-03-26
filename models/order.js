const { Sequelize, DataTypes } = require("sequelize");

const propertyModel = require("./property");
const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("order", {
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
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    type: {
      type: Sequelize.ENUM('buy', 'sell', 'p2p-buy', 'p2p-sell'),
      defaultValue: 'buy',
    },
    status: {
      type: Sequelize.ENUM('active', 'cancelled', 'fulfilled'),
      defaultValue: 'active',
    },
    property: {
      type: DataTypes.TEXT
    },
    username: {
      type: DataTypes.TEXT
    },
    ppu:{
      type: DataTypes.DOUBLE
    }

  });

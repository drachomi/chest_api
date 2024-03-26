const { Sequelize, DataTypes } = require("sequelize");

const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("wallet", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    nuban:{
      type: DataTypes.TEXT,
    },
    nubanBank:{
      type: DataTypes.TEXT,
    },
    accountName:{
      type: DataTypes.TEXT,
    },
    service:{
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: userModel(sequelize),
        key: "id",
      }
    },
    flwCardToken: {
      type: DataTypes.TEXT
    }
  });

const { Sequelize, DataTypes } = require("sequelize");

const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("bank", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    bank: {
      type: DataTypes.TEXT,

    },
    nuban:{
      type: DataTypes.TEXT,
    },
    accountName:{
      type: DataTypes.TEXT,
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

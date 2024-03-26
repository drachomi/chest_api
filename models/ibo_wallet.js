const { Sequelize, DataTypes } = require("sequelize");
const companyModel = require("./company");

module.exports = (sequelize) =>
  sequelize.define("ibo_wallet", {
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
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: companyModel(sequelize),
        key: "id",
      },
    }
  });

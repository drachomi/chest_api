const { Sequelize, DataTypes } = require("sequelize");

const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("investor", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firmName: {
      type: DataTypes.TEXT,
    },
    name:{
      type: DataTypes.TEXT,
    },
    email:{
      type: DataTypes.TEXT,
    },
    size:{
      type: DataTypes.TEXT,
    },
    phoneNumber:{
      type: DataTypes.TEXT
    },
    companyId:{
      type: DataTypes.UUID,
    }
  });

const { Sequelize, DataTypes } = require("sequelize");

const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("company", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.TEXT,
    },
    address:{
      type: DataTypes.TEXT,
    },
    country:{
      type: DataTypes.TEXT,
    },
    size:{
      type: DataTypes.TEXT,
    }  
  });

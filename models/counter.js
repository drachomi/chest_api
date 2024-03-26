const { Sequelize, DataTypes } = require("sequelize");

const propertyModel = require("./property");
const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("counter", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    count: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.TEXT
    },
    sort_date:{
        type: DataTypes.BIGINT
      }
   
  });

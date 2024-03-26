const { Sequelize, DataTypes } = require("sequelize");

const propertyModel = require("./property");
const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("price", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
    date: {
      type: DataTypes.TEXT
    },
    sort_date:{
      type: DataTypes.BIGINT
    }
    

  });

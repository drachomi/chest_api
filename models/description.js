const { Sequelize, DataTypes } = require("sequelize");
const propertyModel = require("./property");

module.exports = (sequelize) =>
  sequelize.define("description", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: propertyModel(sequelize),
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT
    },

    

  });

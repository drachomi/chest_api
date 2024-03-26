const { Sequelize, DataTypes } = require("sequelize");


module.exports = (sequelize) =>
  sequelize.define("email", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
    },
    

  });

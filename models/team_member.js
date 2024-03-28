const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("member", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
    },
    companyId: {
      type: DataTypes.UUID,
    },
    role: {
      type: DataTypes.TEXT,
    }
    });

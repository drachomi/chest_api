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
    cac:{
      type: DataTypes.TEXT,
    },
    directorsGovId:{
      type: DataTypes.TEXT,
    },
    tin:{
      type: DataTypes.TEXT,
    },
    taxDocument:{
      type: DataTypes.TEXT,
    },
    directorsBvn:{
      type: DataTypes.TEXT,
    },
    scuml:{
      type: DataTypes.TEXT,
    },
    bankVerified:{
      type: DataTypes.BOOLEAN,
    },
    isVerified:{
      type: DataTypes.BOOLEAN,
    },
    approvalStatus:{
      type:DataTypes.TEXT
    },
    mono_id:{
      type:DataTypes.TEXT
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

const { Sequelize, DataTypes } = require("sequelize");

const orderModel = require("./order");
const userModel = require("./user");
// const alertModel = require("./alert");

module.exports = (sequelize) => sequelize.define("notif_topics", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  topic_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userids: {
    type: DataTypes.ARRAY(DataTypes.UUID),
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "active",
  },
});

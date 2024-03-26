const { Sequelize, DataTypes } = require("sequelize");

const userModel = require("./user");
// id,userId,amount,frequency['weekly','monthly'],status['charged','retry'],next[date],every[weekly:anyDayofTheWeek,monthly:specifiedDateOfTheMonth]
module.exports = (sequelize) => sequelize.define("plan", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: userModel(sequelize),
      key: "id",
    },
  },
  status: {
    type: Sequelize.TEXT,
    defaultValue: "new",
  },
  next: {
    type: Sequelize.TEXT,
  },
  every: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    references: {
      model: userModel(sequelize),
      key: "email",
    },
  },
  flwCardToken: {
    type: DataTypes.TEXT,
  },
  pskCardToken: {
    type: DataTypes.TEXT,
  },
  roundsDone: {
    type: DataTypes.INTEGER,
  },
  roundsRemaining: {
    type: DataTypes.INTEGER,
  },
  goal_amount: {
    type: DataTypes.TEXT,
  },
  duration: {
    type: DataTypes.TEXT,
  },
  cardLast4: {
    type: DataTypes.TEXT,
  },
});

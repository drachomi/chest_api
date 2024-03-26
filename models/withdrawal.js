const { Sequelize, DataTypes } = require("sequelize");

const userModel = require("./user");

module.exports = (sequelize) =>
  sequelize.define("withdrawal", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    status:{
      type: DataTypes.TEXT,
    },
    bank:{
      type: DataTypes.TEXT,
    },
    bankCode:{
      type: DataTypes.STRING, // NIBBS Code for the bank
    },
    nuban:{
      type: DataTypes.TEXT,
    },
    username:{
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: userModel(sequelize),
        key: "id",
      }
    },
      txid:{
        type: DataTypes.TEXT
      },
    walletProvider: {
      type: DataTypes.STRING, // Flw, Paystack, Wallet.ng, Wema Bank ...
    },
    walletRef:{
      type: DataTypes.STRING, // This would contain the wallet transaction ref returned by the wallet service
    },
    walletStatus:{
      type: DataTypes.STRING, // pending|success|failed
      defaultValue: "pending",
    },
  });

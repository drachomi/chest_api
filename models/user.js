const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.TEXT,
    },
    lastName: {
      type: DataTypes.TEXT,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    nok: {
      type: DataTypes.TEXT,
    },
    bvn: {
      type: DataTypes.STRING,
      unique: true,
    },
    bvn_verified:{
      type: DataTypes.BOOLEAN,
      default:false
    },
    idNumber: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    govid:{
      type: DataTypes.TEXT,
    },
    govid_verified:{
      type: DataTypes.BOOLEAN,
      default:false
    },
    verified:{
      type:DataTypes.BOOLEAN,
      default:false
    },
    isAdmin:{
      type:DataTypes.BOOLEAN,
      default:false
    },
    kyc:{
      type:DataTypes.STRING,
      default:'new'
    },
    pin:{
      type: DataTypes.TEXT,
    },
    referer:{
      type: DataTypes.TEXT,
    },
    transacted:{
      type:DataTypes.BOOLEAN,
      default:false
    },
    isIbo:{
      type:DataTypes.BOOLEAN
    },
    pstack_customer_code:{
      type:DataTypes.TEXT
    },
    gender:{
      type:DataTypes.ENUM('male','female')
    },
    profile_picture:{
      type: DataTypes.TEXT
    },
    fireBaseRegToken:{
      type: DataTypes.TEXT
    },
    next_sell_date:{
      type: DataTypes.TEXT
    },
    govidType:{
      type: DataTypes.TEXT
    },
    country:{
      type: DataTypes.TEXT
    }
  });

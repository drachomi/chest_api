const { Sequelize, DataTypes } = require("sequelize");
const companyModel = require("./company");
const { PROPERTY_APPROVAL_STATUS } = require("../utils/constants");

module.exports = (sequelize) => sequelize.define("property", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  marketCap: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
  },
  volume: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
  },
  increasePercent: {
    type: DataTypes.DOUBLE,
    defaultValue: 0.0,
  },
  sold: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  units: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  percentIncrease: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  monthIncrease: {
    type: DataTypes.TEXT,
  },
  yearIncrease: {
    type: DataTypes.TEXT,
  },
  isPresell: {
    type: DataTypes.BOOLEAN,
  },
  approvalStatus: {
    type: DataTypes.TEXT,
    default: PROPERTY_APPROVAL_STATUS.DRAFT,
  },
  presellExpiresAt: {
    type: DataTypes.TEXT,
  },
  presellStartsAt: {
    type: DataTypes.TEXT,
  },
  presellMinUnit: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  companyId: {
    type: DataTypes.UUID,
    references: {
      model: companyModel(sequelize),
      key: "id",
    },
  },
  country: {
    type: DataTypes.TEXT,
  },
  state: {
    type: DataTypes.TEXT,
  },
  lga: {
    type: DataTypes.TEXT,
  },
  town: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.TEXT,
  },
  estate: {
    type: DataTypes.TEXT,
  },
  street_name: {
    type: DataTypes.TEXT,
  },
  house_number: {
    type: DataTypes.TEXT,
  },
  unit_number: {
    type: DataTypes.TEXT,
  },
});

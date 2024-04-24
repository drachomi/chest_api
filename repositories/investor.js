// const {
//   models: { user },
// } = global.db;

const { Sequelize, DataTypes } = require("sequelize");
const { investor } = require("../models");
// const cribstockDatasource = require("../datasources/cribstock");

module.exports = {
  async create(data) {
    let coy = investor.build(data);
    coy = await coy.save();
    coy = await this.findById(coy.id);
    return coy;
  },
  async find(filter) {
    const coy = await investor.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return coy;
  },

  async findById(id, filter) {
    const coy = await investor.findOne({
      where: { id, ...filter },
    });
    return coy;
  }
 
  
};

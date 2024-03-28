// const {
//   models: { user },
// } = global.db;

const { Sequelize, DataTypes } = require("sequelize");
const { company } = require("../models");
const cribstockDatasource = require("../datasources/cribstock");

module.exports = {
  async create(data) {
    let coy = company.build(data);
    coy = await coy.save();
    coy = await this.findById(coy.id);
    return coy;
  },
  async find(filter) {
    const coy = await company.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return coy;
  },

  async findById(id, filter) {
    const coy = await company.findOne({
      where: { id, ...filter },
    });
    return coy;
  }
 
  
};

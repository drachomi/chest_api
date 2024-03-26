const stock = require("../models")['stock']
const { Sequelize, DataTypes } = require("sequelize");


module.exports = {
  async create(data) {
    let stoc = stock.build(data);
    stoc = await stoc.save();
    return stoc;
  },
  async findAll(filter) {
    const stoc = await stock.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return stoc;
  },  
  async CountStockOwners(filter) {
    const stoc = await stock.findAll({
      where: filter,
      attributes:  [[Sequelize.literal('COUNT(DISTINCT("userId"))'), 'count']] ,
      
    });
    return stoc;
  },
  async updateById(id, data, filter) {
    let stoc = await stock.update(data, {
      where: { id, ...filter },
    });
    stoc = await this.findById(id, filter);
    return stoc;
  },
  async findById(id, filter) {
    const stoc = await stock.findOne({
      where: { id, ...filter },
    });
    return stoc;
  },
  async deleteById(id, filter) {
    const property = await stock.destroy({
      where: { id, ...filter },
    });
    return property;
  },
  async findByPropId(propertyId, filter) {
    const stoc = await stock.findOne({
      where: { propertyId, ...filter },
    });
    return stoc;
  },
  async findByUserId(userId, filter) {
    const stoc = await stock.findAll({
      where: { userId, ...filter },
    });
    return stoc;
  },
  async findOne(filter) {
    const stoc = await stock.findOne({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return stoc;
  }
};

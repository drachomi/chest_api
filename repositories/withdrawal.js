const withdrawal = require("../models")['withdrawal']
const user = require("../models")['user']
const ibo_withdrawal = require("../models")['ibo_withdrawal']
const { Sequelize, DataTypes } = require("sequelize");

module.exports = {
  async create(data) {
    let trans = withdrawal.build(data);
    trans = await trans.save();
    return trans;
  },
  async createIBO(data) {
    let trans = ibo_withdrawal.build(data);
    trans = await trans.save();
    return trans;
  },
  async findAll(filter) {
    const trans = await withdrawal.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return trans;
  },
  async findById(id, filter) {
    const trans = await withdrawal.findOne({
      where: { id, ...filter },
    });
    return trans;
  },
  async findByIdUser(id, filter) {
    withdrawal.hasOne(user, { sourceKey: 'userId', foreignKey: 'id'})
    const trans = await withdrawal.findOne({
      where: { id, ...filter },
      include: [{model: user}]
    });
    return trans;
  },
  async findAllIbo(filter) {
    const trans = await ibo_withdrawal.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return trans;
  },
  async updateById(id, data, filter) {
    
    let trans = await withdrawal.update(data, {
      where: { id, ...filter },
    }); 
    return trans;
  },
  async updateByIdIBO(id, data, filter) {
    
    let trans = await ibo_withdrawal.update(data, {
      where: { id, ...filter },
    }); 
    return trans;
  },
  async sumColumn(filter) {
    const sum = await withdrawal.findAll({
      where: filter,
      attributes:[ [Sequelize.fn('sum', Sequelize.col('amount')), 'total']]
    });
    return sum;
  },
  
};

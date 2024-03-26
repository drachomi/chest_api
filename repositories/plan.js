const { Sequelize, DataTypes } = require("sequelize");
const { plan } = require("../models");

module.exports = {
  async create(data) {
    let pln = plan.build(data);
    pln = await pln.save();
    pln = await this.findById(pln.id);
    return pln;
  },
  async findAll(filter) {
    const planr = await plan.findAll({
      where: filter,
      attributes: { exclude: ["password"] },
      order: [["updatedAt", "DESC"]],
    });
    return planr;
  },
  async updateById(id, data, filter) {
    // console.log(id);
    try {
      let planr = await plan.update(data, { where: { id, ...filter } });
      // console.log(usr);
      planr = await this.findById(id, filter);
      return planr;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async updateByEmail(email, data, filter) {
    // console.log(email);
    try {
      const plnr = await plan.update(data, { where: { email, ...filter } });
      // console.log({usr});
      planr = await this.findByEmail(email, filter);
      return plnr;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async findById(id, filter) {
    const plnr = await plan.findOne({
      where: { id, ...filter },
    });
    return plnr;
  },
  async findByEmail(email, filter) {
    const plnr = await plan.findOne({
      where: { email, ...filter },
    });
    return plnr;
  },
  async find(filter) {
    const plnr = await plan.findOne({
      where: filter,
    });
    return plnr;
  },
  async deleteById(id, filter) {
    const plnr = await plan.destroy({
      where: { id, ...filter },
    });
    return plnr;
  },
  async count(filter) {
    const count = await plan.count({
      where: { ...filter },
    });
    return count;
  },
};

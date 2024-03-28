// const {
//   models: { user },
// } = global.db;

const { Sequelize, DataTypes } = require("sequelize");
const { user } = require("../models");
const cribstockDatasource = require("../datasources/cribstock");

module.exports = {
  async create(data) {
    let usr = user.build(data);
    usr = await usr.save();
    usr = await this.findById(usr.id);
    return usr;
  },
  async findAll(filter) {
    const usrs = await user.findAll({
      where: filter,
      attributes: { exclude: ["password"] },
      order: [["updatedAt", "DESC"]],
    });
    return usrs;
  },
  async countReferers(filter) {
    const usrs = await user.findAll({
      where: filter,
      attributes: [[Sequelize.literal("COUNT(DISTINCT(referer))"), "countOfReferer"]],
    });
    return usrs;
  },
  async findAllUsernames(filter) {
    const usrs = await user.findAll({
      where: filter,
      attributes: ["username"],
      order: [["updatedAt", "DESC"]],
    });
    return usrs;
  },
  async findAllEmails(filter) {
    const usrs = await user.findAll({
      where: filter,
      attributes: ["email"],
      order: [["updatedAt", "DESC"]],
    });
    return usrs;
  },
  async updateById(id, data, filter) {
    // console.log(id);
    try {
      let usr = await user.update(data, { where: { id, ...filter } });
      // console.log(usr);
      usr = await this.findById(id, filter);
      return usr;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async updateByEmail(email, data, filter) {
    // console.log(email);
    try {
      let usr = await user.update(data, { where: { email, ...filter } });
      // console.log({usr});
      usr = await this.findByEmail(email, filter);
      return usr;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async findById(id, filter) {
    const usr = await user.findOne({
      where: { id, ...filter },
    });
    return usr;
  },
  async findByEmail(email, filter) {
    const usr = await user.findOne({
      where: { email, ...filter },
    });
    return usr;
  },
  async find(filter) {
    const usr = await user.findOne({
      where: filter,
    });
    return usr;
  },
  async deleteById(id, filter) {
    const property = await user.destroy({
      where: { id, ...filter },
    });
    return property;
  },
  async count(filter) {
    const count = await user.count({
      where: { ...filter },
    });
    return count;
  },
};

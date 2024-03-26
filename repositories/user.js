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
  async findAllFirebaseToken(filter) {
    // const [results, metadata] = await cribstockDatasource.query(
    //  `SELECT "fireBaseRegToken" FROM "users" AS "user" WHERE "user"."id" IN (select "userids" from notif_topics where "topic_name" = '${groupName}') ORDER BY "notif_topics"."updatedAt" DESC`
    // );
    // console.log({ results });
    // [results, metadata] = await Sequelize.query("SELECT "fireBaseRegToken" FROM "users" AS "user" WHERE "user"."id" IN ('580ba06a-2945-479b-b290-9a11fb83dae6', 'ffd00592-3a06-4f18-9069-1ecb5b8e668b') ORDER BY "user"."updatedAt" DESC;");
    // Results will be an empty array and metadata will contain the number of affected rows.
    const usrs = await user.findAll({
      where: { ...filter },
      attributes: ["fireBaseRegToken"],
      order: [["updatedAt", "DESC"]],
    });
    return JSON.stringify(usrs);
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

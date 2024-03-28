// const {
//   models: { user },
// } = global.db;

const { Sequelize, DataTypes } = require("sequelize");
const { member } = require("../models");
const cribstockDatasource = require("../datasources/cribstock");

module.exports = {
  async create(data) {
    let team_member = member.build(data);
    team_member = await team_member.save();
    team_member = await this.findById(team_member.id);
    return team_member;
  },
  async find(filter) {
    const team_member = await member.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return team_member;
  },

  async findById(id, filter) {
    const coy = await member.findOne({
      where: { id, ...filter },
    });
    return coy;
  }
  
};

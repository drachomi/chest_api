const notif = require("../models").notif_topics;
const { Op, Sequelize } = require("sequelize");

module.exports = {
  async create(data) {
    let noti = notif.build(data);
    noti = await noti.save();
    return noti;
  },
  async findAll(filter) {
    const noti = await notif.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
      raw: true,
    });
    return noti;
  },
  async updateById(id, data, filter) {
    let noti = await notif.update(data, {
      where: { id, ...filter },
    });
    noti = await this.findById(id, filter);
    return noti;
  },
  async updateUseridsByTopicName(userid, filter) {
    const { topic_name } = filter;
    const notiCheck = await this.findByTopicName(topic_name, filter);
    console.log({ userid, filter, notiCheck });
    if (notiCheck.userids.indexOf(userid) >= 0) return true;

    userid = String(userid);
    let noti = await notif.update(
      { userids: Sequelize.fn("array_append", Sequelize.col("userids"), userid) },
      {
        where: { ...filter },
      }
    );
    noti = await this.findByTopicName(topic_name, filter);
    return noti;
  },
  async updateMany(data, filter) {
    const noti = await notif.update(data, {
      where: { ...filter },
    });
    console.log({ noti });
    if (!noti) return false;
    return true;
  },
  async findById(id, filter) {
    const noti = await notif.findOne({
      where: { id, ...filter },
    });
    return noti;
  },
  async findByTopicName(topic_name, filter) {
    const noti = await notif.findOne({
      where: { topic_name, ...filter },
    });
    return noti;
  },
  async deleteById(id, filter) {
    const noti = await notif.destroy({
      where: { id, ...filter },
    });
    return noti;
  },
  async createMany(data) {
    const noti = await notif.bulkCreate(data);
    return noti;
  },
};

const order = require("../models")['order']


module.exports = {
  async create(data) {
    let ordr = order.build(data);
    ordr = await ordr.save();
    return ordr;
  },
  async findAll(filter) {
    const ordrs = await order.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return ordrs;
  },
  async updateById(id, data, filter) {
    let ordr = await order.update(data, {
      where: { id, ...filter },
    });
    ordr = await this.findById(id, filter);
    return ordr;
  },
  async findById(id, filter) {
    const ordr = await order.findOne({
      where: { id, ...filter },
    });
    return ordr;
  },
  async deleteById(id, filter) {
    const ordr = await order.destroy({
      where: { id, ...filter },
    });
    return ordr;
  },
};

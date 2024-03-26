const { property } = require("../models");
const { description } = require("../models");

module.exports = {
  async createDescription(data) {
    console.log(data);
    let prop = description.build(data);
    prop = await prop.save();
    return prop;
  },
  async create(data) {
    let prop = property.build(data);
    prop = await prop.save();
    return prop;
  },
  async getDescription(propertyId) {
    const prop = await description.findOne({ where: { propertyId } });
    return prop;
  },
  async findAll(filter, limit, offset) {
    const prop = await property.findAll({
      order: [["updatedAt", "DESC"]],
      limit,
      offset,
      where: { ...filter },
    });
    return prop;
  },
  async updateById(id, data, filter) {
    let prop = await property.update(data, {
      where: { id, ...filter },
    });
    prop = await this.findById(id, filter);
    return prop;
  },
  async findById(id, filter) {
    const prop = await property.findOne({
      where: { id, ...filter },
    });
    return prop;
  },
  async deleteById(id, filter) {
    const prop = await property.destroy({
      where: { id, ...filter },
    });
    return prop;
  },
};

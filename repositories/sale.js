const sale = require("../models")['sale']


module.exports = {
  async create(data) {
    let sal = sale.build(data);
    sal = await sal.save();
    return sal;
  },
  async findAll(filter) {
    const sal = await sale.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return sal;
  },
  async updateById(id, data, filter) {
    let sal = await sale.update(data, {
      where: { id, ...filter },
    });
    sal = await this.findById(id, filter);
    return sal;
  },
  async findById(id, filter) {
    const sal = await sale.findOne({
      where: { id, ...filter },
    });
    return sal;
  },
  async deleteById(id, filter) {
    const sal = await sale.destroy({
      where: { id, ...filter },
    });
    return sal;
  },
  // async findByDate(id, filter) {
  //   const sales = await Sale.findAll({
  //     where: filter,
  //     order: [["updatedAt", "DESC"]],
  //   })
  //   return sales;
  // },
};

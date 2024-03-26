const profit = require("../models")['profit']


module.exports = {
  async create(data) {
    let bal = profit.build(data);
    bal = await bal.save();
    return bal;
  },
  async find(filter) {
    const prof = await profit.findOne({
      where: filter,
    });
    return prof;
  },
  async findAll(filter) {
    const bal = await profit.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return bal;
  },
  async findOldestBalance(userId,filter){
    const bal = await profit.findAll({
      limit:1,
      where:{userId, ...filter},
      order: [ [ 'createdAt', 'ASC' ]]

    });

    return bal;
  },
  async findByDate(filter) {
    const bal = await profit.findOne({
     where:filter
    });
    return bal;
  },
};

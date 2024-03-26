const firstfundings = require("../models")['firstfundings']
const { Sequelize, DataTypes } = require("sequelize");


module.exports = {
  async create(data) {
    let fund = firstfundings.build(data);
    //console.log({fund})
    fund = await fund.save();
    return fund;
  },
  async findAll(filter,otherFilterObject) {
    const fund = await firstfundings.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]]
    });
    return fund;
  },
  async sumColumn(filter) {
    const sum = await firstfundings.findAll({
      where: filter,
      attributes:[ [Sequelize.fn('sum', Sequelize.col('amount')), 'amount']]
    });
    return sum;
  },
  async updateById(id, data, filter) {
    
    let fund = await firstfundings.update(data, {
      where: { id, ...filter },
    });

     
    return fund;
  },

 

  
};

const transaction = require("../models")['transaction']


module.exports = {
  async create(data) {
    let trans = transaction.build(data);
    trans = await trans.save();
    return trans;
  },
  async findAll(filter) {
    const trans = await transaction.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return trans;
  },
  async updateByUserId(userId, data, filter) {
    
    let trans = await transaction.update(data, {
      where: { userId, ...filter },
    });

     
    return trans;
  },

  async findByTxId(txId,filter){
    const wall = await transaction.findOne({
      where: { txid:txId, ...filter },
    });
    return wall;
  },

  
};

const bank = require("../models")['bank']


module.exports = {
  async create(data) {
    //console.log("entered save");

    try{
      let trans = bank.build(data);
      trans = await trans.save();

      return trans;
    }catch(err){
      console.log(err);
    }
   
  },
  async findAll(filter) {
    const trans = await bank.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return trans;
  },
  async updateByUserId(userId, data, filter) {
    
    let trans = await bank.update(data, {
      where: { userId, ...filter },
    });

     
    return trans;
  },

  
};

const counter = require("../models")['counter']


module.exports = {
  async create(data) {
    //console.log("entered save");

    try{
      let countr = counter.build(data);
      countr = await countr.save();
      console.log({countr})

      return countr;
    }catch(err){
      console.log(err);
    }
   
  },
  async findAll(filter) {
    const countr = await counter.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return countr;
  },
  async updateByAdminId(userId, data, filter) {
    
    let countr = await counter.update(data, {
      where: { userId, ...filter },
    });
    return countr;
  },
  async updateBycounterId(counterId, data, filter) {
    
    let countr = await counter.update(data, {
      where: { id:counterId, ...filter },
    });
    return countr;
  },
  async findById(id, filter) {
    const countr = await counter.findOne({
      where: { id, ...filter }
    });
    return countr;
  },
  async findByAdminId(id, filter) {
    const countr = await counter.findOne({
      where: { userId:id, ...filter }
    });
    return countr;
  },
  async findBycounterId(counterId, filter) {
    const countr = await counter.findOne({
      where: { id:counterId, ...filter }
    });
    return countr;
  }
  
};

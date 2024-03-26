const wallet = require("../models")['wallet'];
const ibo_wallet = require("../models")['ibo_wallet']

module.exports = {
  async create(data) {
    let wall = wallet.build(data);
    wall = await wall.save();
    return wall;
  },
  async findAll(filter) {
    const wall = await wallet.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return wall;
  },
  async updateByUserId(userId, data, filter) {
    //console.log(userId);
    console.log("first balnce: ");
    console.log(data);
    let wall = await wallet.update(data, {
      where: { userId, ...filter },
    });

     
    return wall;
  },

  async updateUsersBalance(userId,amount,positive,filter){
    let wall = await wallet.findOne({
      where: { userId, ...filter },
    });

    let balance =positive?wall.balance + amount : wall.balance - amount;
    wall = await wallet.update({balance:balance}, {
      where: { userId, ...filter },
    });


  },
  
  
  async findByUserId(userId, filter) {
    const wall = await wallet.findOne({
      where: { userId, ...filter },
    });
    return wall;
  },

  async findByNuban(nuban,filter){
    const wall = await wallet.findOne({
      where: { nuban, ...filter },
    });
    return wall;
  },

  async findByEmail(email,filter){
    const wall = await wallet.findOne({
      where: { email, ...filter },
    });
    return wall;
  },

  async createIBO(data) {
    let wall = ibo_wallet.build(data);
    wall = await wall.save();
    return wall;
  },
  async updateByCompanyId(companyId, data, filter) {
    let wall = await ibo_wallet.update(data, {
      where: { companyId, ...filter },
    });

     
    return wall;
  },
  async findByCompanyId(companyId, filter){
    const wall = await ibo_wallet.findOne({
      where: { companyId, ...filter },
    });
    return wall;
  }


};

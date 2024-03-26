const email = require("../models")['email']

module.exports = {
  async create(data) {
    let mail = email.build(data);
    mail = await mail.save();
    return mail;
  },
  async findAll(filter) {
    const mail = await email.findAll({
      where: filter,
      order: [["updatedAt", "DESC"]],
    });
    return mail;
  },
  async findByEmail(mail){
    const em = await email.findOne({
      where: { email : mail }
    });

    return em;
  }
};

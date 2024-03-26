const price = require("../models")['price']


module.exports = {
  async create(data) {
    let pric = price.build(data);
    pric = await pric.save();
    return pric;
  },
  async findAll(filter) {
    const prics = await price.findAll({
      where: filter,
      price: [["updatedAt", "DESC"]],
    });
    return prics;
  },
  async findByPropId(propertyId, filter) {
    const prics = await price.findOne({
      where: { propertyId, ...filter },
    });
    return prics;
  },
  async findByDate(propertyId,date, filter) {
    const prics = await price.findOne({
      query: {
        $and: [
           {
            date: date,
            propertyId: propertyId
           },
         ],
       },filter
    });
    return prics;
  },
  async findAllByPropId(propertyId, filter) {
    const prics = await price.findAll({
      where: { propertyId, ...filter },
      order: [['sort_date', 'ASC']]
    });
    return prics;
  },
  async findAllByDate(date, filter) {
    const prics = await price.findAll({
      where: { date, ...filter },
    });
    return prics;
  },
  async findOldestPrice(propertyId,filter){
    const prics = await price.findAll({
      limit:1,
      where:{propertyId, ...filter},
      order: [ [ 'createdAt', 'ASC' ]]

    });

    return prics;
  }
};

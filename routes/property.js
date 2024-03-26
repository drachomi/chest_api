const express = require("express");

const errorHandler = require("../handlers/error");
const {isAdmin,user} = require("../middlewares/auth");

const propertyRepository = require("../repositories/property");
const interest = require("../services/interestService");
const salesRepo = require("../repositories/sale");
const stockService = require("../services/stockService");
const priceRepo = require("../repositories/prices");
const {epochWithoutTime} = require("../utils/date")

const router = express.Router();
const moment = require("moment");



/* POST property. */
router.post("/", user,isAdmin, async (req, res) => {
  try {
    let reqBody = req.body;
    const images = req.body.images;
    reqBody.image = JSON.stringify(images);
    req.body.volume = 0;
    const data = await propertyRepository.create(req.body);
    const date  = moment().format('L');
    //let date = Math.floor(new Date().getTime()/1000)
    //date = epochWithoutTime(date) 
     await  priceRepo.create({
      propertyId:data.id,
      price : data.price,
      date:date
      });
    

    data.dataValues.image = JSON.parse(data.image);

    let obj = {
      description : JSON.stringify(req.body.description),
      propertyId:data.id
    }
    
     await propertyRepository.createDescription(obj);

    res.status(201).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET properties listing. */
router.get("/", async (req, res) => {
  const condition = {};
  const limit = req.query.size ? +req.query.size : 3;
  const offset = req.query.page ? req.query.page * limit : 0;
  try {
    const data = await propertyRepository.findAll(limit,offset);
    let props = [];
    let i;

    for(i in data){
      let p = data[i];
      p.dataValues.image = JSON.parse(p.image);
      props.push(p);

    }
    res.status(200).json({ props });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* PATCH property. */
router.patch("/:id", isAdmin, async (req, res) => {
  try {
    const data = await propertyRepository.updateById(req.params.id, req.body);
    res.status(201).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET property. */
router.get("/:id", user, async (req, res) => {
  try {
    const data = await propertyRepository.findById(req.params.id);
    if(!data){
      errorHandler({error:"Property does not exist"}, res);

    }
    data.dataValues.monthIncrease = await interest.increasePercent(data.id,30,data.price);
    data.dataValues.yearIncrease = await interest.increasePercent(data.id,365,data.price);
    data.dataValues.volume = await stockService.calculateVolume(data.id);
    data.dataValues.image = JSON.parse(data.image);

  
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* DELETE property. */
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const data = await propertyRepository.deleteById(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post("/priceinc",async(req,res)=>{
  console.log("entered here");
  const propId = req.body.propId;
  //const yes = await interest.updatePropertyInterest(propId,12);
  const  yes = true;

  if(yes){
    console.log(yes);
    return res.status(200).send({
      success:true
    })
  }
  
  return res.status(400).send({
    success:false
  })

  

});


router.get("/description/:id",user, async (req, res) => {
  try {
    const desc = await propertyRepository.getDescription(req.params.id);
    if(desc){
      //console.log(desc);
      let description = JSON.parse(desc.description);
     return res.status(201).json({ description });
    }

   return res.status(201).json({ desc });
  } catch (error) {
   return errorHandler(error, res);
  }
});


module.exports = router;

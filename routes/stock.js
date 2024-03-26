const express = require("express");

const errorHandler = require("../handlers/error");
const authMiddleWare = require("../middlewares/auth");

const stockRepository = require("../repositories/userstock");

const router = express.Router();
const interestService = require("../services/interestService");
const priceRepo = require("../repositories/prices");
const dateUt = require("../utils/date");
const propertyRepo = require("../repositories/property");
const profitRepo = require("../repositories/profit");
const moment = require("moment");
const {epochWithoutTime} = require("../utils/date")


/* GET stocks listing. */
router.get("/", authMiddleWare.user, async (req, res) => {
  try {
    const data = await stockRepository.findAll();
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET stock. */
router.get("/:id",authMiddleWare.user, async (req, res) => {
  try {
    const data = await stockRepository.findByUserId(req.params.id);
    const array = [];
    let i;


    for(i in data){
      console.log(data[i]);
      const today = await interestService.getTodaysPrice(data[i].propertyId);
      const property = await propertyRepo.findById(data[i].propertyId);
      let defaultIncrease = 0 ;
      let monthIncrease = await interestService.increasePercent(property.id,30,property.price);
      let yearIncrease = await interestService.increasePercent(property.id,365,property.price);

      if(monthIncrease === 0 || yearIncrease ===0){
        defaultIncrease = await interestService.defaultPercent(property.id,property.price);
      }

      data[i].dataValues.thirtyDays = (monthIncrease===0)?defaultIncrease: monthIncrease;
      data[i].dataValues.oneYear = (yearIncrease===0)?defaultIncrease: yearIncrease;
     
      data[i].dataValues.oneDay = await interestService.increasePercent(data[i].propertyId,1,today);
      data[i].dataValues.holding = data[i].price * data[i].quantity;
      data[i].dataValues.price = property.price;
      data[i].dataValues.marketCap = property.marketCap;
      data[i].dataValues.image = JSON.parse(property.image);


      array.push(data[i]);

      //console.log(data[i]);
    }

    res.status(200).json(array );
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post("/graph",authMiddleWare.user,async(req,res)=>{


  try{
    let prices = await priceRepo.findAllByPropId(req.body.propertyId);
    console.log({prices})
  
    let p = [];
  
    if(!prices){
      return res.status(400).send({success:false, messagae:"No data"});
  
    }
  
    let i;
    for(i in prices){
      let price = prices[i];
      p.push({price:price.price,date: price.sort_date});
    }
  
  return res.status(200).send(p);
  }catch(err){
    console.log(err);
    errorHandler(err, res);

  }


});

router.post("/balance",authMiddleWare.user,async(req,res)=>{
  console.log({'user-balance':req.user})
  const id = req.user.id;
  //const id = req.body.id;

  try{
    console.log("stock balance body");
    const stocks = await stockRepository.findByUserId(id);
    console.log({'balanceStocks':stocks})
  
    if(!stocks){
      console.log("Stock does not exists");
      return res.status(400).send({
        message:"No data found "
      })
    }
  
    let i;
    let total = 0.0;
    
    for(i in stocks){
      const stock = stocks[i];
      console.log({ai:i})
      total = total + await interestService.calculatePrice(stock.propertyId, stock.quantity);
    }
  
  
  
    const d = moment().format('L');
    //let d = Math.floor(new Date().getTime()/1000)
    //d = String(epochWithoutTime(d))
    console.log("About to todays balance");
  
    const todaysBal = await profitRepo.findByDate({userId:id,date:d});
  
    let todaysGain = 0;
    let todaysBalance = 0
    console.log({todaysBal});
    if(todaysBal){
      todaysGain = todaysBal.profit;
      todaysBalance = todaysBal.balance;
      console.log("Todays balance is "+todaysBalance);
    }
  
  
    
  
   let increase_percent = (Number(todaysGain).toFixed(2)/Number(todaysBalance).toFixed(2)) * 100;
  
    console.log("increase is "+increase_percent);
  
    
  
    if(todaysGain == 0.0){
      increase = 0;
      increase_percent = 0;
    }
  
  
  
    return res.status(200).send({
      balance:total,
      increase : todaysGain,
      increase_percent : increase_percent
    })
  }catch(error){
    errorHandler(error, res);

  }
  
  

});

module.exports = router;

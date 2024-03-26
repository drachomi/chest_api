const express = require("express");

const errorHandler = require("../handlers/error");
const authMiddleWare = require("../middlewares/auth");

const salesRepo = require("../repositories/sale");
const userRepo = require("../repositories/user");
const router = express.Router();
const interestService = require("../services/interestService");
const priceRepo = require("../repositories/prices");
const dateUt = require("../utils/date");
const propertyRepo = require("../repositories/property");
const profitRepo = require("../repositories/profit");
const userstockRepo = require("../repositories/userstock");
const walletService = require("../services/WalletService");
const withdrawalRepo = require("../repositories/withdrawal");
const {paginate} = require("../utils/paginate")
const firstfundrepo = require("../repositories/firstfundings")
const firstfundings = require("../repositories/firstfundings");
const moment = require("moment");



/* GET stocks listing. */
router.get("/users", authMiddleWare.user, authMiddleWare.isAdmin,async (req, res) => {
  let {limit,page} = req.query
  try {
    const data = await userRepo.findAll();
    console.log(data.length)
    let paginatedData = (limit && page) ? paginate(data,limit,page) : data
    res.status(200).json({ data:paginatedData, success:true});
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET stock. */
router.get("/user/:id",authMiddleWare.user,authMiddleWare.isAdmin, async (req, res) => {
  try {
    const data = await userRepo.findById(req.params.id);
   
    res.status(200).json(data );
  } catch (error) {
    errorHandler(error, res);
  }
});

router.get("/property/:id",authMiddleWare.user,authMiddleWare.isAdmin, async (req, res) => {
  try {
    const data = await propertyRepo.findById(req.params.id);
   
    res.status(200).json(data );
  } catch (error) {
    errorHandler(error, res);
  }
});

router.get("/properties", authMiddleWare.user, authMiddleWare.isAdmin,async (req, res) => {
  try {
    const data = await propertyRepo.findAll();
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

router.get("/sales", authMiddleWare.user, authMiddleWare.isAdmin,async (req, res) => {
  try {
    const data = await salesRepo.findAll();
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post("/dividends",authMiddleWare.user,authMiddleWare.isAdmin, async(req,res)=>{
  let property = req.body.propertyId;
  let amount = req.body.amount;

  try{
    let stocks = await userstockRepo.findByPropId(property);

    for(let s in stocks){
      let st = stocks[s];
      let total = amount * st.quantity;
      await walletService.credit({id:st.userId, amount: total, narration: "Dividends paid for property "+st.property});

    }

    res.status(200).send({ success: true, message:"done" });


  }catch(err){
    console.log(err);
    res.status(400).send({ success: false, message:"An error occured" });

  }

  
});

router.get("/withdrawals",authMiddleWare.user,authMiddleWare.isAdmin,async(req,res)=>{
  try{
    let withdrawals = await withdrawalRepo.findAll();
    res.status(200).send({ success: true, message:"fetched",data:withdrawals });

  }catch(err){
    console.log(err);
    res.status(400).send({ success: false, message:"An error occured" });

  }

});

router.post("/update_withdrawal",authMiddleWare.user,authMiddleWare.isAdmin,async(req,res)=>{
    try{
      // let withdrawal = await withdrawalRepo.findById(req.body.id);
      // if(!withdrawal){
      //   res.status(400).send({ success: false, message:"An error occured" });
      // }
      await withdrawalRepo.updateById(req.body.id, {status:'processed'});
      res.status(200).send({ success: true, message:"done" });

    }catch(err){
      console.log(err);
      res.status(400).send({ success: false, message:"An error occured" });
    }
});




module.exports = router;

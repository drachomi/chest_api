const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");

const logHandler = require("../handlers/log");

const userRepository = require("../repositories/user");
let walletRepo = require("../repositories/wallet");
let userstockRepo = require("../repositories/userstock");

module.exports = {
  balance: async (req, res, next) => {
    let amount = req.body.amount;
    let withdrawal_percent_charges = 2.2/100
    let withdrawal_charges = amount * withdrawal_percent_charges 
    amount = req.path == '/withdraw'? amount + withdrawal_charges : amount
    //console.log({withdrawer:req.user.id,pathW:req.path});

    if(!amount){
      return res.status(400).send({ success: false, message: "Please input amount" });

    }

    try{
      let wallet = await walletRepo.findByUserId(req.user.id);
      if(!wallet){
        return res.status(400).send({ success: false, message: "wallet not found" });

      }
      if(Number(amount) > Number(wallet.balance)){
        return res.status(400).send({ success: false, message: "Insuficient balance" });

      }

     req.balance_from = wallet.balance;

  
      next();
    }catch(err){
      console.log(err);
      return res.status(400).send({ success: false, message: "An error occured, contact support" });

    }

    
    
    
  },
  toWallet: async (req, res, next) => {
    let to = req.body.to;

    try{
      let user = await userRepository.find({username:to});
      if(!user){
        return res.status(400).send({ success: false, message: "User does not exist on this platform" });

      }

      let wallet = await walletRepo.findByUserId(user.id);
      if(!wallet){
        return res.status(400).send({ success: false, message: "User has not completed verification" });

      }
      req.body.to_username = to
      req.balance_to = wallet.balance;
      req.body.to = user.id;
      req.to_email = user.email;
      next();
    }catch(err){
      console.log(err);
      return res.status(400).send({ success: false, message: "An error occured, contact support" });

    }

    
    
    
  },
  stockChecks:async(req,res,next)=>{
    if(req.body.type === 'buy'){
      next();
    }
    try{
      let stock = await userstockRepo.findAll({ propertyId: req.body.propertyId, userId: req.user.id });
      if (!stock[0]) {
        //User doesn't have that stock.
        return res.status(400).send({ success: false, message: "User doesn't have this particular stock" });
      }

  
      let stoc = stock[0];
      
      if(stoc.quantity < req.body.stock_qty){
        //User doesn't have enough stock
        return res.status(400).send({ success: false, message: "You only have "+ stoc.quantity + " stocks" });
      }

      if(stoc.hold_off){
        //Stock is in another transaction
        return res.status(400).send({ success: false, message: "Stock is currently involved in another transaction" });
      }
      next();
    }catch(err){
      console.log(err);
      return res.status(400).send({ success: false, message: "An error occured, contact support" });

    }
    

  }
  
};

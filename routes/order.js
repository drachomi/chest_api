const express = require("express");

const errorHandler = require("../handlers/error");
const authMiddleWare = require("../middlewares/auth");

const orderRepository = require("../repositories/order");
const stockService = require("../services/stockService");
const propertyRepo = require("../repositories/property");
const interest = require("../services/interestService");
const walletRepo = require("../repositories/wallet");
const { balance, stockChecks } = require("../middlewares/utils");
const transactionRepo = require("../repositories/transaction");
const emailService = require("../services/Email");
const userRepo = require("../repositories/user");
const walletService = require("../services/WalletService");
const property = require("../repositories/property");
const { pin } = require("../middlewares/auth");
const userstockRepo = require("../repositories/userstock");


const router = express.Router();

/* POST order. */
router.post("/", authMiddleWare.user, async (req, res) => {
  try {
    const data = await orderRepository.create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET orders listing. */
router.get("/", authMiddleWare.user, async (req, res) => {
  try {
    const data = await orderRepository.findAll();
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET P2P orders listing. */
router.get("/p2p_orders/:property", authMiddleWare.user, async (req, res) => {
  
  try {
    const buy = await orderRepository.findAll({type:'p2p-buy', status : 'active',propertyId:req.params.property});

    const sell = await orderRepository.findAll({type:'p2p-sell', status : 'active',propertyId:req.params.property});
   return res.status(200).send({ success:true, message:"success",buy:buy,sell:sell });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
        message: "Could not fetch orders",
    })
  }
});

router.get("/p2p_properties", async (req, res) => {
  
  try {
    const buy = await orderRepository.findAll({type:'p2p-buy',  status:'active'});
    const sell = await orderRepository.findAll({type:'p2p-sell', status : 'active'});
    let joint = buy.concat(sell);
    let prop_id_arr = [];

    //sort the array by propertyID

    for(let i in joint){
  
      if(!prop_id_arr.includes(joint[i].propertyId)){
        prop_id_arr.push(joint[i].propertyId)
      }      
    }

   return res.status(200).send({ success:true, message:"success",property:prop_id_arr });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
        message: "Could not fetch orders",
    })
  }
});

/* GET P2P orders listing. */
router.get("/p2p_orders", authMiddleWare.user, async (req, res) => {
  
  try {
    const buy = await orderRepository.findAll({type:'p2p-buy',userId:req.user.id,status:'active'});
    const sell = await orderRepository.findAll({type:'p2p-sell',userId:req.user.id,status:'active'});
   return res.status(200).send({ success:true, message:"success",buy:buy,sell:sell });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
        message: "Could not fetch orders",
    })
  }
});

/* PATCH order. */
router.patch("/:id", authMiddleWare.admin, async (req, res) => {
  try {
    const data = await orderRepository.updateById(req.params.id, req.body);
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET order. */
router.get("/:id", authMiddleWare.user, async (req, res) => {
  try {
    const data = await orderRepository.findById(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

// Deactivate Order
router.post("/cancel",authMiddleWare.user,async(req,res)=>{
  let id = req.body.id;
  try {
    let order = await orderRepository.findById(id);
    //let seller_userId = order.userId

    if(!order){
      return res.status(400).send({
        success: false,
          message: "Could not fetch order",
      })
    }

    if(order.userId != req.user.id){
      return res.status(400).send({
        success: false,
          message: "Can't cancel another persons orders",
      })
    }

    
    //cancel the order
    order = await orderRepository.updateById(order.id, {status: 'cancelled'}); //status:'inactive'
  
    if(order.type == 'p2p-sell'){
      console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
     /** let stock = await userstockRepo.findOne({ propertyId: order.propertyId, userId: req.user.id });
      
      //let stock = userstockRepo.findByUserId(seller_userId)
      let stock_id = stock.id
      //await userstockRepo.updateById(stock.id, {hold_off:false });

      //return units of stock meant for sale rather
      //let userStock = await userstockRepo.findById(stock_id)
      let new_stock_balance = Number(stock.quantity)  + Number(qty) 
      await userstockRepo.updateById(stock_id, {quantity: new_stock_balance,  hold_off: false });
      */
    }

    if(order.type == 'p2p-buy'){
      //reimburse the buyer
      let revWallet = await walletService.credit({id:order.userId,
                                                  amount:Number(order.price),
                                                  narration:'Wallet debit reversal for cancelled P2P-Buy transaction'})


    }

    res.status(200).json({message:'order cancelled', success:true, order });
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success:false,
      message:"error while cancelling order"
    })
  }
})

//Buy Market Order

router.post("/market", authMiddleWare.user, balance, async (req, res) => {

  try {
    //Debit users wallet
    let from_balance = Number(req.balance_from);
    let amount = Number(req.body.amount);
    const new_bal = from_balance - amount;

    let reqBody = req.body;
    reqBody.user_id = req.user.id;

    await walletRepo.updateByUserId(req.user.id, { balance: new_bal });

    const response = await stockService.placeMarketOrder(reqBody);
    switch (response.code) {
      case -1:
        console.log("entered -1")
        await walletRepo.updateUsersBalance(req.user.id, amount, true);
        return res.status(400).send({
          success: false,
          message: "Order amount is greater than available stocks, try limiting order",
        })

      case 1:
        console.log("entered 1")
        await walletRepo.updateUsersBalance(req.user.id, amount, true);
        return res.status(400).send({
          success: false,
          message: "An error occured trying to create order.Contact Customer care or try again",
        });

      case 0:
        console.log("entered 0");
        //Send email
        //Update transaction history

        let t = {
          amount: amount,
          narration: "Market order placed",
          type: "debit",
          status: "success",
          userId: req.user.id
        }

        await transactionRepo.create(t)

        let message = "Hi, Your order of " + amount + " has been filled successfully";
        emailService.utils(req.user.email, message, "Order placed Success");
        walletService.creditReferer(req.user);

        return res.status(200).send({
          success: true,
          message: "Order created successfully",
          order_id: response.order_id
        })


    }

  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error entered"
    })
  }




});
router.post("/place_buy_order", authMiddleWare.user,balance, async (req, res) => {
  let qty = Number(req.body.stock_qty)
  let reqData = {

    property_id: req.body.propertyId,
    qty: Number(qty),
    type: 'buy',
    selling_price: Number(req.body.buy_price),
    user_id: req.user.id,
    username:req.user.username
  };

  try {
    console.log("done checks")
  //Debit buyers wallet 
  let totalCost =  qty * Number(req.body.buy_price)
  let debi = await walletService.debit({id:req.user.id, amount: totalCost, narration: `Wallet debit for ${qty} units of P2P buy order placement transaction`});
   if(!debi){
     return res.status(400).send({
       success: false,
       message: "Could not place buy order, insufficient balance",
     });
   }
    let resp = await stockService.placeP2POrder(reqData);

    if (resp) {
      return res.status(200).send({
        success: true,
        message: "Order created successfully"
      })
    }
    return res.status(400).send({
      success: false,
      message: "Could not place order",
    });
  } catch (error) {
    console(error);
    return res.status(400).send({
      success: false,
      message: "An error occured trying to create order.Contact Customer care or try again",
    });
  }
});
router.post("/place_sell_order", authMiddleWare.user,stockChecks, async (req, res) => {
  let reqData = {
    property_id: req.body.propertyId,
    qty: req.body.stock_qty,
    type: 'sell',
    stock_id: req.body.stock_id,
    selling_price: req.body.selling_price,
    user_id: req.user.id,
    username:req.user.username

  };
  try {
    let resp = await stockService.placeP2POrder(reqData);
    if (resp) {
      return res.status(200).send({
        success: true,
        message: "Sell Order created successfully"
      })
    }
    return res.status(400).send({
      success: false,
      message: "Could not place order",
    });
  } catch (error) {
    console(error);
    return res.status(400).send({
      success: false,
      message: "An error occured trying to create order.Contact Customer care or try again",
    });
  }
});
router.post("/complete_p2p_buy", authMiddleWare.user, balance, async (req, res) => {
  //buy a pending sell order
  let order_id = req.body.order_id;
  let buyer_id = req.user.id;
  let amount = req.body.amount;
  let units_to_trade = req.body.units_to_trade

  try {
    //Fetch order
    console.log('start complete buy')
    let order = await orderRepository.findById(order_id);
    if(!order) return res.status(400).send({success:false, message:'order not found'})
    let ppu = Number(order.ppu)
    let order_quantity = Number(order.quantity)


    if(units_to_trade > order_quantity){
      return res.status(400).send({status:false, message:`You cannot trade more than ${order_quantity} units`});
    }
    if(buyer_id === order.userId){
      return res.status(400).send({status:false, message:" You cannot sell or buy from yourself"});
    }
    if(order.type != 'p2p-sell'){
      return res.status(400).send({status:false, message:" This is not a sell order"});
    }
    if(ppu*units_to_trade != amount){
      return res.status(400).send({status:false, message:"Please enter the correct amount"});
    }

    let reqData = {
      order_id : order.id,
      seller_id : order.userId,
      buyer_id : buyer_id,
      units_to_trade:units_to_trade,
      total_price : order.price,
      ppu:ppu
    }

    //Debit buyer wallet
   let debit_buyer =  await walletService.debit({id:buyer_id,
                               amount: Number(amount),
                               narration: `Wallet debit of ${amount} for buying ${units_to_trade} unit(s) of ${order.property} P2P transaction`
                              });

  if(debit_buyer !== true) return res.status(400).send({message:false, message:'resolve your wallet issues'})

  let resp = await stockService.completeP2POrder(reqData);
  if (resp !== true) {
    //refund buyer when buyer or seller's stock update fails
      await walletService.credit({id:buyer_id, amount: Number(amount), narration: `Wallet debit reversal of ${amount} for failed buying ${units_to_trade} unit(s) of ${order.property} P2P transaction`});
      return res.status(400).send({
        success: false,
        message: resp,
      });
    };
    
    //credit seller
    await walletService.credit({id:order.userId,
                                amount : Number(amount), 
                                narration: `Wallet credit of ${amount} for selling ${units_to_trade} unit(s) of ${order.property} P2P transaction`
                              });


    let seller = await userRepo.findById(order.userId);

    //Send emails
    let message = "Hi, Your order of " + amount + " has been completed successfully";
    emailService.utils(req.user.email, message, "Order completed Success");
    emailService.utils(seller.email, message, "Order completed Success");
    return res.status(200).send({
      success: true,
      message: "Stock bought successfully"
    })
    
  } catch (error) {
    console(error);
    return res.status(400).send({
      success: false,
      message: "An error occured trying to complete order.Contact Customer care or try again",
    });
  }
});
router.post("/complete_p2p_sell", authMiddleWare.user, async (req, res) => {
  let order_id = req.body.order_id;
  let seller_id = req.user.id;
  let amount = req.body.amount;
  let units_to_trade = req.body.units_to_trade


  try {
    //Fetch order
    console.log('start complete sell')
    let order = await orderRepository.findById(order_id);
    if(!order) return res.status(400).send({success:false, message:'order not found'})
    let ppu = Number(order.ppu)
    let order_quantity = Number(order.quantity)
   
    if(units_to_trade > order_quantity){
      return res.status(400).send({status:false, message:`You cannot trade beyond ${order_quantity} units`});
    }
    if(seller_id === order.userId){
      return res.status(400).send({status:false, message:" You cannot sell or buy from yourself"});
    }
    if(order.type != 'p2p-buy'){
      return res.status(400).send({status:false, message:" This is not a buy order"});
    }
    if(ppu*units_to_trade != amount){//?
      return res.status(400).send({status:false, message:"Kindly enter the correct amount"});
    }

    let reqData = {
      order_id : order.id,
      seller_id : seller_id,
      buyer_id : order.userId,
      units_to_trade:units_to_trade,
      total_price : order.price,
      ppu:ppu
    }
    //Debit buyer-users wallet //this debiting would be removed & moved to place_buy_order
  /** let debi = await walletService.debit({id:order.userId, amount: Number(amount), narration: "Wallet debit for P2P transaction"});
    if(!debi){
      return res.status(400).send({
        success: false,
        message: "Could not complete transaction, try another buyer",
      });
    }*/

    let resp = await stockService.completeP2POrder(reqData);

    if (resp !== true) {
      //await walletService.credit({id:order.userId, amount: Number(amount), narration: "Wallet debit reversal for P2P transaction"});    no need to refund at this stage.  to refund, user has to cancel their order
      return res.status(400).send({
        success: false,
        message: resp,
      });
    };

    //how much should the seller be credit ? 
    await walletService.credit({id:seller_id, amount : ppu*units_to_trade, narration: `Wallet credit for selling ${units_to_trade} unit(s) of ${order.property} P2P stocks transaction`});
    let buyer = await userRepo.findById(order.userId);
    if(!buyer) return res.status(200).send({ success: false, message: "buyer not found"})

    //Send emails
    let message = "Hi, Your order of " + amount + " has been completed successfully";
    emailService.utils(req.user.email, message, "Order completed Success");

    emailService.utils(buyer.email, message, "Order completed Success");

    return res.status(200).send({
      success: true,
      message: "Stock sold successfully"
    })
    
  } catch (error) {
    console(error);
    return res.status(400).send({
      success: false,
      message: "An error occured trying to complete order. Contact Customer care or try again",
    });
  }
});
router.get("/property/:id", authMiddleWare.user, async (req, res) => {

  try {
    const data = await orderRepository.findAll({ propertyId: req.params.id, status: 'active' });
    const property = await propertyRepo.findById(req.params.id);
 
    if (!property) {
      errorHandler({ error: "Property does not exist" }, res);

    }

    let defaultIncrease = 0;
    let monthIncrease = await interest.increasePercent(property.id, 30, property.price);
    let yearIncrease = await interest.increasePercent(property.id, 365, property.price);

    if (monthIncrease === 0 || yearIncrease === 0) {
      defaultIncrease = await interest.defaultPercent(property.id, property.price);
    }

    property.dataValues.monthIncrease = (monthIncrease === 0) ? defaultIncrease : monthIncrease;
    property.dataValues.yearIncrease = (yearIncrease === 0) ? defaultIncrease : yearIncrease;
    property.dataValues.volume = await stockService.calculateVolume(property.id);
    property.dataValues.image = JSON.parse(property.image);


    res.status(200).json({
      orders: data,
      property: property
    });
  } catch (error) {
    errorHandler(error, res);
  }
});

module.exports = router;

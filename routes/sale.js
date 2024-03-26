const express = require("express");

const errorHandler = require("../handlers/error");
const authMiddleWare = require("../middlewares/auth");
const crypto = require('crypto');
const saleRepository = require("../repositories/sale");
const userstockRepo = require("../repositories/userstock");
const stockService = require("../services/stockService");
const userRepo = require("../repositories/user");
const paystack = require("../services/Paystack");
const emailService = require("../services/Email");
const walletRepo=require("../repositories/wallet");
const transactionRepo = require("../repositories/transaction")

const router = express.Router();

/* POST sale. */
router.post("/", authMiddleWare.user, async (req, res) => {
  try {
    const data = await saleRepository.create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET sales listing. */
router.get("/", authMiddleWare.user, async (req, res) => {
  try {
    const data = await saleRepository.findAll();
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* PATCH sale. */
router.patch("/:id", authMiddleWare.admin, async (req, res) => {
  try {
    const data = await saleRepository.updateById(req.params.id, req.body);
    res.status(201).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* GET sale. */
router.get("/:id", authMiddleWare.user, async (req, res) => {
  try {
    const data = await saleRepository.findById(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post("/paystack", async (req, res) => {

  console.log("entered paystacks");
  console.log({ time: new Date, request: req.body, process: "Paystack hook" })


  const secret = process.env.PAYSTACK_SECKEY;
  let hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

  if(hash==null){
    return res.status(200).send({ success: true });
  }
  const event = req.body;

    console.log("72");
    if (event.event === 'customeridentification.success') {
      let user = await userRepo.find({ email: event.data.email });
      await paystack.createNuban({ user_id: user.id, customer_code: event.data.customer_code });

      let message = "Hi, your wallet and account number has been created successfully, kindly log into your account to view and continue making transactions";
      try{
        emailService.utils(event.data.email, message, "Wallet Created")
      }catch(err){
        console.log(err)
      }
      return res.status(200).send({ success: true });
    }
    if (event.event === 'customeridentification.failed') {
      let user = await userRepo.find({ email: event.data.email });
      await paystack.createNuban({ user_id: user.id, customer_code: event.data.customer_code });

      let message = "Hi, your wallet and account number has been created successfully, kindly log into your account to view and continue making transactions";
      try{
        emailService.utils(event.data.email, message, "Wallet Created")
      }catch(err){
        console.log(err)
      }
      return res.status(200).send({ success: true });
    }

    // if (event.event === 'customeridentification.failed') {
    //   console.log("enetered failed customer identification " + event.data.email);
    //   //Send failed email to users
    //   let message = "Hi, an error occured while trying to verify your account. Kindly contact our customer support or reply to this mail. Thanks"

    //   try{
    //     emailService.utils(event.data.email, message, "Wallet Creation Error")
    //   }catch(err){
    //     console.log(err)
    //   }
    //   console.log("emailed")
    //   return res.status(200).send({ success: true });
    // }

    if(event.data.status !="success"){
      return res.status(200).send({ success: true });
    }

    // if ((event.event === "charge.success") && (event.data.channel === 'card')) {
    //   let orderId = event.data.metadata.orderId;
    //   let quantity = event.data.metadata.quantity;
    //   let propertyId = event.data.metadata.propertyId;
    //   let userId = event.data.metadata.userId;
    //   let property = event.data.metadata.property;
    //   console.log("75");
    //   let paystackprice = event.data.amount / 100;
    //   let price = paystackprice / quantity;

    //   console.log(event.data.metadata);

    //   const isNewOrder = await stockService.isNewOrder(orderId);

    //   if (!isNewOrder) {
    //     return res.status(200).send({ success: true });
    //   }
    //   try {
    //     const data = await saleRepository.create({
    //       orderId: orderId,
    //       quantity: quantity,
    //       price: price,
    //       propertyId: propertyId,
    //       userId: userId,
    //       property: property

    //     });

    //     let obj = {
    //       quantity: quantity,
    //       price: event.data.amount,
    //       propertyId: propertyId,
    //       userId: userId,
    //       property: property

    //     }


    //     //propertyRepository.updateById(property_id,{sold : sold});
    //     await stockService.updatePropertyQty(obj)
    //     await stockService.updateUserStock(obj);
    //     await stockService.makeOrderInactive(orderId);
    //     return res.status(201).json({ data });
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(200).send({ success: true });

    //     //errorHandler(error, res);
    //   }

    //   return res.status(200).send({ success: true });

    // }

    if(event.data.channel === 'dedicated_nuban') {
        const nuban = event.data.authorization.receiver_bank_account_number;
        const amount = event.data.amount/100;


      try{
        const wallet = await walletRepo.findByNuban(nuban);
        const user = await userRepo.findById(wallet.userId);
        let new_amount =Number(wallet.balance) + Number(amount);
        console.log('AMOUNT IS '+new_amount);
        console.log("id is "+wallet.id);
        await walletRepo.updateByUserId(wallet.userId,{balance:new_amount});

        //Update transaction history
        let t = {
          amount :amount,
          narration:"Wallet funding via transfer",
          type:"credit",
          status:"success",
          userId:user.id,
          category:"wallet-funding-pysk",

        }

        await transactionRepo.create(t)

        let message = "Hi, Your wallet was funded successfully with " + amount + ", kindly check your dashboard for balance";
        emailService.utils(user.email, message, "Wallet Funding Success")
        
        return res.status(200).send({ success: true });

        
      }catch(err){
        console.log(err);
       
        
        return res.status(200).send({ success: true });
      }

        
    }

    console.log("after")
    return res.status(200).send({ success: true });


   

});


module.exports = router;


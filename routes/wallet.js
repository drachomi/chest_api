const express = require("express");
const { genSalt, hash } = require("bcryptjs");


const errorHandler = require("../handlers/error");
const { isAdmin, user ,password,bvn,pin, kyc} = require("../middlewares/auth");
const { balance,toWallet } = require("../middlewares/utils");


const userRepo = require("../repositories/user");
const bankRepo = require("../repositories/bank");
const router = express.Router();
const paystack = require("../services/Paystack");
const walletRepo = require("../repositories/wallet");

const transactionRepo = require("../repositories/transaction");

const emailService = require("../services/Email");

const withdrawalRepo = require("../repositories/withdrawal");

const flutterwave = require("../services/flutterwave");
const wallet = require("../repositories/wallet");



router.post("/", user,bvn, async (req, res) => {

  let obj = {
    email: req.user.email,
    first_name: req.user.firstName,
    last_name: req.user.lastName,
    phone: req.body.phone,
    account_number: req.body.account_number,
    bvn: req.body.bvn,
    bank_code: req.body.bank_code,
    user_id : req.user.id
  }



  try {
    let customer_code = await paystack.createCustomer(obj);

    console.log("customer code");
    console.log(customer_code);

    if (!customer_code) {
      // failed
      return res.status(400).send({ success: false, message: "Could not create, contact customer care" });
    }
    //Update incase user doesn't have phone number stored
    await paystack.updateCustomer(obj,customer_code);

    let identify_customer = await paystack.identifyCustomer(obj, customer_code);

    if (identify_customer === 0) {
      return res.status(201).send({ success: true, message: "Verifying your identity, check your mail for status" });
    }

    if (identify_customer === 1) {
      console.log("identified success, moving to create");
      let bankss = await paystack.createNuban({ user_id: req.user.id, customer_code: customer_code });

      console.log("after banks")


      let message = "Hi, your wallet and account number has been created successfully, kindly log into your account to view and continue making transactions"
      await emailService.utils(req.user.email, message, "Wallet Created");
      return res.status(200).send({ success: true, message: "Created successfully" });

    }
    return res.status(400).send({ success: false, message: "An error occured, contact supportx" });


  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: "An error occured, contact supporty" });

  }


});

router.get("/banks", async (req, res) => {
  try {
    let result = await paystack.bankCode();
    if (result) {
      return res.status(201).send({ success: true, banks: result });

    }
    return res.status(400).send({ success: false, message: "An error occured, contact support" });

  } catch (err) {
    return res.status(400).send({ success: false, message: "An error occured, contact support" });

  }
});

router.get("/single", user, async (req, res) => {
  let user = req.user.id;
  try {
    let wallet = await walletRepo.findByUserId(user);
    if (!wallet) {
      return res.status(201).send({ success: true, message: "User wallet doesn't exist",verified:false });

    }
    return res.status(201).send({ success: true, message: "Success", wallet: wallet,verified:true });


  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: "An error occured, contact support" });

  }

});

router.post("/transfer",user,pin,balance,kyc,toWallet, async (req, res) => {
  
  let to = req.body.to;
  let amount =Number(req.body.amount);
  let to_balance = req.balance_to;
  let from_balance = req.balance_from;
  let to_email = req.to_email;

  

  try {
    if(to === req.user.id){
      return res.status(400).send({ success: false, message: "You cannot transfer money to self" });
    }
    
    await walletRepo.updateByUserId(req.user.id,{balance:  from_balance - amount});

    await walletRepo.updateByUserId(to,{balance: amount + to_balance});

    //Update transaction history

    //Send Emails

    


    await transactionRepo.create( {
      amount :amount,
      narration:`Wallet to Wallet transfer to ${req.body.to_username}`,
      type:"debit",
      status:"success",
      userId:req.user.id
    })

    await transactionRepo.create({
      amount :amount,
      narration:`Wallet to Wallet transfer from ${req.user.username}`,
      type:"credit",
      status:"success",
      userId:to
    })

   

    let message = "A transfer has been made from your wallet. Kindly check your dashboard to confirm";
    emailService.utils(req.user.email, message, "Debit on your wallet");

    message = "A transfer has been made to your wallet. KIndly check your dashboard to confirm"
    emailService.utils(to_email,message,"Credit on your wallet")

    console.log("sent done");

   return res.status(200).send({ success: true, message:"Sent" });

    
  
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: "An error occured, contact support" });

  }
});

router.get("/history", user, async (req, res) => {
  let user = req.user.id;
  try {
    let trans = await transactionRepo.findAll({userId:user});
    if (!trans) {
      return res.status(400).send({ success: false, message: "No transaction found" });

    }
    return res.status(201).send({ success: true, message: "Success", history: trans });


  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: "An error occured, contact support" });

  }

});

router.post("/withdraw",user,balance, async(req,res)=>{
//router.post("/withdraw",user,pin,balance,kyc, async(req,res)=>{
  
  let amount =Number(req.body.amount);
  let bank = req.body.bank;
  let nuban = req.body.nuban;
  let is_new = req.body.new;
  let account_name = req.body.account_name;
  let from_balance = req.balance_from;

  let obj = {
    bank: bank,
    nuban: nuban,
    amount:amount,
    status:'pending',
    userId:req.user.id,
    username:req.user.username

  }

  if(amount<1000) return res.status(400).send({success:false, message:'withdrawals start from N1000'})
  let withdrawal_percent_charges = 2.2/100
  let withdrawal_charges = amount * withdrawal_percent_charges 

  try{
    await withdrawalRepo.create(obj);

    //Withdraw from users wallet
    await walletRepo.updateByUserId(req.user.id,{balance:  from_balance - amount - withdrawal_charges});

    
    await transactionRepo.create( {
      amount :amount,
      narration:"Wallet withdrawal",
      type:"debit",
      status:"success",
      userId:req.user.id
    });

    const rand = Math.floor(700700 + Math.random() * 900909);
    await transactionRepo.create( {
      amount :withdrawal_charges,
      narration:"Wallet Withdrawal Charges",
      type:"debit",
      status:"success",
      userId:req.user.id,
      txid: `${rand}WWC${new Date().getTime()}`
    });
    


    if(is_new){
      console.log(is_new);
      console.log(bank);
      console.log(account_name);
      await bankRepo.create({
        bank:bank,
        nuban:nuban,
        accountName: account_name,
        userId:req.user.id

      })
    }
    //send email
    let message = "A wallet withdrawal request has been made. We would process it as soon as possible";
    emailService.utils(req.user.email, message, "Wallet withdrawal request");
    return res.status(201).send({ success: true, message: "Withdrawal notice placed. It might take up to 24 hours" });

  }catch(err){
    console.log(err);
    return res.status(400).send({ success: false, message: "An error occured, contact support" });
  }

});

router.get("/user_banks", user, async (req, res) => {
  let user = req.user.id;
  try {
    let banks = await bankRepo.findAll({userId:user});
    if (!banks) {
      return res.status(400).send({ success: true, message: "User doesn't have bank accounts" });

    }
    return res.status(201).send({ success: true, message: "Success", banks: banks });


  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: "An error occured, contact support" });

  }

});

router.post("/validate_bank",user,async(req,res)=>{
  let obj = {
    nuban : req.body.nuban,
    code: req.body.bank_code
  }

  try{
    let response = await paystack.nameEnquiry(obj);
    if(!response){
      return res.status(400).send({ success: true, message: "Could not resolve bank" });
    }
    return res.status(201).send({ success: true, message: "Success", bank: response });

  }catch(err){
    return res.status(400).send({ success: true, message: "Could not resolve bank" });

  }
});
router.post("/set-wallet-pin",user,password,async(req,res)=>{
  let pin = req.body.pin;
  let user = req.user.id;
  try{
    pin =  await hash(pin, await genSalt());
    await userRepo.updateById(user,{pin:pin});
    return res.status(201).send({ success: true, message: "Pin updated successfully" });

  }catch(err){
    console.log(err);
    return res.status(400).send({ success: false, message: "An error occured, contact support" });

  }

});
router.post('/create',user,bvn,async(req,res)=>{
  let {email, bvn, phone, firstName, lastName, userId} = req.body
  if(!email || !bvn || !phone || !firstName || !lastName || !userId ) return res.status(400).send({success:false, message:'incomplete details'})
  let wallet = await flutterwave.createWallet({email, bvn, phone, firstName, lastName, user_id:userId, service:'FTW'})
  console.log({wallet})
  if(wallet.status == 'error'){ 
    //send mail to notify user about the failure
    let mail_subject = `Wallet Creation Failed - Invalid BVN`
    let message = `Hello ${firstName},\n\n It seems there is an error with the BVN you supplied.\n\nHence we are unable to create a Cribstock wallet for you. Kindly verify and enter a valid BVN.\n\nKeep using Cribstock, and refer your friends.\n\nCheers!`
    emailService.utils(email,message,mail_subject)
    return res.status(400).send({success:false, message:`wallet creation failed, ${wallet.message}`})
}else{
  //send mail to notify user about the success
  let mail_subject = `Cribstock Wallet Creation Successful`
  let message = `Hi ${firstName},\n\nHurray!!!\n\nYour wallet was successfully created. \n\nKeep using Cribstock, and refer your friends.\n\nCheers!`
  emailService.utils(email,message,mail_subject)
  console.log('wallet created by user')
  //check if user has govId verified
try{   
      if(req.user.govid_verified){
          userRepo.updateById(req.user.id,{kyc:'3'})
      }
}catch(err){
      console.log({error})
}
  
  return res.status(200).send({success:true, message:'wallet created'})
}


})

router.post('/create/admin',user,isAdmin,bvn,async(req,res)=>{
  if(!req.user.isAdmin) return res.status(401).send({success:false, message:'you need to sign in as an admin'})
  let {email, bvn, phone, firstName, lastName, userId} = req.body
  if(!email || !bvn || !phone || !firstName || !lastName || !userId ) return res.status(400).send({success:false, message:'incomplete details'})
  let wallet = await flutterwave.createWallet({email, bvn, phone, firstName, lastName, user_id:userId, service:'FTW'})
  if(wallet.status == 'error') return res.status(400).send({success:false, message:`wallet creation failed, ${wallet.message}`})
  try{  
    let user = userRepo.findByUserId(userId)
    if(user.govid_verified){
        userRepo.updateByUserId(userId,{kyc:'3'})
    }
  }catch(err){
    console.log({error})
    return res.status(500).send({success:false, message:'something happened'})
  }
  console.log('wallet created by admin')
  return res.status(200).send({success:true, message:'wallet created'})

})


module.exports = router;

const express = require("express");
const { Op } = require("sequelize");
const { genSalt, hash } = require("bcryptjs");

const errorHandler = require("../handlers/error");
const authMiddleWare = require("../middlewares/auth");

const userRepository = require("../repositories/user");
const emailRepo = require("../repositories/email");

const router = express.Router();
const emailService = require("../services/Email");
const paystack = require("../services/Paystack");
const cloudinary = require('cloudinary').v2;

const flutterwave = require("../services/flutterwave");
const walletRepository = require("../repositories/wallet");
//const email = require("../repositories/email");



/* POST user login. */
router.post("/login", authMiddleWare.user, async (req, res) => {
  try {
    const user = await userRepository.findById(req.user.id);
    res.status(200).json({ data: { token: req.user.token, user } });
  } catch (error) {
    errorHandler(error, res);
  }
});


/* POST user login. */
router.post("/admin-login", authMiddleWare.user, authMiddleWare.isAdmin, async (req, res) => {
  try {
    const user = await userRepository.findById(req.user.id);
    res.status(200).json({ data: { token: req.user.token, user } });
  } catch (error) {
    errorHandler(error, res);
  }
});


/* POST user signup. */
router.post("/signup",authMiddleWare.bvn, async (req, res) => {
  try {
    const { email, username, password, bvn, phone, firstName, lastName } = req.body;
    const user = await userRepository.find({
      [Op.or]: [{ email }, { username }],
    });
    if (user) {
      console.log("Error isuser exist ");
      errorHandler("User already exists.", res);
      return;
    }
    const data = await userRepository.create({
      ...req.body,
      password: await hash(password, await genSalt()),
    });
    await emailService.welcome(username, email)
    //call flutterwave for wallet
    await flutterwave.createWallet({email, bvn, phone, firstName, lastName, "user_id":data.id, service:'FTW'})
    res.status(201).json({ data });
  } catch (error) {
    console.log("Error in sign up is " + error)
    errorHandler(error, res);
  }
});

/* GET users listing. */
router.get("/", authMiddleWare.admin, async (req, res) => {
  try {
    const data = await userRepository.findAll();
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

/* PATCH user. */
router.patch("/:id", authMiddleWare.user, authMiddleWare.bvn, async (req, res) => {
  

  let obj = {
    govid: req.body.govid,
    bvn : req.body.bvn,
    dob: req.body.dob,
    address: req.body.address
    //kyc:true, to be true only when admin verify govid and bvn is verified

  }





  try {
    const data = await userRepository.updateById(req.params.id, obj);
    console.log(data);
    if(obj.govid){ 
      await userRepository.updateById(req.user.id, { kyc:'pending' });
  }
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(400).send({success:false,message:"An error occured"})
  }
});

/* GET user. */
router.get("/:id", authMiddleWare.admin, async (req, res) => {
  try {
    const data = await userRepository.findById(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post("/newsletter", async (req, res) => {
  console.log("email is " + req.body.email);
  try {
    const e = await emailRepo.findByEmail(req.body.email);

    if (e) {
      return res.status(400).send({ msg: "User already subscribed" });
    }
    const data = await emailRepo.create({
      ...req.body,
    });
    emailService.newsletter(req.body.email);
    return res.status(201).json({ data });
  } catch (error) {
    console.log("Error in sign up is " + error)
    return res.status(400).send({ msg: "an error occured", err: error });
  }
});

router.post("/forgot_password", async (req, res) => {
  let user_email = req.body.email;
  try {
    const user = await userRepository.find({
      email: user_email
    });
    if (!user) {
      return errorHandler("User doesn't exists.", res);

    }
    const code = Math.floor(100000 + Math.random() * 900000);
    console.log(code);
    await cache.setAsync(user_email + '_otp', code, "EX", 600);
    await emailService.resetPassword(user_email, code);

    return res.status(201).send({ success: true, otp: code });


  } catch (err) {
    errorHandler(err, res);
    return res.status(400).send({ success: false, msg: "An error occured" });

  }
});
router.post("/reset_password", async (req, res) => {
  const otp = req.body.otp;
  const user_email = req.body.email;
  const savedOtp = cache.getAsync(user_email + '_otp');
  if (!savedOtp) {
    return res.status(400).send({ success: false, message: "OTP doesn't exist" });
  }
  if (!otp == savedOtp) {
    return res.status(400).send({ success: false, message: "OTP Mismatch" });


  }

  const user = await userRepository.find({ email: user_email });

  const password = await hash(req.body.password, await genSalt());

  console.log("got here");

  await userRepository.updateById(user.id, { password });
  return res.status(201).send({ success: true });
});
router.post("/send_otp", async (req, res) => {
  let user_email = req.body.email;
  try {
    const user = await userRepository.find({
      email: user_email
    });
    if (!user) {
      return errorHandler("User doesn't exists.", res);

    }
    const code = Math.floor(100000 + Math.random() * 900000);
    console.log(code);
    await cache.setAsync(user_email + '_otp', code, "EX", 600);
    await emailService.sendOtp(user_email, code);

    return res.status(201).send({ success: true });


  } catch (err) {
    errorHandler(err, res);
    return res.status(400).send({ success: false, msg: "An error occured" });

  }
});



router.post("/validate_otp", async (req, res) => {
  const otp = req.body.otp;
  const user_email = req.body.email;
  const savedOtp = await cache.getAsync(user_email + '_otp');

  console.log("otp is " + savedOtp);
  if (!savedOtp) {
    return res.status(400).send({ success: false, message: "OTP doesn't exist" });
  }
  if (otp != savedOtp) {
    return res.status(400).send({ success: false, message: "OTP Mismatch" });


  }

  const user = await userRepository.find({ email: user_email });



  await userRepository.updateById(user.id, { verified: true });
  return res.status(201).send({ success: true });
});
router.post("/generate_account", authMiddleWare.user, async (req, res) => {

  let obj = {
    email: req.user.email,
    first_name: req.user.firstName,
    last_name : req.user.lastName,
    phone : req.user.phone,
    account_number: req.body.account_number,
    bvn : req.body.bvn,
    bank_code:req.body.bank_code
  }

  try{
    let customer_code = await paystack.createCustomer(obj);

    if(!customer_code){
      // failed
      return res.status(400).send({ success: false, message: "Could not create, contact customer care" });
    }
    let identify_customer = await paystack.identifyCustomer(obj,customer_code);

    if(identify_customer){
      return res.status(201).send({ success: true, message:"Verifying your identity, check your mail for status" });

    }
    return res.status(400).send({ success: false, message: "An error occured, contact support" });


  }catch(err){
    return res.status(400).send({ success: false, message: "An error occured, contact support" });

  }
  

});

router.post("/upload_image",async(req,res)=>{
  console.log('img 1')
  let image = req.body.image;
  try{
    console.log('img 2')
    const result = await cloudinary.uploader.upload(image);

    if(!result){
      return res.status(400).send({ success: false, message: "Could not Upload" });
    }

    console.log(result);

    return res.status(200).send({ success: true, message: "Uploaded", link:result.secure_url });


  }catch(err){
   
    console.log({err});
    return res.status(400).send({ success: false, message: "Could not upload" });

  }
})


router.post('/bvn',authMiddleWare.user,authMiddleWare.isAdmin, authMiddleWare.bvn, async(req,res)=>{

  let {bvn} = req.body
  if(!bvn) return res.status(400).send({message:'requires 11 digits bvn'})
  bvn = bvn.toString()
  if(bvn.length !== 11) return res.status(400).send({message:'requires 11 digits bvn'})
  try{
  let bvnUpdated = await userRepository.updateById(req.user.id, {bvn})
  return res.status(200).send({success:true, message:'bvn updated'})
  }catch(err){
      console.log({err})
      return res.status(500).send({success:false, message:'bvn could not be updated'})
  }
})

router.get('/kyc/unverified',authMiddleWare.user,authMiddleWare.isAdmin,async(req,res)=>{

  let {subject} = req.query
  subject = subject.trim()
  if(!subject) return res.status(400).send({success:false,message:'no kyc subject specified'})
  //check where kyc is not accepted, subject_verified is false, but subject is filled 
 try{
      let unverified = await userRepository.findAll({ [subject]: {[Op.ne]: null}, kyc:{[Op.not]:'accepted'}, [`${subject}_verified`]:{[Op.or]:[false,null]}})
      console.log({subject,le:unverified.length})
      return res.status(200).send({success:true, unverified})
  }catch(err){
    console.log({err})
   return res.status(500).send({success:false, message:'something happened'})
  }

})

router.post('/kyc/verify/:subject/:userId',authMiddleWare.user,authMiddleWare.isAdmin,async(req,res)=>{

  let {subject,userId} = req.params
  let {accepted, reason} = req.body
  subject = subject=='govid'? 'GOVT. ID': subject
  if(accepted){
    try {
      //update profile of user
      let user = await userRepository.updateById(userId,{[`${subject}_verified`]:true})
      let userWallet = await walletRepository.findByUserId(userId)
      if(userWallet){
        //that means user has completed other half KYC
        user = await userRepository.updateById(userId,{kyc:'accepted'})
      }
      console.log({user,[`${subject}`]:'accepted'})
      //send a mail about the decision
      let mail_subject = `Your ${subject.toUpperCase()} has been Accepted`
      let message = `Hi  ${user.firstName},\n\nHurray!!!\n\nYour ${subject.toUpperCase()} has been verified and accepted! \n\nKeep using Cribstock, and refer your friends.\n\nCheers!`
      emailService.utils(user.email,message,mail_subject)
      return res.status(200).send({success:true, message:"decision taken",user})
    } catch (error) {
      console.log({error})
      return res.status(500).send({success:false, message:'something happened'})
    }
  }else{

      //that means user has completed other half KYC
      user = await userRepository.updateById(userId,{kyc:'declined'})

      let mail_subject = `Your ${subject.toUpperCase()} was not verified`
      let message = `Hello ${user.firstName},\n\nYour ${subject.toUpperCase()} could not be accepted because of the following reason(s):\n\n${reason}\n\nKindly submit a valid one.\n\nKeep using Cribstock, and refer your friends.\n\nCheers!`
      emailService.utils(user.email,message,mail_subject)
      return res.status(200).send({success:true, message:"not verified",user})
  }


})

router.post('/email',authMiddleWare.user, authMiddleWare.isAdmin,async (req,res)=>{
  let {old_email,new_email} = req.body
  if(!old_email || !new_email) return res.status(400).send({message:'provide both emails', success:false})
  let old_user = await userRepository.findByEmail(old_email)
  if(!old_user) return res.status(400).send({success:false, message:'no user with that email address' })
  try{
    let new_user = await userRepository.updateById(old_user.id,{email:new_email})
    if(new_user) return res.status(200).send({message:'updated', success:true})
    return res.status(400).send({message:'did not update', success:false})
  }catch(err){
    console.log({err})
    return res.status(400).send({message:'did not update due to an error', success:false})
  }

})

router.get('/usernames/:username',async(req,res)=>{
  let {username} = req.params
  let found = await userRepository.findAllUsernames({username})
  if (found.length > 0)  return res.status(200).json({message:'found', data:found})
  return res.status(200).json({message:'not found', data:found})
  
})

module.exports = router;

const express = require("express");
const { Op } = require("sequelize");
const { genSalt, hash } = require("bcryptjs");

const errorHandler = require("../handlers/error");
const authMiddleWare = require("../middlewares/auth");

const userRepository = require("../repositories/user");
const companyRepo = require("../repositories/company");
const memberRepo = require("../repositories/team_member");

const router = express.Router();
const emailService = require("../services/Email");




/* POST user login. */
router.post("/login", authMiddleWare.user, async (req, res) => {
  try {
    const members = await memberRepo.find({userId: req.user.id});
    let companies = [];

    for(let i in members){
      let member = members[i];
      console.log(member.companyId);
      console.log(member.role);
      let company = await companyRepo.find({id: member.companyId});
      console.log(company);
      companies.push({businessName: company[0].businessName, role: member.role});
    }
    res.status(200).json({ data: { user: req.user, companies } });
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
router.post("/signup", async (req, res) => {
  try {
    const { email, password, phone, firstName, lastName, businessName,country, address, size  } = req.body;
    let user = await userRepository.find({
      email
    });
    if (user) {
      console.log("Error isuser exist ");
      errorHandler("User already exists.", res);
      return;
    }
     user = await userRepository.create({
      email, phone, firstName, lastName,password: await hash(password, await genSalt()),
    });

    //await emailService.welcome(firstName, email)
    const company = await companyRepo.create({businessName, country, address, size});
    await memberRepo.create({companyId: company.id, userId: user.id, role: "owner"})
    //Subscription event should happen here
    res.status(201).json({ success: true, message: "User created",user });
  } catch (error) {
    console.log("Error in sign up is " + error)
    errorHandler(error, res);
  }
});

router.post("/add-member", async(req,res)=>{
 const {email, companyId, role} = req.body;
 let user = await userRepository.findByEmail(email);
 if(!user){
  //New User
  user = await userRepository.create({email: email});
 }

 let member = await memberRepo.find({userId: user.id, companyId: companyId});
 if(member)  errorHandler({message: "Already a team member"}, res);

member = memberRepo.create({companyId: companyId, userId: user.id, role: role})

res.status(200).json({ member });

 
});


// router.get("/imoh", async(req,res)=>{
//   const company = await companyRepo.find();

//   console.log(company);

//   res.status(200).json(company);


  
// })










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

router.get('/usernames/:username',async(req,res)=>{
  let {username} = req.params
  let found = await userRepository.findAllUsernames({username})
  if (found.length > 0)  return res.status(200).json({message:'found', data:found})
  return res.status(200).json({message:'not found', data:found})
  
})

module.exports = router;

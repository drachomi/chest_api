const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const { Op } = require("sequelize");
const logHandler = require("../handlers/log");

const userRepository = require("../repositories/user");

module.exports = {
  admin: async (req, res, next) => {
    const token = req.headers["x-access-admin-token"];

    if (token === "cribstock") {
      next();
    } else {
      return res.status(400).send({ success: false, message: "Admin authentication required" });
      
    }
  },
  user: async (req, res, next) => {
    let token = req.headers["x-access-user-token"];
    const { username, password } = req.body;
    // the value of username recieved might be email address
    console.log("22");
    if (token) {
     // console.log("found token");
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(400).send({ success: false, message: "User token invalid" });

        } else {
          req.user = decoded;
          logHandler.debug(req.user);
          next();
        }
      });
    } else if ((username || email) && password) {
      //console.log("username/email and password");
      try{
        const foundUser = await userRepository.find({
          [Op.or]: [{ email:username }, { username }],
        });

        //console.log("23");
              
        if (foundUser && (await compare(password, foundUser.password))) {
          //console.log("24");
          const payload = {
            id: foundUser.id,
            email: foundUser.email,
            username: foundUser.username,
            isAdmin:foundUser.isAdmin,
            phone : foundUser.phone,
            firstName:foundUser.firstName,
            lastName : foundUser.lastName,
            bvn:foundUser.bvn,
            referer:foundUser.referer,
            govid_verified: foundUser.govid_verified,
            kyc:foundUser.kyc,
            transacted:foundUser.transacted
          };
          token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "24h", // expires in 24 hours,
          });
  
          //console.log(token);
          req.user = { ...payload, token };
  
          next();
        } else {
          return res.status(400).send({ success: false, message: "Username or password incorrect" });
  
        }
      }catch(err){
        console.log({err});
        
      }
      
    } else {
      return res.status(400).send({ success: false, message: "User authentication required" });

    }
  },
  isAdmin: async(req,res,next)=>{
    const user = req.user;
    //console.log({user});

    if(user.isAdmin){
      return next();
    }
    return res.status(400).send({ success: false, message: "Can not access admin functions" });



  },

  password: async (req, res, next) => {
    //console.log("entered passowrd")
    let password = req.body.password;

    let user = await userRepository.findById(req.user.id);

    let compa = await compare(password, user.password);


    if(!compa){
      return res.status(400).send({ success: false, message: "Wrong password" });
    }
      next();
  },

  bvn:async(req,res,next)=>{
    if(!req.body.bvn){
     return next();
    }
    try{
      const user = await userRepository.findAll({bvn:req.body.bvn});
      if(!user[0]){
       return next();
      }
     // if(user[0]) return res.status(400).send({ success: false, message: "BVN already in use" }); 
      if(user[0].id !== req.user.id){//is this comparison needed??
        return res.status(400).send({ success: false, message: "BVN already in use by another user" });
      }
     return next();
    }catch(err){
      console.log(err);
      return res.status(400).send({ success: false, message: "BVN already exist" });

    }
  },
  pin: async (req, res, next) => {
    //console.log("entered passowrd")
    let pin = req.body.pin;

    try{
      let user = await userRepository.findById(req.user.id);

      let compa = await compare(pin, user.pin);
  
  
      if(!compa){
        return res.status(400).send({ success: false, message: "Wrong pin" });
      }
      next();

    }catch(err){
      return res.status(400).send({ success: false, message: "Pin error" });

    }
  },
  kyc:async(req,res,next)=>{
  //check if kyc is true
  
  try {
    let user  = await userRepository.findByEmail(req.user.email)
    if(user.kyc != 'accepted') return res.status(400).send({success:false, message:"user has not completed KYC verification"})
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send({success:false,message:"something happened"})
  }
  }
};

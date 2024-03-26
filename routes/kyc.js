const express = require("express");
const router = express.Router();
const userRepo = require("../repositories/user");
const {utils} = require("../services/Email");


router.post("/smile", async (req, res) => {
  let body = req.body;
  console.log(body);

  try{
    //TODO log transaction to table
    let user_id = body.PartnerParams.user_id;
    let user = await userRepo.findById(user_id);
    if(!user) return false;

    if(body.ResultCode!= "0810"){
      await utils(seller.email, body.ResultText, "KYC Not Accepted");
      return false;
    }

    let {DOB, FullName, Gender, Country, IDNumber, IDType} = body;

    let fName = FullName.split(" ")[0];
    let lName = FullName.split(" ")[FullName.length -1];
    Gender = Gender=="M"?"male" : "female";

    await userRepo.updateById(user_id,{firstName: fName, lastName: lName, gender:Gender, dob: DOB, country: Country, kyc: "accepted", verified:true, idNumber:IDNumber, govidType:IDType});
    await utils(seller.email, body.ResultText, "KYC Accepted Successfully");



  }catch(err){
    console.log(err);
    return false;
  }


 
});

module.exports = router;

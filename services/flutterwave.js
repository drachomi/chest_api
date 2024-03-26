const axios = require('axios');
const walletRepo = require("../repositories/wallet");
const userRepo = require("../repositories/user")

const createWallet = async (obj) =>{
let {email, bvn, phone, firstName, lastName, service} = obj
let accountName = `${firstName} ${lastName}`
let data = JSON.stringify({
    "email":email,
    "bvn":bvn,
    "phonenumber":phone,
    "firstname":firstName,
    "lastname":lastName,
    "is_permanent": true,
    "tx_ref": `${Date.now()}`,
    "narration": accountName
});

var config = {
  method: 'post',
  url: 'https://api.flutterwave.com/v3/virtual-account-numbers',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${process.env.FLW_SECKEY}`
  },
  data : data
};

try{

    const response = await axios(config)
    console.log({dat:response.data})
    let {data:{account_number, bank_name} }  = response.data
    if (account_number && bank_name) {
       try{          
              let wallet = await walletRepo.create({ "nuban": account_number, "nubanBank": bank_name, "accountName":accountName, "userId":obj.user_id, "balance":0, service })
              console.log('wallet created with account number & bank name')
              //update user bvn
              let user = await userRepo.updateByEmail(email,{bvn})
              console.log({user})
              return wallet
      }catch(err){
              console.log({err})
              return false
      }

    }else{
      console.log('wallet created with no account number or bank name')
      return false
    }
    
    

}catch(err){
  console.log(`error while trying calling create wallet API`,err.response.data)
  return err.response.data
}

} 

module.exports = {createWallet}
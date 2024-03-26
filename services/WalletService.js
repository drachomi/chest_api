const userRepository = require("../repositories/user");
const walletRepo = require("../repositories/wallet");
const transactionRepo = require("../repositories/transaction");




module.exports = {

    credit: async (obj) => {
        try{
            let wallet = await walletRepo.findByUserId(obj.id);
            if(!wallet){
                return false;
            }
            let new_amount = Number(wallet.balance) + Number(obj.amount);
            await walletRepo.updateByUserId(obj.id, { balance: new_amount });


            let t = {
                amount: Number(obj.amount),
                narration: obj.narration,
                type: "credit",
                status: "success",
                userId: obj.id,
                category: obj.category
              }
            await transactionRepo.create(t);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    },
    debit: async (obj) => {
        
        try{
            let wallet = await walletRepo.findByUserId(obj.id);
            if(wallet.balance < obj.amount){
                return false;
            }
            let new_amount = Number(wallet.balance) - Number(obj.amount);
            await walletRepo.updateByUserId(obj.id, { balance: new_amount });
            let t = {
                amount: Number(obj.amount),
                narration: obj.narration,
                type: "debit",
                status: "success",
                userId: obj.id,
                category:obj.category
              }
            await transactionRepo.create(t);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
        

        
    },
    creditReferer: async (user) => {
        console.log("entered credit ref",{user});
        try{
            let refreshUser = await userRepository.findById(user.id) //to prevent user getting bonus for futher transactions while still signed in as not transacted 
            console.log({refreshUser})
            if(!refreshUser.referer){
                console.log(user.referer,'\n\nA:I do not have a referer, this bonus is not for me')
                return false;
            }
            
            if(refreshUser.transacted){
                //user has carried out a transaction in the past
                console.log(user.transacted,' \n\nB:I have a referer, but I have transacted before this market order that I am placing now, this bonus is not for me')
                return false;
            }
            console.log('none of A and B should not be showing up there')

            //ADD 500 TO THE REFERARS WALLET

            let ref_bonus = 500
            let referer = await userRepository.find({username:user.referer});
            if(!user){
                false;
            }
            let wallet = await walletRepo.findByUserId(referer.id);
            if(!wallet){
                //Send email
                return false;
            }
            let new_amount = Number(wallet.balance) + ref_bonus;
            await walletRepo.updateByUserId(referer.id, { balance: new_amount });



            //ADD 500 TO THE USERS WALLET
            let t = {
                amount: ref_bonus,
                narration: "Referal link bonus for "+user.email,
                type: "credit",
                status: "success",
                userId: referer.id,
                category:obj.category
              }
            await transactionRepo.create(t);

            let user_wallet = await walletRepo.findByUserId(user.id);
            if(!user_wallet){
                //Send email
                return false;
            }
            new_amount = Number(user_wallet.balance) + ref_bonus;
            await walletRepo.updateByUserId(user.id, { balance: new_amount });
            t = {
                amount: ref_bonus,
                narration: "Referal link bonus for "+referer.email,
                type: "credit",
                status: "success",
                userId: user.id,
                category:obj.category

              }
            await transactionRepo.create(t);


            //Update users transactable
            await userRepository.updateById(user.id,{transacted:true})

            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    },
    creditIBO: async (obj) => {
        try{
            let wallet = await walletRepo.findByCompanyId(obj.id);
            if(!wallet){
                return false;
            }
            let new_amount = Number(wallet.balance) + Number(obj.amount);
            await walletRepo.updateByCompanyId(obj.id, { balance: new_amount });


            let t = {
                amount: Number(obj.amount),
                narration: obj.narration,
                type: "credit",
                status: "success",
                companyId: obj.id,
                txid:obj.txid,
                category:obj.category

              }
            await transactionRepo.create(t);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    },
    debitIBO: async (obj) => {
        
        try{
            let wallet = await walletRepo.findByCompanyId(obj.id);
            if(wallet.balance < obj.amount){
                return false;
            }
            let new_amount = Number(wallet.balance) - Number(obj.amount);
            await walletRepo.updateByCompanyId(obj.id, { balance: new_amount });
            let t = {
                amount: Number(obj.amount),
                narration: obj.narration,
                type: "debit",
                status: "success",
                companyId: obj.id,
                txid:obj.txid,
                category:obj.category

              }
            await transactionRepo.create(t);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
        

        
    }

    


}
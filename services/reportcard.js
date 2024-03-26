const emailfile = require('./EmailFile');
const stockRepository = require("../repositories/userstock");
const userRepo = require("../repositories/user");
const { calculatePrice } = require("../services/interestService");
const moment = require("moment");
const transRepo = require("../repositories/transaction");
const orderRepo = require("../repositories/order");



module.exports = {
    wallet: async (user) => {
        try{
            let wallet_funded = 0;
            let amount_invested =0;
            let trans = await transRepo.findAll({userId:user.id});
            for(let t of trans){
                if(t.category){
                    if(t.category.includes("wallet-funding-ftw")){
                        wallet_funded = wallet_funded + t.amount;
                    }
                    if(t.category === "stock_purchase"){
                        amount_invested = amount_invested + t.amount;
                    }
                }else{
                    if(t.narration.includes("funding")){
                        wallet_funded = wallet_funded + t.amount;
                    }
                    if(t.narration.includes("buying")){
                        amount_invested = amount_invested + t.amount; 
                    }
                }

            }

            return {amount_invested, wallet_funded};

        }catch(err){
            console.log(err);
            return false;
        }

    },
    stocks: async(user)=>{
        try{
            let total_props =0;
            let props_map = {};
            let highest_prop = '';
            let highest_count = 0;
            let orders = await orderRepo.findAll({userId:user.id});
            for(let o of orders){
                if(o.type === "p2p-sell"){
                    continue;
                }
                if(o.type === 'buy'){
                    total_props = total_props + o.quantity;
                }
                if(o.type == 'p2p-buy'){
                    if(o.status == 'inactive' || o.status == 'fulfilled'){
                        total_props = total_props + o.quantity;
                    }
                }

                //Check and put in properties map
                if(o.property in props_map){
                    let current_qty =Number( props_map[o.property]);
                    current_qty = current_qty + o.quantity;
                    props_map[o.property] = current_qty;

                }else{
                    props_map[o.property] = Number(o.quantity);
                }

                if(highest_count < props_map[o.property]){
                    highest_count = props_map[o.property];
                    highest_prop = o.property;
                }


            }
            return {total_props, props_map, highest_count, highest_prop};
        }catch(err){
            console.log(err);
            return false;
        }
    },
    profitRanking: async(user)=>{
        
    }

    


}

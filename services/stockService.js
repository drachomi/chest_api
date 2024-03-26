const propertyRepository = require("../repositories/property");
const orderRepository = require("../repositories/order");
const userstockRepo = require("../repositories/userstock");
const salesRepo = require("../repositories/sale");
const moment = require("moment");




module.exports = {
    placeMarketOrder: async (reqBody) => {
        const property_id = reqBody.property_id;
        const qty = Number(reqBody.stock_qty);
        const user_id = reqBody.user_id;


        try {
            const property = await propertyRepository.findById(property_id);

            if ((qty + Number(property.sold)) > Number(property.units)) {
                return { code: -1 };
            }
            const order = await orderRepository.create({
                propertyId: property_id,
                userId: user_id,
                quantity: qty,
                price: qty * Number(property.price),
                property: property.name,
                status: 'inactive'
            })


            if (!order) {
                console.log("not order");
            };

            await propertyRepository.updateById(property_id, { sold: qty + property.sold });
          
            //Update users stock
            let stock = await userstockRepo.findAll({ propertyId: order.propertyId, userId: order.userId });
            if (stock[0]) {
                //console.log(stock);
                //console.log("Entered stock zero");
                let stoc = stock[0];
                let qty = stoc.quantity + order.quantity;

                stoc = await userstockRepo.updateById(stoc.id, { quantity: qty });
            } else {
                stock = await userstockRepo.create({
                    quantity: order.quantity,
                    price: order.price,
                    propertyId: order.propertyId,
                    userId: order.userId,
                    property: order.property,
                    hold_off:false

                })
            }
           // console.log(order);

            return { code: 0, order_id: order.id };;


        } catch (err) {
            console.log(err);
            return {
                code: 1,
            };
        }


    },

    makeOrderInactive: async (id) => {

        try {
            await orderRepository.updateById(id, { status: 'inactive' });

        } catch (err) {

        }
    },
    updateUserStock: async (obj) => {
        let stock = await userstockRepo.findAll({ propertyId: obj.propertyId, userId: obj.userId });


        if (stock[0]) {
            //console.log(stock);
            //console.log("Entered stock zero");
            let stoc = stock[0];
            let qty = stoc.quantity + obj.quantity;
            console.log(qty);
            stoc = await userstockRepo.updateById(stoc.id, { quantity: qty });
        } else {
            stock = await userstockRepo.create({
                quantity: obj.quantity,
                price: obj.price,
                propertyId: obj.propertyId,
                userId: obj.userId,
                property: obj.property

            })
        }
    },
    updatePropertyQty: async (obj) => {
        const property = await propertyRepository.findById(obj.propertyId);
        const sold = property.sold + obj.quantity;

        propertyRepository.updateById(obj.propertyId, { sold: sold });
    },
    calculateVolume: async (propertyId) => {
        const today = moment().format('YYYY-MM-DD');

        const sales = await salesRepo.findAll({ propertyId: propertyId });

        if (!sales[0]) {
            console.log("Sales not found");
            return 0;
        }

        let total = 0;

        for (let i in sales) {
            const sale = sales[i];


            if (moment(sale.createdAt).format('YYYY-MM-DD') === today) {
                console.log("sales created at today");
                total = total + (sale.price * sale.quantity);
            }
        }

        console.log("total: "+total);

        return total;


    },
    isNewOrder: async (orderId) => {
        const sales = await salesRepo.findAll({ orderId: orderId });

        if (sales[0]) {
            console.log("is not new order");
            return false;
        }

        return true;
    },
    placeP2POrder: async (reqBody) => {
        const property_id = reqBody.property_id;
        const qty = reqBody.qty;
        const order_type = reqBody.type;
        const user_id = reqBody.user_id;
        const stock_id = reqBody.stock_id;
        const username = reqBody.username;
        const price = reqBody.selling_price || reqBody.buying_price;

        try {
            const property = await propertyRepository.findById(property_id);

            if(order_type === 'buy'){
                console.log("entered buy");

                let or =  await orderRepository.create({
                    propertyId: property_id,
                    userId: user_id,
                    quantity: qty,
                    price: qty * price, //this multiplication proves the incoming 'price' is unit price
                    property: property.name,
                    status: 'active',
                    type:'p2p-buy',
                    username:username,
                    ppu: price //this price is ppu
                });
                // try{
                //   let or =  await orderRepository.create({
                //         propertyId: property_id,
                //         userId: user_id,
                //         quantity: qty,
                //         price: qty * price,
                //         property: property.name,
                //         status: 'active',
                //         type:'p2p-buy'
                //     });
                //     //console.log(or);
                //     console.log("true");
                //     return true;
                // }catch(err){
                //     console.log("ntered err")
                //     console.log(err);
                //     return false;

                // }
            }
            if(order_type === 'sell'){
                const order = await orderRepository.create({
                    propertyId: property_id,
                    userId: user_id,
                    quantity: qty,
                    price: qty * price,
                    property: property.name,
                    status: 'active',
                    type:'p2p-sell',
                    username:username,
                    ppu: price //this price is ppu
                });
                
               /** await userstockRepo.updateById(stock_id, { hold_off: true });
               //remove stock from seller rather
               let stock = await userstockRepo.findOne({ propertyId: order.propertyId, userId: user_id });
               //let userStock = await userstockRepo.findById(stock_id)
                let new_stock_balance = Number(stock.quantity)  - Number(qty) 
                await userstockRepo.updateById(stock_id, {quantity: new_stock_balance,  hold_off: false });*/
            }
           
            console.log("entered second catch")
            return true;


        } catch (err) {
            console.log(err);
            return false;
        }


    },
    completeP2POrder: async (reqBody) => {
        const order_id = reqBody.order_id;
        const seller_id = reqBody.seller_id;
        const buyer_id = reqBody.buyer_id;
        const units_to_trade = reqBody.units_to_trade
        const total_price = reqBody.total_price
        const ppu = reqBody.ppu

        try {

           const order = await orderRepository.findById(order_id)
           let property_id = order.propertyId;
           const property = await propertyRepository.findById(property_id);
            

            //Update Seller Stock stock

            let seller_stock = await userstockRepo.findOne({ propertyId: property_id, userId: seller_id });
            if (seller_stock) {
                //Remove stock from seller
                let qty = Number(seller_stock.quantity) - Number(units_to_trade);//Number(order.quantity);
                if(qty  < 0) return 'seller does not have enough stock'//false
                await userstockRepo.updateById(seller_stock.id, { quantity: qty,hold_off:false });
            }else{
                console.log('seller seems not to have the stock\n\n')
                return 'seller doesn\'t have this stock'//false
            }

            //Update Buyers Stock
            let buyer_stock = await userstockRepo.findOne({ propertyId: property_id, userId: buyer_id });
            if(buyer_stock){
                //Add stock to buyer
                let qty = Number(buyer_stock.quantity )+ Number(units_to_trade)//Number(order.quantity);
                let new_price = Number(buyer_stock.price) + Number(units_to_trade) * Number(ppu)
                await userstockRepo.updateById(buyer_stock.id, { quantity: qty, price:new_price, hold_off:false });
                 //update order 1/2
            let units_left_trade =  Number(order.quantity) - Number(units_to_trade)
            let status = units_left_trade == 0 ? 'fulfilled' : 'active'
            let price = total_price - units_to_trade*ppu //this first price is total price of stock left, the second price is ppu
            const ord = await orderRepository.updateById(order_id, { status,quantity:units_left_trade, price}); //might not be fulfilled yet - fulfilled only what is left is zero!!

                return true;
            }

            //created incase buyer does not have stocks of the property yet
            await userstockRepo.create({
                quantity: Number(units_to_trade),
                price: Number(units_to_trade) * Number(ppu),
                propertyId: order.propertyId,
                userId: buyer_id,
                property: order.property,
                hold_off:false
            })

            //update order 2/2
            let units_left_trade =  Number(order.quantity) - Number(units_to_trade)
            let status = units_left_trade == 0 ? 'fulfilled' : 'active'
            let price = total_price - units_to_trade*ppu //this first price is total price of stock left, the second price is ppu
            const ord = await orderRepository.updateById(order_id, { status,quantity:units_left_trade, price }); //might not be fulfilled yet - fulfilled only what is left is zero!!

            return true;

        } catch (err) {
            console.log("err is from stocksevice")
            console.log(err);
            return 'an error occurred'//false;
        }

    }
}

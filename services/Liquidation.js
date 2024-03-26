const emailfile = require('./EmailFile');
const stockRepository = require("../repositories/userstock");
const userRepo = require("../repositories/user");
const { calculatePrice } = require("../services/interestService");
const moment = require("moment");



module.exports = {
    isDueDate: async (user) => {
        if (!user.next_sell_date) {
            return false;
        }

        let next_date = new Date(user.next_sell_date);
        let today = new Date();

        today = moment(today).format('MM/DD/YYYY');
        next_date = moment(next_date).format('MM/DD/YYYY');



        if (next_date.getTime() === today.getTime()) {
            return true;
        }

        return false;


    },

    setNextDate: async (user_id) => {
        let total = 0;
        let next_date = new Date()
        try {
            const stocks = await stockRepository.findByUserId(user_id);
            for (i in stocks) {
                const stock = stocks[i];
                total = total + await calculatePrice(stock.propertyId, stock.quantity);
            }


            if (total <= 1000000) {
                next_date.setDate(next_date.getDate() + 14)

            }
            if (total > 1000000 && total < 5000000) {
                next_date.setDate(next_date.getDate() + 7)
            }
            if (total > 5000000) {
                next_date.setDate(next_date.getDate() + 3)
            }

            // next_date = next_date.toDateString();
            next_date = moment(next_date).format('MM/DD/YYYY');



            await userRepo.updateById(user_id, { next_sell_date: next_date })

        } catch (err) {
            console.log(err);
        }
    },
    isDueWasYesterday: async (user) => {

        if (!user.next_sell_date) {
            console.log("Is due date is false");
            return false;
        }

        let next_date = new Date(user.next_sell_date);

        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);





        yesterday = moment(yesterday).format('MM/DD/YYYY');
        next_date = moment(next_date).format('MM/DD/YYYY');



        if (yesterday === next_date) {
            return true;
        }

        return false;


    }


}

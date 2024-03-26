const propertyRepository = require("../repositories/property");
const userstockRepo = require("../repositories/userstock");
const priceRepo = require("../repositories/prices");
const moment = require("moment");
const profitRepo = require("../repositories/profit");
const userRepo = require("../repositories/user");
const { epochWithoutTime } = require("../utils/date");
const stockService = require("./stockService");




module.exports = {
    updatePropertyInterest: async (day) => {
        // const percent_increase = process.env.MARKET_INCREASE_RATE;

        //const date  = moment().format('L');
        const date = moment().subtract(day, 'days').format('L');//remove day put 0 zero

        console.log({ date });

        try {
            //all properties that are not on presell
            const properties = await propertyRepository.findAll({isPresell: false});//{where: {isPresell: false}}

            if (!properties[0]) {
                return false;
            }

            for (let p in properties) {
                let property = properties[p];
                let percent_increase = property.percentIncrease
                let new_market_cap = property.marketCap + (property.marketCap * (percent_increase / 100));
                let price = new_market_cap / property.units;


                let defaultIncrease = 0;
                let monthIncrease = await module.exports.increasePercent(property.id, 30, property.price);
                let yearIncrease = await module.exports.increasePercent(property.id, 365, property.price);

                if (monthIncrease === 0 || yearIncrease === 0) {
                    defaultIncrease = await module.exports.defaultPercent(property.id, property.price);
                }
                monthIncrease = (monthIncrease === 0) ? defaultIncrease : monthIncrease;
                yearIncrease = (yearIncrease === 0) ? defaultIncrease : yearIncrease;
                volume = await stockService.calculateVolume(property.id);
                

                 await propertyRepository.updateById(property.id, { marketCap: new_market_cap, price: price,monthIncrease,yearIncrease,volume });

                 await priceRepo.create({
                    propertyId: property.id,
                    price: price,
                    date: date,
                    sort_date: epochWithoutTime((new Date(date).getTime() / 1000))
                });
            }


            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    increasePercent: async (propertyId, date, todaysPrice) => {
        const previousDate = moment().subtract(date, 'days').format('L');

        try {
            const previousPrices = await priceRepo.findAllByDate(previousDate);

            let previousPrice;

            for (let i in previousPrices) {
                if (previousPrices[i].propertyId === propertyId) {
                    previousPrice = previousPrices[i];
                }
            }


            if (!previousPrice) {
                console.log('previous price not found ' + date)
                return 0;
            }



            let delta = todaysPrice - previousPrice.price;

            let percentDelta = (delta / previousPrice.price) * 100;


            console.log(percentDelta);

            return percentDelta;

        } catch (err) {
            console.log(err);
            return 0;
        }








    },
    getGraph: async (propertyId) => {
        const prices = await priceRepo.findAllByPropId(propertyId);

        return

    },
    calculatePrice: async (propertyId, qty) => {
        console.log("entered calculate price");
        const property = await propertyRepository.findById(propertyId);
        // console.log({ CProperty: property })
        const delta = property.price * qty;
        // console.log('delta?', delta);
        return delta;
    },
    calculate30DaysBalance: async (userId) => {
        console.log("30 days balance");
        const previousDate = moment().subtract(30, 'days').format('L');
        console.log(previousDate);
        const previousBal = await profitRepo.findByDate({ userId: userId, date: previousDate });

        console.log(previousBal);

        if (!previousBal) {
            console.log("returning 0");
            return 0;
        }

        console.log("Prev bal is " + previousBal.profit);
        return previousBal.profit;
    },
    getTodaysPrice: async (propertyId) => {
        const property = await propertyRepository.findById(propertyId);
        return property.price;


    },
    defaultBalance: async (userId) => {
        const profit = await profitRepo.findOldestBalance(userId);
        console.log("Oldest balance");
        //console.log(balance);

        if (!profit[0]) {
            console.log("returning 0 balance");
            return 0;
        }
        return profit[0].profit;
    },
    defaultPercent: async (propertyId, todaysPrice) => {

        try {
            console.log("entered default");
            const previous = await priceRepo.findOldestPrice(propertyId);
            //console.log(previous);


            if (!previous[0]) {
                console.log("returning 0");
                return 0;
            }


            let previousPrice = previous[0].price;

            let delta = todaysPrice - previousPrice;

            let percentDelta = (delta / previousPrice) * 100;



            return percentDelta;

        } catch (err) {
            console.log(err);
            return 0;
        }








    },
    updateUsersBalance: async (day) => {
        const users = await userRepo.findAll();
        const previousDate = moment().subtract(day, 'days').format('L');


        for (let u in users) {
            let userId = users[u].id;
            const stocks = await userstockRepo.findByUserId(userId);
            let total_gain = 0.0;
            let balance = 0;
            const date = moment().subtract(day - 1, 'days').format('L'); //change day-1 to 0 after running cron job successfully
            const preGain = await profitRepo.find({ userId: userId, date: previousDate });

            if (preGain) {
                total_gain = total_gain + preGain.profit;
            }


            for (let i in stocks) {
                const stock = stocks[i];
                total_gain = total_gain + await module.exports.calculateGain(stock.propertyId, stock.quantity, day);
                balance = balance + await module.exports.calculateBalance(stock.propertyId, stock.quantity);

            }
            await profitRepo.create({
                userId: userId,
                profit: total_gain,
                date: date,
                balance: balance,
                sort_date: epochWithoutTime((new Date(date).getTime() / 1000))
            });

            console.log("done ================================" + u);
            console.log("balance: " + balance);
            console.log("total profit: " + total_gain);
            console.log(users[u].username);
        }

        console.log("DOOONE");


    },

    calculateGain: async (propertyId, qty, day) => {
        const previousDate = moment().subtract(day, 'days').format('L');//remove day and put 1 after cron job

        const yesterday_price = await priceRepo.findAll({ date: previousDate, propertyId: propertyId });
        const property = await propertyRepository.findById(propertyId);



        return qty * (property.price - yesterday_price[0].price);
    },

    calculateBalance: async (propertyId, qty) => {
        const prop = await propertyRepository.findById(propertyId);
        return prop.price * qty;
    }


}

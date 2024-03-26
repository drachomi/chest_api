const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const propertyRepository = require("../repositories/property");
const userstockRepo = require("../repositories/userstock");
const userRepo = require("../repositories/user");
const moment = require("moment");
const presellRepo = require("../repositories/presellstock");
const { credit, creditIBO } = require("./WalletService");
const { PROPERTY_APPROVAL_STATUS } = require("../utils/constants");
const { utils } = require("../services/Email");


module.exports = {
    doPresellActions: async () => {
        let today = new Date().toISOString().slice(0, 10);
        try {
            const properties = await propertyRepository.findAll(
                {
                    presellExpiresAt: {
                        [Op.substring]: today
                    }
                }
            );


            if (!properties[0]) {
                console.log("empty properties");
                return false;
            }

            console.log("Aout to do presell actions");

            for (let p in properties) {
                let property = properties[p];
                console.log("OOOOOOOOO fecthed props")

                if (property.presellMinUnit > property.sold) {
                    //Presell failed return users money or send email to admin
                    await module.exports.returnUserMoney(property);

                    //Change the property status to failed presell
                    await propertyRepository.updateById(property.id, { approvalStatus: PROPERTY_APPROVAL_STATUS.PRESELL_FAILED })



                } else {
                    //Presell successful
                    await module.exports.convertPresellToStock(property);
                    await module.exports.creditIBO(property);
                    //Change presell status to false, so it's picked up by normal jobs
                    // await propertyRepository.updateById(property.id,{isPresell: false});
                }





            }


            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    convertPresellToStock: async (property) => {
        console.log("CCCCCCCCCCC convert")

        try {
            let presellStocks = await presellRepo.findAll({ propertyId: property.id });

            for (let p in presellStocks) {
                let presell = presellStocks[p];
                await userstockRepo.create(presell.dataValues);
                //Send email to alert user that sales has taken place

                let user = await userRepo.findById(presell.userId);
                let message = `We want to inform you that presell on the property: ${property.name} was  successful. You can check your balance on your portfolio.`;
                await utils(user.email, message, "Presell Success");

            }

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }

    },

    returnUserMoney: async (property) => {

        try {
            let presaleStocks = await presellRepo.findAll({ propertyId: property.id });
            for (let s in presaleStocks) {
                let pr = presaleStocks[s];
                await credit({ id: pr.userId, amount: pr.price, narration: "Reversal for presale stock bought in property: " + pr.property });
                let user = await userRepo.findById(pr.userId);
                let message = `We want to inform you that presell on the property: ${property.name} was not successful. Funds has reversed to your wallet.`;
                await utils(user.email, message, "Presell failed");
                //Email user about failure
                console.log("Presell stock count is: " + s);
                console.log("User email is " + user.email);
            }

            return true;
        } catch (error) {
            return false;
        }

    },
    creditIBO: async (property) => {
        let amount = property.sold * property.price;
        await creditIBO({ id: property.companyId, amount: amount, narration: " Presell completion for property: " + property.name });
    }





}

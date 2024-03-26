const emailfile = require('./EmailFile');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const userRepository = require("../repositories/user");
const walletRepo = require("../repositories/wallet");
const axios = require('axios');



module.exports = {

    createNuban: async (obj) => {
        console.log("About to create nuban")
        let params = { "customer": obj.customer_code, "preferred_bank": "wema-bank" }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.PAYSTACK_SECKEY
        }

        try {
            const response = await axios.post("https://api.paystack.co/dedicated_account", params, { headers: headers });
            console.log("responding---")
            console.log(response.data);
            if (response.data.status) {

                let customer = response.data.data.customer;
                let bank = response.data.data.bank;
                let update_record = {
                    first_name: customer.first_name,
                    last_name: customer.last_name,
                }


                console.log("about to update...")


                await userRepository.updateById(obj.user_id, update_record);
                await walletRepo.create({ nuban: response.data.data.account_number, nubanBank: bank.name, accountName: response.data.data.account_name,userId:obj.user_id,balance:0 })
                return true;
            }

            return false;

        } catch (err) {
            console.log(err);
            return false;
        }

    },
    createCustomer: async (obj) => {
        let data = {
            email: obj.email,
            first_name: obj.first_name,
            last_name: obj.last_name,
            phone: obj.phone
        }
        const key = process.env.PAYSTACK_SECKEY;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + key
        }

        try {
            const response = await axios.post("https://api.paystack.co/customer", data, { headers: headers });
            //console.log(response.data);
            await userRepository.updateById(obj.user_id, {phone:obj.phone});

            if (response.data.status) {
                return response.data.data.customer_code;
            }

            return false;

        } catch (err) {
            console.log(err);
            return false;
        }

    },
    identifyCustomer: async (obj, customer_code) => {
        const params = JSON.stringify({
            "country": "NG",
            "type": "bank_account",
            "account_number": obj.account_number,
            "bvn": obj.bvn,
            "bank_code": obj.bank_code,
            "first_name": obj.first_name,
            "last_name": obj.last_name
        })

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.PAYSTACK_SECKEY
        }

        try {
            const response = await axios.post("https://api.paystack.co/customer/" + customer_code + "/identification", params, { headers: headers });
            console.log(response.data);
            if (response.data.status) {
                return 0;
            }

            return false;

        } catch (err) {
            console.log(err);
            if (err.toString().includes('Customer already validated using the same credentials')) {
                console.log("returning one");
                return 1;
            }
            return false;
        }

    },
    bankCode: async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.PAYSTACK_SECKEY
        }


        try {
            const response = await axios.get("https://api.paystack.co/bank?country=nigeria", { headers: headers });
            console.log(response);
            if (response.data.status) {
                let array = [];
                let data = response.data.data;
                for (let i = 0; i < data.length; i++) {
                    let bank = data[i];
                    array.push({
                        name: bank.name,
                        code: bank.code
                    })
                }
                return array;
            }

            return false;


        } catch (err) {
            console.log(err);
            return false;
        }
    },
    updateCustomer: async (obj,code) => {
        let data = {
            phone: obj.phone
        }
        const key = process.env.PAYSTACK_SECKEY;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + key
        }

        try {
            const response = await axios.put("https://api.paystack.co/customer/"+code, data, { headers: headers });
            //console.log(response.data);
            console.log("Updated customer");

            if (response.data.status) {
                return true;
            }

            return false;

        } catch (err) {
            console.log(err);
            return false;
        }

    },
    nameEnquiry:async(obj)=>{
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.PAYSTACK_SECKEY
        }
        try{
            const response = await axios.get("https://api.paystack.co/bank/resolve?account_number=" + obj.nuban + "&bank_code=" +obj.code, { headers: headers });
            console.log(response);
            if (response.data.status){
                return response.data.data;
            }
            return false;


        }catch(err){
            console.log(err);
            return false;
        }
    }
    


}
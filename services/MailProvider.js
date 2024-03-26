const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});


module.exports = {
    mailGun: async(data) =>{
        try{
            await mg.messages.create("mg.cribstock.com", data);
            console.log('Email sent')
        }catch(error){
            console.log(error);
        }

    },
    sendGrid: async(data) =>{
        try{
            await sgMail.send(data);
            console.log('Email sent')
        }catch(error){
            console.log(error);
        }

    },
    sendMultiple: async(data) =>{
        try{
            await sgMail.sendMultiple(data);
            console.log('Email sent')
        }catch(error){
            console.error({a:error.response.body.errors})
        }

    }

    

}

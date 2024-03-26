const emailfile = require('./EmailFile');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {mailGun, sendGrid, sendMultiple} = require("./MailProvider");



module.exports = {
    welcome: async(name, email) =>{
        let link ='https://www.cribstock.com';

        let html = emailfile.welcome(name, link)

        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: email,
            subject: "Welcome to Cribstocks",
            html: html
        };
        sgMail
            .send(data)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

    },
    fundByCard: async(name, email) =>{
        let link ='https://www.cribstock.com';
        console.log({email})
        let html = emailfile.fundWithCard(name,link)

        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: [...email],
            subject: "Improved feature: Card Funding Options",
            html: html
        };

        sgMail
        .sendMultiple(data)
        .then(() => {
            console.log(`Email Sent`)
        })
        .catch((error) => {
            console.error({a:error.response.body.errors})
        })



        /**sgMail
            .send(data)
            .then(() => {
                console.log('Fund With Card Email Sent')
            })
            .catch((error) => {
                console.error(error)
            })**/

    },

    newsletter: function(email) {

        let html = emailfile.newsletter();

        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: email,
            subject: "Newsletter subscribed",
            html: html
        };
        sgMail
            .send(data)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

    },

    resetPassword: async(email,code)=> {

        let html = emailfile.resetpassword(code);

        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: email,
            subject: "Password Reset",
            html: html
        };
        sgMail
            .send(data)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

    },

    sendOtp: async(email,code)=> {
        console.log(email + "seeee")
        let html = emailfile.sendOtp(code);

        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: email,
            subject: "Verify Details",
            html: html
        };
        sgMail
            .send(data)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

    },
    utils: async(email,message,subject)=> {
        console.log("entered email "+email);
        let html = emailfile.utils(message,subject);

        //console.log(html);

        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: email,
            subject: subject,
            html: html
        };

        //console.log(data);
        sgMail
            .send(data)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

    },
    
    segment: async(email,message,subject)=> {
        console.log("entered email segments");
        let html = emailfile.utils(message,subject);

        //console.log(html);

        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: [...email],
            subject: subject,
            html: html
        };

        //console.log(data);
        sgMail
            .sendMultiple(data)
            .then(() => {
                console.log(`${subject} Email Sent`)
            })
            .catch((error) => {
                console.error({a:error.response.body.errors})
            })

    },
    onboardingSeries: async(email,name,day)=> {
        console.log(day);
        let html;
        let subject;
        switch(day){
            case 1:
                html = emailfile.onboard_1(name);
                subject = name + " We are happy to have you.";
                break;
            case 2:
                html = emailfile.onboard_2(name);
                subject = name + " how can you fund your wallet?";
                break;
            case 3:
                html = emailfile.onboard_3(name);
                subject = name + " don't sleep on this properties";
                break;
            case 4:
                html = emailfile.onboard_4(name);
                subject = name + " let me tell you about our trade center";
                break;
            case 5:
                html = emailfile.onboard_5(name);
                subject = name + " see how liquidation works on cribstock";
                break;
            case 6:
                html = emailfile.onboard_6(name);
                subject = "Just a brief recap for you";
                break;
            default:
                html = emailfile.onboard_6(name);
                subject = "Its great to have you";

        }

        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: email,
            subject: subject,
            html: html
        };
        email.includes("yahoo")? await mailGun(data) : await sendGrid(data);

    },
    templateEmail:async(obj)=>{
        let dynamicData = {name: obj.name};
        const data = {
            from: "Dami from Cribstock <hello@cribstock.com>",
            to: obj.email,
            dynamicTemplateData: dynamicData,
            templateId:"d-a6b63e9847ea464da8b79847fc855d85"
        };

        console.log(obj);
        try{
            await sendGrid(data)
            console.log("sent");
        }catch(err){
            console.log(err);
        }


    }
}

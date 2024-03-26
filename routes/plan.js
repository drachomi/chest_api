const express = require("express");
const router = express.Router();
const errorHandler = require("../handlers/error");
const { isIbo, user, isAdmin } = require("../middlewares/auth");
const emailService = require("../services/Email");
const planRepo = require("../repositories/plan");
const userRepo = require("../repositories/user");
const { Op } = require("sequelize");
const Flutterwave = require("flutterwave-node-v3");
const { MetadataService } = require("aws-sdk");
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECKEY);
/**
 * user must be able to create plan /
 * user must be able to get plan /
 * user must be able to edit their plan /
 * the system should debit the user at the right time
 * the system should retry debiting the user if first time failed
 *
 */

router.post("/create", user, async (req, res) => {
  try {
    let { goal_amount, frequency, every, duration_in_months } = req.body; //duration comes in months
    let duration = duration_in_months;
    let myPlan = await planRepo.find({
      userId: req.user.id,
      status: { [Op.notIn]: ["deleted", "paused", "stopped"] },
    });
    console.log({ myPlan });
    if (myPlan)
      return res
        .status(400)
        .send({ success: false, message: "user already has a plan", data: { plan: myPlan } });
    if (!goal_amount || !frequency || !duration)
      return res.status(400).send({ success: false, message: "supply all values", data: {} });
    //id,userId,amount,frequency['weekly','monthly'],status['new','charged','retry','paused','deleted'],next[date],every[weekly:anyDayofTheWeek,monthly:specifiedDateOfTheMonth]
    let rounds = () => {
      return frequency == "weekly" ? duration * 4 : duration;
    };
    if (frequency == "monthly") {
      amount = Number(goal_amount) / rounds();
      let month = new Date().getMonth() + 1;
      month = month > 9 ? `${month}` : `0${month}`;
      every = `${month}/10`;
    } else if (frequency == "weekly") {
      amount = Math.ceil(Number(goal_amount) / rounds());
      let daysOfTheWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      let dayOfTheWeek = new Date();
      dayOfTheWeek = dayOfTheWeek.getDay();
      dayOfTheWeek = daysOfTheWeek[dayOfTheWeek];
      every = dayOfTheWeek || "wednesday";
    }
    let roundsDone = 0,
      roundsRemaining = rounds();
    /*roundsRemaining = () =>{
        return frequency = 'weekly'? duration * 4 : duration
    } */
    let userId = req.user.id;

    let validObj = planDetailsValidation(every, frequency);
    if (validObj.errMessage)
      return res.status(400).send({ success: false, message: validObj.errMessage, data: {} });
    every = validObj.every; //every.slice(0,5)
    let newplan = await planRepo.create({
      goal_amount,
      duration,
      amount,
      frequency,
      every,
      userId,
      roundsDone,
      roundsRemaining,
      email: req.user.email,
    });
    if (!newplan)
      res.status(400).send({ success: false, message: "creating plan failed", data: {} });
    res.status(200).send({ success: true, message: "plan created", data: { plan: newplan } });
  } catch (error) {
    console.log({ error });
    return res.status(400).send({ success: false, message: "error creating plan", data: {} });
  }
});

router.get("/user/:userid", user, async (req, res) => {
  try {
    let { userid } = req.params;
    let plan = await planRepo.find({ userId: userid, status: { [Op.not]: "deleted" } });
    if (!plan)
      return res.status(200).send({ success: true, message: "plan unavailable", data: {} });
    return res.status(200).send({ success: true, message: "user`s plan", data: { plan } });
  } catch (error) {
    console.log({ error });
    return res.status(400).send({ success: false, message: "error getting plan", data: {} });
  }
});

router.patch("/update/:planid", user, async (req, res) => {
  let { amount, frequency, every, status } = req.body;
  let statusOptions = ["stopped", "deleted"];
  if (status && statusOptions.indexOf(status) < 0)
    return res
      .status(400)
      .send({ success: false, message: "you can only delete or stop a plan", data: {} });

  try {
    let { planid } = req.params;
    let plan = await planRepo.findById(planid);
    console.log({ plan });
    if (!plan) {
      return res.status(404).send({ success: false, message: "plan not found", data: {} });
    } else if (plan && plan.userId != req.user.id) {
      return res.status(400).send({ success: false, message: "unauthorised edit", data: {} });
    }

    let validObj = planDetailsValidation(every, frequency);
    if (validObj.errMessage)
      return res.status(400).send({ success: false, message: validObj.errMessage, data: {} });
    every = validObj.every; //every.slice(0,5)

    let updatePlan = await planRepo.updateById(planid, { amount, frequency, every, status });
    console.log({ updatePlan });
    if (!updatePlan)
      return res.status(400).send({ success: false, message: "error editing plan", data: {} });
    let latestPlan = await planRepo.findById(planid);
    if (!latestPlan) return res.status(400).send({ success: false, message: "error p0", data: {} });
    let action = status ? status : "edited";
    return res
      .status(200)
      .send({ success: true, message: `plan ${action} successfully`, data: { plan: latestPlan } });
  } catch (error) {
    console.log({ error });
    return res.status(400).send({ success: false, message: "error editing plan", data: {} });
  }
});

router.post("/initiate", user, async (req, res) => {
  try {
    let redirect_url = process.env.APP_BASE_URL + "/pay/redirect";
    let enckey = process.env.FLW_ENCRYPTION_KEY;
    let randa = Math.floor(Math.random() * 900987);
    let randb = Math.floor(Math.random() * 997698);
    let tx_ref = `PF${randb}${new Date().getTime()}${randa}`;
    let { firstName, lastName, email } = req.user;
    let myPlan = await planRepo.find({ userId: req.user.id });

    let { card_number, cvv, expiry_month, currency = "NGN", amount, fullname } = req.body;
    if (myPlan.amount !== amount)
      return res.status(400).send({
        success: false,
        message: "inputted amount is not consistent with the plan",
        data: {},
      });

    if (req.body.flw_ref && req.body.otp) {
      //validate ongoing transaction

      const response = await flw.Charge.validate({
        otp: req.body.otp,
        flw_ref: req.body.tx_ref,
      });

      //verify inside webhook, remember to store token from payload for later debits
    }

    if (req.body.tx_ref) {
      //this is an ongoing trans
      const savedpayload = cache.getAsync(tx_ref + "_plancard");
      let response = await flw.Charge.card({ ...savedpayload, ...req.body }); //req body here is expected to be different from the body up there
      switch (response?.meta?.authorization?.mode) {
        case "otp":
          // Show the user a form to enter the OTP
          let note =
            "collect OTP sent to user via field `otp`and call this same endpoint back with the otp field, also include the flw_ref in your return body";
          let flw_ref = response.data.flw_ref;
          return res
            .status(200)
            .send({ success: true, message: "enter OTP", note, data: { flw_ref } });
        //req.session.flw_ref = response.data.flw_ref;
        //return res.redirect('/pay/validate');
        case "redirect":
          const authUrl = response.meta.authorization.redirect;
          return res.status(200).send({
            success: true,
            message: "going to your bank...",
            note: "redirect user to the provided authUrl",
            data: { authUrl },
          }); //return res.redirect(authUrl);
        default:
          // No validation needed; just verify the payment
          const transactionId = response.data.id;
          return res
            .status(200)
            .send({ success: true, message: "payment update sent to your box", data: {} });
        /**const transaction = await flw.Transaction.verify({ id: transactionId });
                    if (transaction.data.status == "successful") {
                        return res.redirect('/payment-successful');
                    } else if (transaction.data.status == "pending") {
                        // Schedule a job that polls for the status of the payment every 10 minutes
                        transactionVerificationQueue.add({id: transactionId});
                        return res.redirect('/payment-processing');
                    } else {
                        return res.redirect('/payment-failed');
                    }*/
      }
    }

    let payload = {
      firstName,
      lastName,
      email,
      card_number,
      cvv,
      expiry_month,
      currency,
      amount,
      fullname,
      tx_ref,
      redirect_url,
      enckey,
    };
    let response = await flw.Charge.card(payload);
    switch (response?.meta?.authorization?.mode) {
      case "pin":
      case "avs_noauth":
        // Store the current payload
        req.session.charge_payload = payload;
        // Now we'll show the user a form to enter
        // the requested fields (PIN or billing details)
        req.session.auth_fields = response.meta.authorization.fields;
        req.session.auth_mode = response.meta.authorization.mode;
        await cache.setAsync(tx_ref + "_plancard", payload, "EX", 60 * 15);
        return res.status(200).send({
          success: true,
          message: "fill this to proceed",
          note:
            "call this same endpoint back with the required fields, also include the tx_ref in your return body",
          data: { fields: response.meta.authorization.fields, tx_ref },
        }); //res.redirect('/pay/authorize');
      case "redirect":
        // Store the transaction ID, so we can look it up later with the flw_ref
        await cache.setAsync(tx_ref + "_plancard", payload, "EX", 60 * 15);
        // Auth type is redirect, so just redirect to the customer's bank
        const authUrl = response.meta.authorization.redirect;
        return res.status(200).send({
          success: true,
          message: "redirecting to your bank...",
          note: "redirect user to the provided authUrl",
          data: { authUrl },
        }); //return res.redirect(authUrl);
      default:
        // No authorization needed; just verify the payment - or handle in webhook
        const transactionId = response.data.id;
        //const transaction = await flw.Transaction.verify({ id: transactionId });
        return res.status(200).send({ success: true, message: "payment...", data: {} });
      /**if (transaction.data.status == "successful") {
                    return res.redirect('/payment-successful');
                } else if (transaction.data.status == "pending") {
                    // Schedule a job that polls for the status of the payment every 10 minutes
                    transactionVerificationQueue.add({id: transactionId});
                    return res.redirect('/payment-processing');
                } else {
                    return res.redirect('/payment-failed');
                }*/
    }
  } catch (error) {
    console.log({ error });
    emailService.utils(
      "adekolaabdwahababisoye@gmail.com",
      `here is the error inside plan -----\n----\n----\n ${error} `,
      "Error inside plan"
    );
    return res
      .status(400)
      .send({ success: false, message: "initiate plan charge failed", data: {} });
  }
});

function planDetailsValidation(every, frequency) {
  console.log({ every, frequency });
  let daysOfTheWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  if (frequency == "monthly" && (!new Date(every).getTime() || every.length != 5)) {
    let errMessage = "`every` has to be mm/dd for `monthly`";
    return { errMessage };
    //return res.status(400).send({success:false, message:'`every` has to be mm/dd/yyyy for `monthly`', data:{}})
  } else if (frequency == "monthly") {
    every = every.slice(0, 5);
  }
  if (frequency == "weekly" && daysOfTheWeek.indexOf(every.toLowerCase()) < 0) {
    console.log({ every });
    let errMessage = "`every` has to be a day of the week";
    return { errMessage };
    //return res.status(400).send({success:false, message:'`every` has to be a day of the week', data:{}})
  } else if (frequency == "weekly") {
  }

  return { every };
}

router.post("/verify-payment", async (req, res) => {
  let { transactionId } = req.body;
  let trans = await flw.Transaction.verify({ id: transactionId });
  console.log({ trans });
  res.status(200).send({ trans });
});

async function verifyPayment() {
  let trans = await flw.Transaction.verify({ id: "16629267252470.7gaubq" }); //transactionId
  console.log({ trans });
}

verifyPayment();

module.exports = { router };

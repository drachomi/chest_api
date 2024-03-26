const express = require("express");

const router = express.Router();
const crypto = require("crypto");
const moment = require("moment");
const { Op } = require("sequelize");
const emailService = require("../services/Email");
const walletRepo = require("../repositories/wallet");
const userRepo = require("../repositories/user");
const transactionRepo = require("../repositories/transaction");
const paystack = require("../services/Paystack");
const walletService = require("../services/WalletService");
const firstfundings = require("../repositories/firstfundings");
const planRepo = require("../repositories/plan");
const { normalizeDate } = require("../utils/date");

router.post("/paystack", async (req, res) => {
  console.log("entered this paystacks");
  console.log({ time: new Date(), request: req.body, process: "Paystack hook" });

  const secret = process.env.PAYSTACK_SECKEY;
  const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(req.body)).digest("hex");

  if (hash == null) {
    return res.status(200).send({ success: true });
  }
  const event = req.body;
  const { body } = req;

  console.log("72");
  if (event.event === "customeridentification.success") {
    const user = await userRepo.find({ email: event.data.email });
    await paystack.createNuban({ user_id: user.id, customer_code: event.data.customer_code });

    const message =
      "Hi, your wallet and account number has been created successfully, kindly log into your account to view and continue making transactions";
    try {
      emailService.utils(event.data.email, message, "Wallet Created");
    } catch (err) {
      console.log(err);
    }
    return res.status(200).send({ success: true });
  }

  if (event.data.status != "success") {
    return res.status(200).send({ success: true });
  }
  if (event.data.channel === "dedicated_nuban") {
    const nuban = event.data.authorization.receiver_bank_account_number;
    const amount = event.data.amount / 100;

    try {
      const wallet = await walletRepo.findByNuban(nuban);
      const user = await userRepo.findById(wallet.userId);
      const txId = `pyst${event.data.reference}`;

      // Fund users wallet
      await walletService.credit({
        id: user.id,
        amount: Number(amount),
        category: "wallet-funding-pysk",
        narration: "Wallet funding via transfer",
        txid: txId,
      });

      // Debit wallet pool account
      await walletService.debit({
        id: process.env.POOL_ACCOUNT_USER_ID,
        amount: Number(amount),
        category: "wallet-funding-pysk",
        narration: `Wallet funding via transfer for ${user.id}`,
        txid: txId,
      });

      const message = `Hi, Your wallet was funded successfully with ${amount}, kindly check your dashboard for balance`;
      emailService.utils(user.email, message, "Wallet Funding Success");

      return res.status(200).send({ success: true });
    } catch (err) {
      console.log(err);

      return res.status(200).send({ success: true });
    }
  }

  if (body.event == "transfer.success") {
    const { amount } = body.data;
    const txId = body.data.reference;
    const { email } = body.data.recipient;

    // down here should be a function later
    const user = await userRepo.findByEmail(email);
    if (!amount || !txId || !email) return res.status(200).send({ success: true });
    const tx = await transactionRepo.findByTxId(txId);
    if (tx) {
      console.log(`${txId} has been treated before`);
      return res.status(200).send({ success: true });
    }
    const wallet = await walletRepo.findByUserId(user.dataValues.id);
    const creditObj = {
      id: user.dataValues.id,
      amount,
      narration: "Wallet funding via transfer",
      txid: txId,
    };
    const creditUser = await walletService.credit(creditObj);

    const message = `Hi, Your wallet was funded successfully with ${amount}, kindly check your dashboard for balance`;
    emailService.utils(user.dataValues.email, message, "Wallet Funding Success");

    const regularFunder = transactionRepo.findAll({ userId: user.dataValues.id });
    if (!regularFunder) {
      // a first time funder
      await firstfundings.create({ amount, userId: user.dataValues.id });
    }
  }

  if (body.event == "customeridentification.failed") {
    const { email } = body.data;
    const user = await userRepo.findByEmail(email);
    const { firstName } = user.dataValues;
    const message = `<p>Hi ${firstName}</p>, 
                    <p>At least one of the BVN and account number that you provided for verifiaction is not valid.</p>
                    <p>Kindly review and provide accurate and valid details.</p>
                    <p>Best Regards</p>`;
    emailService.utils(user.dataValues.email, message, "Your Identity Could not be Validated");
  } else if (body.event == "customeridentification.success") {
    const { email } = body.data;
    const user = await userRepo.findByEmail(email);
    const { firstName } = user.dataValues;

    const wallet = await createNuban({
      user_id: user.dataValues.id,
      customer_code: user.dataValues.pstack_customer_code,
    });
    if (wallet) {
      const message = `<p>Hi ${firstName}</p>, 
      <p>Your details (BVN/Account NUmber) have been validated successfully and a dedicated bank account number has been created for your Cribstock operations!</p>
      <p>Kindly log into your dashboard for details about your Cribstock Dedicated Account Number.</p>
      <p>Best Regards</p>`;
      await emailService.utils(
        user.dataValues.email,
        message,
        "Account Number and Identity Validation was Successful"
      );
    }
  }
  console.log(req.body.message);
  if (body.event == "charge.success" || req.body.message === "Charge attempted") {
    try {
      console.log({ pskPayload: body });
      console.log({ customer: body.data.customer, auth: body.data.authorization });
      const channel = "card";
      const { email } = body.data.customer;
      const user = await userRepo.findByEmail(email);
      let { amount } = body.data;
      amount /= 100; // convert to naira, expected kobo from paystack
      console.log({ body });
      const meta = body.metadata || body.data.metadata;
      console.log({ meta });
      const txId = meta.transId || event.data.reference; // event.data.reference ||
      console.log("paystack card txid ", txId);
      const { id, frequency, next, every, status } = await planRepo.find({
        userId: user.dataValues.id,
        status: { [Op.notIn]: ["deleted", "paused", "stopped"] },
      });
      console.log({
        id,
        frequency,
        next,
        every,
        status,
      });
      if (body.data.status != "success") {
        if (txId.slice(0, 2) == "PF" || req.body.message === "Charge attempted") {
          // a funding for PLAN
          console.log({ retry: "retry retry re try" });
          await planRepo.updateById(id, { status: "retry" });
        }
        return res.status(200).send({});
      }

      const userPlan = await planRepo.findById(id);
      console.log({
        amount,
        planAmounta: userPlan.amount,
        userPlan,
        logic: amount >= userPlan.amount,
        lagic: userPlan && amount >= userPlan.amount,
      });
      // if (userPlan && amount >= userPlan.amount) {
      console.log("doing");
      await planRepo.updateById(id, {
        pskCardToken: body.data.authorization.authorization_code,
        cardLast4: body.data.authorization.last4,
      });
      const card_token = await walletRepo.updateByUserId(user.dataValues.id, {
        pskCardToken: body.data.authorization.authorization_code,
      });
      // }
      // down here should be a function later
      console.log({ amount, txId, email });
      const { firstName } = user.dataValues;
      if (!amount || !txId || !email) return res.status(200).send({ success: true, here: 03 });
      const tx = await transactionRepo.findByTxId(txId);
      console.log({ tx });
      if (tx) {
        console.log(`${txId} has been treated before`);
        return res.status(200).send({ success: true });
      }

      const wallet = await walletRepo.findByUserId(user.dataValues.id);
      console.log({ wallet, user: user.dataValues, userId: user.dataValues.id });
      const forPlanMarker =
        txId.slice(0, 2) == "PF" || req.body.message === "Charge attempted" ? " for plan" : "";
      const creditObj = {
        id: user.dataValues.id,
        amount: Math.min(userPlan.amount, amount), //take the minimum
        category: "wallet-funding-psk-card",
        narration: `Wallet funding via ${channel}${forPlanMarker}`,
        txid: txId,
      };
      const creditObjExtra = {
        id: user.dataValues.id,
        amount: amount - userPlan.amount,
        category: "wallet-funding-psk-card",
        narration: `Extra from Wallet funding via ${channel}${forPlanMarker}`,
        txid: txId,
      };
      const creditUser = await walletService.credit(creditObj);
      console.log({ creditUser });
      if (userPlan.amount < amount) {
        const creditUserExtra = await walletService.credit(creditObjExtra);
      }
      if (txId.slice(0, 2) == "PF" || req.body.message === "Charge attempted") {
        // a funding for PLAN - paystack vendor
        let { id, frequency, next, every, roundsDone, roundsRemaining } = await planRepo.find({
          userId: user.dataValues.id,
          status: { [Op.notIn]: ["deleted", "paused", "stopped"] },
        });
        console.log({
          next,
          every,
          frequency,
          roundsDone,
          roundsRemaining,
        });
        if (frequency == "weekly" && userPlan.amount <= amount) {
          next = every;
          console.log({ next, every });
          await planRepo.updateById(id, {
            status: "charged",
            next,
            roundsDone: ++roundsDone,
            roundsRemaining: --roundsRemaining,
          });
        } else {
          console.log({ there: "week" });
        }
        if (frequency == "monthly" && userPlan.amount <= amount) {
          const nextDay = every.slice(3, 5);
          let nextMonth = Number(every.slice(0, 2));
          nextMonth =
            nextMonth + 1 > 12
              ? "01"
              : nextMonth + 1 > 9
              ? `${nextMonth + 1}`
              : `0${nextMonth + 1}`;
          next = `${nextMonth}/${nextDay}`;
          console.log({ next });
          await planRepo.updateById(id, {
            status: "charged",
            next,
            roundsDone: ++roundsDone,
            roundsRemaining: --roundsRemaining,
          });
        } else {
          console.log({ here: "month" });
        }
        if (frequency == "daily" && userPlan.amount <= amount) {
          let today = new Date();
          let dateObj = normalizeDate(today);
          let tomorrowEpoch = dateObj.dateEpoch + 1000 * 60 * 60 * 24;
          let tomorrowLong = new Date(tomorrowEpoch);
          let tomorrowShort = normalizeDate(tomorrowLong, "short");
          let tomorrowDay = Number(tomorrowShort.slice(8, 10));
          let tomorrowMonth = Number(tomorrowShort.slice(5, 7));
          next = `${tomorrowMonth}/${tomorrowDay}`;
          console.log({ next });
          await planRepo.updateById(id, {
            status: "charged",
            next,
            roundsDone: ++roundsDone,
            roundsRemaining: --roundsRemaining,
          });
        } else {
          console.log({ here: "daily" });
        }

        // await planRepo.updateById(id,{status:'charged',next})
      }

      const message = `Hi, Your wallet was funded successfully with ${amount}, kindly check your dashboard for balance`;
      emailService.utils(user.dataValues.email, message, "Wallet Funding Success");

      const regularFunder = transactionRepo.findAll({ userId: user.dataValues.id });
      if (!regularFunder) {
        // a first time funder
        await firstfundings.create({ amount, userId: user.dataValues.id });
      }
    } catch (error) {
      console.log({ error });
      return res.status(200).send({ success: true });
    }
  }
  console.log("after");
  return res.status(200).send({ success: true });
});

module.exports = router;

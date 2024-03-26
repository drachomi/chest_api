const express = require("express");

const router = express.Router();
const crypto = require("crypto");
const moment = require("moment");
const { Op } = require("sequelize");
const emailService = require("../services/Email");
const walletRepo = require("../repositories/wallet");
const userRepo = require("../repositories/user");
const transactionRepo = require("../repositories/transaction");
const walletService = require("../services/WalletService");
const firstfundings = require("../repositories/firstfundings");
const planRepo = require("../repositories/plan");

router.post("/lazerpay", async (req, res) => {
  const secret = process.env.LZPY_SECRET_KEY;
  var hash = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body), 'utf8').digest('hex');

  if (hash != req.headers['x-lazerpay-signature']){
    //Request is not from lazerpay
    return res.status(401).send({});
  }
 

  const event = req.body;

  try {
    // if tx succeeded
    if (event.status === "confirmed") {
      console.log("successful transaction");
      const amount = event.amountPaidFiat;
      const txId = "Lz"+event.reference;
      const { email } = event.customer;

      const user = await userRepo.findByEmail(email);

      console.log(`user found: ${user}`);
      console.log(user);

      if (!amount || !txId || !email) return res.status(200).send({ success: true });

      console.log("proceed to transacation tx");

      const tx = await transactionRepo.findByTxId(txId);

      // check if the tx has been treated
      if (tx) {
        console.log(`${txId} has been treated before`);
        return res.status(200).send({ success: true });
      }

      const channel = "crypto";

      // Fund users wallet
       await walletService.credit({
        id: user.dataValues.id,
        amount: Number(amount),
        category: "wallet-funding-crypto",
        narration: `Wallet funding via ${channel}`,
        txid: txId,
      });

      const regularFunder = await transactionRepo.findAll({ userId: user.dataValues.id });
      console.log({ regularFunder });
      if (regularFunder.length == 1) {
        // a first time funder
        await firstfundings.create({ amount, userId: user.dataValues.id });
      }

      // Debit wallet pool account
      await walletService.debit({
        id: process.env.POOL_ACCOUNT_USER_ID,
        amount: Number(amount),
        category: "wallet-funding-crypto",
        narration: `Wallet funding via ${channel} for ${user.dataValues.id}`,
        txid: txId,
      });

      const message = `Hi, Your wallet was funded successfully with ${amount}, kindly check your dashboard for balance`;
      emailService.utils(user.dataValues.email, message, "Wallet Funding Success");
      console.log("email sent");
    }

    // if tx failed
    if (event.status === "FAILED") {
      console.log(
        `transfer with ref: ${event.reference} failed because: ${event.complete_message}.`
      );

      try {
        const user = await userRepo.findById(user.dataValues.id);
        const message = `Hi, Sadly, the transfer for wallet funding failed because ${event.complete_message}. Kindly check your dashboard for your balance.`;
        emailService.utils(user.dataValues.email, message, "Wallet Funding Failed");
      } catch (err) {
        console.log("error while handling failed transfer: ", err);
      }
    }

  
  } catch (error) {
    console.log({ error });
  }

  return res.status(200).send({ success: true });
});

module.exports = router;

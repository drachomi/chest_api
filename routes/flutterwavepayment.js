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
const withdrawalRepo = require("../repositories/withdrawal");
const Flutterwave = require("flutterwave-node-v3");

router.post("/flutterwave", async (req, res) => {
  const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECKEY);
  console.log("ri");

  console.log("payment vendor calling...");
  console.log({ time: new Date(), request: req.body, process: "Flutterwave hook" });
  console.log(req.body.meta);

  // Only do this check in production
  // Flw does not send it for their test environment.
  if (process.env.NODE_ENV === "production") { 

    const secret = process.env.FLW_SECRET_HASH;
    const signature = req.headers["verif-hash"];

    if (!signature || signature !== secret) {
      // This request isn't from Flutterwave discard
      return res.status(401).send({});
    }
  }
  
  let event = req.body;

  try {

    // Default handler. Request is assumed to be a wallet funding.
    // for now, only funding comes with 'id' and 'status' at the root.
    if (event['id'] && event['status']) {
      
      // First handle general failed cases.
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

        return res.status(200).send({});
      }
      

      // Fetch the transaction details using the ID to access the meta information
      // This will help determine if it is IBO or normal wallet funding.
      let flwTrn = await flw.Transaction.verify({id: event.id});
      console.log(flwTrn);

      flwTrn = flwTrn.data;
      console.log("VVVVVVVVVVVVVVME");

      //If it is an IBO funding
      if(flwTrn.meta.from_ibo ){
        console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
        let company_id = flwTrn.meta.company_id;
        const txId = event.flwRef;
        const { email } = event.customer;
        const { amount } = event;
        // let channel = event.data.bank_name ? "transfer" : "card";
        const channel = event["event.type"] == "CARD_TRANSACTION" ? "card" : "transfer";
        // Fund users wallet
         await walletService.creditIBO({
          id: company_id,
          amount: Number(amount),
          category: "wallet-funding-ftw",
          narration: `Wallet funding via ${channel}`,
          txid: txId,
        });

        // Debit wallet pool account
        await walletService.debit({
          id: process.env.POOL_ACCOUNT_USER_ID,
          amount: Number(amount),
          category: "wallet-funding-ftw",
          narration: `Wallet funding via ${channel} for Ibo companyId:  ${company_id}`,
          txid: txId,
        });

        const message = `Hi, Your wallet was funded successfully with ${amount}, kindly check your dashboard for balance`;
        emailService.utils(email, message, "Wallet Funding Success");
        console.log("email sent");

        return res.status(200).send({});
      }

      // If it not IBO, then it is a normal wallet funding.
      // if tx succeeded
      if (event.status === "successful") {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
        console.log("successful transaction");
        const { amount } = event;
        const txId = event.flwRef;
        const { email } = event.customer;
        console.log(`email is : ${email}`);

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

        // let channel = event.data.bank_name ? "transfer" : "card";
        const channel = event["event.type"] == "CARD_TRANSACTION" ? "card" : "transfer";

        // Fund users wallet
        const wallet = await walletService.credit({
          id: user.dataValues.id,
          amount: Number(amount),
          category: "wallet-funding-ftw",
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
          category: "wallet-funding-ftw",
          narration: `Wallet funding via ${channel} for ${user.dataValues.id}`,
          txid: txId,
        });

        const message = `Hi, Your wallet was funded successfully with ${amount}, kindly check your dashboard for balance`;
        emailService.utils(user.dataValues.email, message, "Wallet Funding Success");
        console.log("email sent");
      }
    }

    // card tx
    if (event.event === "charge.completed") {
      console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
      const transactionId = event.data.reference | event.data.id | event.meta.transId;
      const transaction = flw.Transaction.verify({ id: transactionId });
      const {
        id, frequency, next, every
      } = await planRepo.find({
        userId: user.dataValues.id,
        status: { [Op.notIn]: ["deleted", "paused", "stopped"] },
      });
      if (transaction.data.status == "pending") {
        if (txId.slice(0, 2) == "PF") {
          // a funding for PLAN
          await planRepo.updateById(id, { status: "retry" });
        }
        return res.status(200).send({});
      }

      const { data } = event;
      const { amount } = data;
      const txId = data.tx_ref;
      const { email } = data.customer;
      const channel = "card";

      const user = await userRepo.findByEmail(email);
      const userPlan = await planRepo.findById(id);
      if (userPlan && amount == userPlan.amount) {
        await planRepo.updateById(id, { flwCardToken: transaction.data.card.token });
        const card_token = await walletRepo.updateByUserId(user.dataValues.id, {
          flwCardToken: transaction.data.card.token,
        });
      }

      const tx = await transactionRepo.findByTxId(txId);
      // check if the tx has been treated
      if (tx) {
        console.log(`${txId} has been treated before`);
        return res.status(200).send({ success: true });
      }

      // Fund users wallet
      const forPlanMarker = txId.slice(0, 2) == "PF" ? " for plan" : "";
      const wallet = await walletService.credit({
        id: user.dataValues.id,
        amount: Number(amount),
        category: "wallet-funding-ftw",
        narration: `Wallet funding via ${channel}${forPlanMarker}`,
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
        category: "wallet-funding-ftw",
        narration: `Wallet funding via ${channel} for ${user.dataValues.id}`,
        txid: txId,
      });

      if (txId.slice(0, 2) == "PF") {
        // a funding for PLAN - flutterwave vendor
        let {
          id, frequency, next, every
        } = await planRepo.find({
          userId: user.dataValues.id,
          status: { [Op.notIn]: ["deleted", "paused", "stopped"] },
        });
        if (every == "weekly") {
          next = every;
        }
        if (every == "monthly") {
          const nextDay = every.slice(3, 5);
          let nextMonth = Number(every.slice(0, 2));
          nextMonth = nextMonth + 1 > 12
            ? "01"
            : nextMonth + 1 > 9
              ? `${nextMonth + 1}`
              : `0${nextMonth + 1}`;
          next = `${nextMonth}/${nextDay}`;
        }

        await planRepo.updateById(id, { status: "charged", next });
      }

      const message = `Hi ${user.dataValues.firstName}, Your card was debited successfully and your Cribstock wallet credited with ${amount}, kindly check your dashboard for balance`;
      emailService.utils(user.dataValues.email, message, "Wallet Funding Success");
      console.log("email sent");
    }   

    // disbursement tx
    // The event.event key is absent from their webhook
    if (event['event.type'] && (event['event.type'] == 'Transfer')) {
        _flw_disbursement(event, req);
    }


  } catch (error) {
    console.log({ error });
    emailService.utils(
      "adekolaabdwahababisoye@gmail.com",
      `here is the error inside flota -----\n----\n----\n ${error} `,
      "Error inside flota"
    );
  }

  return res.status(200).send({ success: true });
});



/**
* Flutterwave webhook handler for disbursement
* https://developer.flutterwave.com/docs/making-payments/transfers/overview/
*/
async function _flw_disbursement(event, req) {

  // Get the local ID of the request from the reference sent to flw.
  let withdrawId = null;
  if (process.env.NODE_ENV === "production") {
      withdrawId = event.transfer.reference;
      
  } else {
      // For test, we prefix the transaction with an indicator to allow flw. process the request. {trxn-ID}_PMCKDU_1
      let delimIndx = event.transfer.reference.indexOf('_');
      withdrawId = delimIndx == -1 ? event.transfer.reference : event.transfer.reference.substring(0, delimIndx);
  }
    
  // Update the status of the withdrawal request.
  const withdrawal = await withdrawalRepo.findByIdUser(withdrawId);

  // Stop processing if request is not found or it's alread processed.
  if (!withdrawal || withdrawal.status !== 'pending' || withdrawal.walletStatus !== 'pending') {
      console.log(`Withdrawal either does not exist or already processed. ${withdrawal.id ? withdrawal.id : null}`);
      return;
  }

  // if tx succeeded
  if (event.transfer.status === "SUCCESSFUL") {      
    
    // Ensure that the amount corresponds
    // Todo: Report exceptions to admin for review.

    // Update the status of the request to successful
    let updateWithdraw = await withdrawalRepo.updateById(withdrawId, { status: 'processed', walletStatus: 'success' });
    if (!updateWithdraw)  console.log(`Unable to update withdraw trnx status to success. withdraw ID - ${withdrawId}`)

    // Send notification email to customer. todo: confirm this message with Harold.
    const message = `Hi, Your withdrawal request of ${event.transfer.amount} has been processed. The fund has been disbursed to the bank account you provided.`;
    emailService.utils(withdrawal.user.email, message, "Withdrawal Processed");

    return;
  }  

  // if tx failed
  if (event.transfer.status === "FAILED") {
    console.log(
      `Disbursement with ref: ${event.transfer.reference} failed because: ${event.transfer.complete_message}.`
    );

    // Report request as failed.
    let updateWithdraw = await withdrawalRepo.updateById(withdrawId, { walletStatus: 'failed'});
    if (!updateWithdraw)  console.log(`Unable to update withdraw trnx status to refund. withdraw ID - ${withdrawId}`)   

    return; 
  }

  // Others... Log, just in case they send a status that's neither success nor failure.
  console.log(`Non successful trxn notice : \n ${event} `);
}




module.exports = router;

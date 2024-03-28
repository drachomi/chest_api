const express = require("express");

const router = express.Router();
const paystackpayment = require("./paystackpayment");

router.post("/paystack", paystackpayment);

module.exports = router;

const express = require("express");

const router = express.Router();
const lazerpay = require("./lazerpayment");
const flutterwavepayment = require("./flutterwavepayment");
const paystackpayment = require("./paystackpayment");

router.post("/flutterwave", flutterwavepayment);
router.post("/paystack", paystackpayment);
router.post("/lazerpay",lazerpay);

module.exports = router;

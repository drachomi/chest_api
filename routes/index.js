const express = require("express");

const router = express.Router();
const {wallet, stocks} = require("../services/reportcard");

/* GET home page. */
router.get("/", async (req, res) => {
  res.status(200).send("Welcome to the new z");
});

module.exports = router;

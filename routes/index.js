const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  res.status(200).send("Welcome to the new z");
});

module.exports = router;

const express = require("express");

const errorHandler = require("../handlers/error");
const authMiddleWare = require("../middlewares/auth");
const userRepo = require("../repositories/user");
const router = express.Router();
const {paginate} = require("../utils/paginate")
const moment = require("moment");



/* GET stocks listing. */
router.get("/users", authMiddleWare.user, authMiddleWare.isAdmin,async (req, res) => {
  let {limit,page} = req.query
  try {
    const data = await userRepo.findAll();
    console.log(data.length)
    let paginatedData = (limit && page) ? paginate(data,limit,page) : data
    res.status(200).json({ data:paginatedData, success:true});
  } catch (error) {
    errorHandler(error, res);
  }
});


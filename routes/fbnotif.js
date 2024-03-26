const express = require("express");

const errorHandler = require("../handlers/error");
const { user } = require("../middlewares/auth");

const salesRepo = require("../repositories/sale");
const userRepo = require("../repositories/user");

const router = express.Router();
const interestService = require("../services/interestService");
const priceRepo = require("../repositories/prices");
const dateUt = require("../utils/date");
const propertyRepo = require("../repositories/property");
const profitRepo = require("../repositories/profit");
const userstockRepo = require("../repositories/userstock");
const walletService = require("../services/WalletService");
const withdrawalRepo = require("../repositories/withdrawal");
const { paginate } = require("../utils/paginate");
const transactionRepo = require("../repositories/transaction");
const stockRepo = require("../repositories/userstock");
const walletRepo = require("../repositories/wallet");
const emailService = require("../services/Email");
const orderRepo = require("../repositories/order");
const bankRepo = require("../repositories/bank");
const emailRepo = require("../repositories/email");
// const alertRepo = require("../repositories/alert");
const fbNotifRepo = require("../repositories/fbnotif");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const { sendNotif } = require("../services/notification");
const { CloudWatchEvents } = require("aws-sdk");
const auth = require("../middlewares/auth");
const fbnotif = require("../repositories/fbnotif");

async function createGroup(groupName, fbNotifRepo, arrayOfUserIds) {
  return await fbNotifRepo.create({ topic_name: groupName, userids: [...arrayOfUserIds] });
}

router.post("/group/new", auth.user, auth.isAdmin, async (req, res) => {
  try {
    const { groupName, arrayOfUserIds } = req.body;
    const notif = await fbNotifRepo.findAll({ topic_name: groupName });
    if (notif[0]) {
      return res.status(200).send({
        success: true,
        message: "a topic/group exists with same name",
        data: {},
      });
    }
    const groupCreation = createGroup(groupName, fbNotifRepo, arrayOfUserIds);
    return res.status(200).send({ success: true, message: "done", data: { groupCreation } });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ success: false });
  }
});

router.post("/group/user/add", user, async (req, res, next) => {
  try {
    // const presale_fb_notif_key = "presale_fb_notif_key";
    const { forProperty = true } = req.query;
    const { fbRegToken, groupName } = req.body;
    const propertyId = groupName;
    const userId = req.user.id;
    const { fireBaseRegToken } = await userRepo.findById(userId);
    if (forProperty) {
      const checkProperty = await propertyRepo.findById(propertyId);
      if (!checkProperty) return res.status(400).send({ sucess: false, message: "no such property" });
      if (checkProperty.isPresell) return res.status(400).send({ sucess: false, message: "property is not a presale" });
      // check if the presale as not passed
      const { presellStartsAt } = checkProperty;
      const daysLeft = Math.ceil((new Date(presellStartsAt) - new Date()) / (24 * 60 * 60 * 1000));
      if (daysLeft < 0) return res.status(200).send({ success: false, message: "presale expired" });
    }
    const subjectNotif = await fbNotifRepo.findAll({ topic_name: groupName });
    console.log({ subjectNotif });
    if (!subjectNotif[0]) return res.status(400).send({ sucess: false, message: "group not found" });
    if (!fireBaseRegToken && !fireBaseRegToken) return res.status(400).send({ sucess: false, message: "user's token missing" });
    const addingUser = await fbNotifRepo.updateUseridsByTopicName(userId, {
      topic_name: groupName,
    });
    console.log({ addingUser });
    if (!addingUser) res.status(200).send({ success: true, message: "not added" });
    res.status(200).send({ success: true, message: "added" });
    if (!fireBaseRegToken && fbRegToken) {
      userRepo.updateById(userId, { fireBaseRegToken: fbRegToken });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ success: true, message: "server error adding user", data: {} });
  }
});

router.get("/group/:groupName", auth.user, async (req, res) => {
  const { groupName } = req.params;
  const group = await fbnotif.findByTopicName(groupName);
  if (!group) return res.status(400).send({ success: false, message: "not found", data: {} });
  return res.status(400).send({ success: true, message: "group found", data: { group } });
});

async function sendNotifToGroup(groupName, title, body) {
  const subjectNotif = await fbNotifRepo.findAll({ topic_name: groupName });
  const arrayOfUserIds = subjectNotif[0].userids;
  console.log({ arrayOfUserIds });
  let concernedToken = await userRepo.findAllFirebaseToken({ id: { [Op.in]: arrayOfUserIds } });
  concernedToken = JSON.parse(concernedToken);
  console.log({ concernedToken });
  const tokenArray = [];
  concernedToken.forEach((element) => {
    if (element.fireBaseRegToken) tokenArray.push(element.fireBaseRegToken);
  });
  sendNotif(tokenArray, title, body);
}

// sendNotifToGroup("6473b172-9400-4631-abc8-a6c6c5524729");

/* router.patch("/:id", user, async (req, res, next) => {
  const { seen } = req.body;
  const { id } = req.params;
  if (!id || !seen) {
    return res
      .status(400)
      .send({ success: false, message: "supply both id and new value for `seen`", data: {} });
  }
  try {
    const notifUpdate = await notifRepo.updateById(id, { seen });
    console.log(notifUpdate);
    if (!notifUpdate) {
      return res
        .status(400)
        .send({ success: false, message: "notification could not be updated", data: {} });
    }
    return res.status(200).send({ success: true, message: "notification updated", data: {} });
  } catch (err) {
    console.log({ err });
    return res
      .status(400)
      .send({ success: false, message: "notification update failed", data: {} });
  }
}); */

module.exports = { router, default: router, sendNotifToGroup };

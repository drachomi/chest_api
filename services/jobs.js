const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const cron = require("node-cron");
const { Op } = require("sequelize");
const https = require("https");
const interest = require("./interestService");
const presell = require("./presellService");
const {} = require("./presellService");
const { utils, fundByCard, templateEmail } = require("./Email");
const {
  nonuban,
  neverfunded,
  refererx2,
  walletnostock,
  walletbelow100,
  allusers,
} = require("../repositories/segment");
const counter = require("../repositories/counter");
const stockRepo = require("../repositories/userstock");
const userRepo = require("../repositories/user");
const { epochWithoutTime, day_difference } = require("../utils/date");
const cribstockDatasource = require("../datasources/cribstock");
const planRepo = require("../repositories/plan");
const { sendNotifToGroup } = require("../routes/fbnotif");
const { onboardingSeries } = require("./Email");
const { isDueWasYesterday, setNextDate } = require("../services/Liquidation");

const propertyRepo = require("../repositories/property");
const fbnotifRepo = require("../repositories/fbnotif");
const { default: axios } = require("axios");

cron.schedule("30 00 * * *", async () => {
  console.log("entered price cron");
  try {
    const today = await interest.updatePropertyInterest(0); // 0
    if (today) {
      utils(
        ["adekolaabdwahababisoye@gmail.com", "connectharold@gmail.com"],
        `just finished running price of props +09+09+ ${new Date()}`,
        `price update ${new Date()} `
      );
    }
  } catch (err) {
    console.log(err);
  }
});
// await interest.updateUsersBalance();

cron.schedule("40 00 * * *", async () => {
  // 0 2
  console.log("entered cron 2");

  try {
    await interest.updateUsersBalance(1); // 1 prevdate = 14 june
    utils(
      ["adekolaabdwahababisoye@gmail.com"],
      `just finished running updateusersbalance of == ${new Date()}`,
      "updateuserbalance"
    );
    console.log(
      "FINALLY DONE==================================================VVVVVVVVVVVVVVVVVVVV===============xxxxxxxxxxxxx"
    );
  } catch (err) {
    console.log(err);
  }
});

cron.schedule("03 08 * * 1", async () => {
  // 20 * * * * //12 20 * * 4
  console.log("entered cron 3");
  try {
    /** await nonuban()
        await neverfunded()
        await refererx2()
        await walletnostock() */
    // await walletbelow100()
  } catch (error) {
    console.log({ error });
  }
});

cron.schedule("40 09 * * *", async () => {
  console.log("PPPPPPPPPPP Entered presell job");
  try {
    await presell.doPresellActions();
  } catch (error) {
    console.log(error);
  }
});

cron.schedule("48 13 * * *", async () => {
  try {
    let count = await stockRepo.CountStockOwners({ quantity: { [Op.gt]: 0 } });
    count = JSON.parse(JSON.stringify(count));
    count = Number(count[0].count);
    const sort_date = epochWithoutTime(new Date().getTime() / 1000);
    await counter.create({ count, type: "stockowner", sort_date });
  } catch (error) {
    console.log(error);
  }
});

// cron.schedule("55 04 * * *", async () => {
cron.schedule("12 16 * * *", async () => {
  try {
    console.log("time to help investors");
    const weekday = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const todayIndex = new Date().getDay();
    const todayName = weekday[todayIndex];
    let dayOfMonth = new Date().getDate();
    dayOfMonth = dayOfMonth > 9 ? `${dayOfMonth}` : `0${dayOfMonth}`;
    let month = new Date().getMonth() + 1;
    month = month > 9 ? `${month}` : `0${month}`;
    const today = `${month}/${dayOfMonth}`;
    // let daysFilter =
    const planFilter = {
      [Op.or]: [
        { status: "retry" },
        {
          [Op.and]: [
            { [Op.or]: [{ next: todayName }, { next: today }] },
            { [Op.or]: [{ status: "charged" }] },
          ],
        },
      ],
    };

    const todaysPlans = await planRepo.findAll(planFilter);
    console.log({ howmany: todaysPlans.length, todaysPlans });

    for (i in todaysPlans) {
      const { amount, email, flwCardToken, pskCardToken } = todaysPlans[i];
      const randa = Math.floor(Math.random() * 900987);
      const randb = Math.floor(Math.random() * 997698);
      const tx_ref = `PF${randb}${new Date().getTime()}${randa}`;
      const details = {
        token: pskCardToken || flwCardToken,
        currency: "NGN",
        country: "NG",
        amount,
        email,
        tx_ref,
        narration: "Wallet funding via card for plan",
      };
      // await flw.Tokenized.charge(details);
      const params = JSON.stringify({
        authorization_code: pskCardToken || flwCardToken,

        email,

        amount: amount * 100, // to kobo,

        reference: `PF${Math.floor(703456700 + Math.random() * 9000900909)}`,

        queue: true,
      });
      const options = {
        hostname: "api.paystack.co",

        port: 443,

        path: "/transaction/charge_authorization",

        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECKEY}`,

          "Content-Type": "application/json",
        },
      };

      const req = https
        .request(options, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            console.log(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          console.error(error);
        });

      req.write(params);

      req.end();
      console.log(" wait for webhook");
    }
  } catch (error) {
    console.log(error);
    utils(
      ["adekolaabdwahababisoye@gmail.com"],
      `\n\n----${new Date()} ----\n\n ${error}`,
      "error plan job"
    );
  }
});

cron.schedule("15 07 * * *", async () => {
  try {
    console.log("entered job");
    const seven_date = new Date();
    seven_date.setDate(seven_date.getDate() - 7);
    const today = new Date();

    const users = await userRepo.findAllByCreatedAt(seven_date, today);

    for (const i in users) {
      const user = users[i];
      const createdAt = new Date(user.createdAt);
      const d = Math.abs(today.getTime() - createdAt.getTime());
      const diffDays = Math.ceil(d / (1000 * 60 * 60 * 24));

      await onboardingSeries(user.email, user.firstName, diffDays);
    }
  } catch (error) {
    console.log(error);
  }
});

cron.schedule("25 06 * * *", async () => {
  if (process.env.EMAIL_SCHEDULED === "true") {
    try {
      const users = await userRepo.findAll();
      for (const user of users) {
        await templateEmail({ name: user.firstName, email: user.email });
      }

      console.log("Done with email");
    } catch (err) {
      console.log(err);
    }
  }
});

// for presale to run everyday
cron.schedule("4 9 * * *", async () => {
  function normalizeDate(date, returnFormat) {
    const dateEpoch = new Date(date) - 0;
    if (returnFormat == "epoch") return dateEpoch;
    const shortDate = new Date(dateEpoch).toISOString().slice(0, 10);
    if (returnFormat == "short") return shortDate;
    const longDate = new Date(shortDate).toISOString();
    if (returnFormat == "long") return longDate;
    return { dateEpoch, shortDate, longDate };
  }
  try {
    const away = ["day", "week", "month"];
    const title = "The presale is";
    const groupNames = [];
    // get all props that presale and upcoming
    const yesterdayEpoch = new Date() - 24 * 60 * 60 * 1000; // to make yesterday the reference
    yesterdayShortDate = new Date(yesterdayEpoch).toISOString().slice(0, 10);
    yesterdayLongDate = new Date(yesterdayShortDate).toISOString();
    console.log({ yesterdayLongDate });
    const presaleProps = await propertyRepo.findAll({
      isPresell: true,
      presellStartsAt: { [Op.gt]: yesterdayLongDate },
    });
    console.log({ presaleProps: presaleProps.length });
    presaleProps.forEach(async (element) => {
      console.log({ presaleProps: element });
      const { presellStartsAt } = element;
      const presellStartsAtEpoch = normalizeDate(presellStartsAt, "epoch");
      // const todayEpoch = normalizeDate(new Date(), "epoch");
      const differenceInDays = Math.abs(
        Math.ceil(
          (presellStartsAtEpoch - yesterdayEpoch) / (24 * 60 * 60 * 1000) - 1
        )
      );

      console.log("prenorma ", differenceInDays);
      // const daysLeft = Math.ceil((new Date(presellStartsAt) - normalizeDate(new Date())) / (24 * 60 * 60 * 1000)) - 1; // since yesterday was reference
      const daysLeft = differenceInDays;
      if (daysLeft < 0) return false;
      console.log("hjipol star");
      const notifyWhenObj = {
        7: "7 days",
        3: "3 days",
        1: "1 day",
        0: "0 day",
      }; // notification for 'when the presale kick offs' should be sent from the code where the presale is being kicked off
      const notifyWhen = notifyWhenObj[daysLeft];
      const subs = await fbnotifRepo.findByTopicName(element.id);
      console.log({ subs, notifyWhen });
      if (subs && notifyWhen) {
        console.log({ subs, notifyWhen });
        console.log(
          element.id,
          `We are now just ${notifyWhen} to the big presale of ${element.name}`
        );
        sendNotifToGroup(
          element.id,
          `${notifyWhen} to go!!`,
          `We are now just ${notifyWhen} to the big presale of ${element.name}`
        );
      }
    });

    // which ones are 7 days away? which ones are 1 day away which ones are today
    /** *      //check if the presale as not passed
      let today = new Date()
      let presellStartsAt = checkProperty.presellStartsAt
      let daysLeft = Math.ceil((new Date(presellStartsAt) - new Date())/(24*60*60*1000))
      if(daysLeft < 0) return false

      if(daysLeft == 0){
        no
      } */
    // sendNotifToGroup()
  } catch (error) {
    console.log("error while running presale notif:==>>", { error });
  }
});

// to set next liquidation date for everyone that is due
cron.schedule("29 05 * * *", async () => {
  try {
    let users = await userRepo.findAll();

    //console.log(users);
    for (let user of users) {
      if (await isDueWasYesterday(user)) {
        console.log("it is due yesterday");
        await setNextDate(user.id);
      }
    }
  } catch (error) {
    console.log({ error });
  }
});

// send reminder for presale through email
cron.schedule("45 11 * * *", async () => {
  let base_url = process.env.mail_base_url;
  let key = `send_presale_reminder_email${base_url.includes(
    "service"
  )}?'_live':'_test'`;
  try {
    const unripe = await cache.getAsync(key);
    console.log({ unripe });
    if (unripe) return false;
    let resp = await axios.post(
      `${process.env.mail_base_url}/notification/mail/send`
    );
    if (resp?.status !== 200) return false;
    console.log({ resp_from_presale_mail: resp.status });
    let next_ripe = await cache.setAsync(key, "{}", "EX", 60 * 60 * 24 * 1.8);
    console.log({ next_ripe });
  } catch (error) {
    console.log({ error });
  }
});

// send reminder for cove through email & push @ 45 8
cron.schedule("45 8 * * *", async () => {
  let base_url = process.env.mail_base_url;
  if (new Date() - 0 > 1679835600000) return false;
  try {
    //send for mail
    let mailNotif = await axios.post(
      `${base_url}/notification/mail/cove-reminder/se-nnd`
    );
    console.log({ mailNotif });
  } catch (error) {
    console.log({ error });
  }
  try {
    //send push

    let pushNotif = await axios.post(
      `${base_url}/fbnotif/pushnotification/send/group/jo-ob`,
      {
        groupName: "all",
        title: "Upcoming presale - COVE",
        messageBody: `(Upcoming presale) The presale for COVE is ${day_difference(
          new Date(),
          "2023-03-27T09:00"
        )} day(s) away. Stocks are at the cheapest prices. Fund your wallet to buy as many starting this Monday 9:00am before it's sold out.`,
      }
    );
    console.log({ pushNotif });
  } catch (error) {
    console.log({ error });
  }
});


// send reminder for cove through email & push @ 
cron.schedule("59 7 * * *", async () => {
  let base_url = process.env.mail_base_url;
 // if (new Date() - 0 > 1679835600000) return false;

  try {
    //send push

    let pushNotif = await axios.post(
      `${base_url}/fbnotif/pushnotification/send/group/ajob`,
      {
        groupName: "allusers",
        title: "COVE Presale is on!",
        messageBody: `The presale is today and the opportunity is now!  With thousands of investors ready, It is time to buy COVE!`,
      }
    );
    console.log({ pushNotif });
  } catch (error) {
    console.log({ error });
  }
});

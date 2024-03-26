const express = require("express");
const path = require("path");
const morgan = require("morgan");
const morganBody = require("morgan-body");
const bodyParser = require("body-parser");
const models = require("./models");
const app = express();

models.sequelize
  .sync()
  .then(() => {
    console.log("Database updated successfully");
  })
  .catch((error) => {
    console.log(error, "Database sync failed!");
  });

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

morganBody(app);

app.use("/", require("./routes/index"));

app.use("/payment", require("./routes/paymentRoute"));
app.use("/kyc", require("./routes/kyc"));
// app.use("/notification", require("./routes/notification").router);
app.use("/plan", require("./routes/plan").router);
app.use("/fbnotif", require("./routes/fbnotif").router);
// Redis
require("./services/Redis");

// Jobs
require("./services/jobs");



module.exports = app;

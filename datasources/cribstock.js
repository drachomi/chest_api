require("dotenv").config();

const { Sequelize } = require("sequelize");
const logHandler = require("../handlers/log");

let cribstock;
const cribstockProd = new Sequelize(process.env.DATABASE_URL, {
  logging: logHandler.debug.bind(logHandler),
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : null,
});

const cribstockDev = new Sequelize({
  database: process.env.DB_database,
  username: process.env.DB_username,
  password: process.env.DB_password,
  host: process.env.DB_host,
  port: process.env.DB_port,
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

cribstock = process.env.local_env === "wahab" ? cribstockDev : cribstockProd;
console.log({ env: process.env.local_env });

// load models
require("../models/user")(cribstock);
require("../models/company")(cribstock);

console.log("trying to connect to db");

//IMPORTANT sync is done in this function. Do not force
cribstock
  .sync()
  .then(function () {
    console.log("Database sync successfully");
  })
  .catch(function (error) {
    console.log(error, "Database sync failed!");
  });

module.exports = cribstock;

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const logHandler = require("../handlers/log");

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.js"))[env];

console.log(process.env.DATABASE_URL);
console.log(env);
let sequelize;
if (config.use_environment_url) {
  const sequelizeProd = new Sequelize(process.env.DATABASE_URL, {
    logging: logHandler.debug.bind(logHandler),
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions:
      process.env.NODE_ENV !== "development"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : null,
  });

  const sequelizeDev = new Sequelize({
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

  sequelize = process.env.local_env === "wahab" ? sequelizeDev : sequelizeProd;
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
  });
}

var db = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function (file) {
    var model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

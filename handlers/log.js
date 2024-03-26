const pino = require("pino");

/* log handler. */
module.exports = pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint: { colorize: true, translateTime: true },
});

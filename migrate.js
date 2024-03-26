const cribstockDatasource = require("./datasources/cribstock");
const logHandler = require("./handlers/log");

const migrate = async (args) => {
  const existingSchema = args.includes("--rebuild")
    ? { force: true }
    : { alter: true };
  await cribstockDatasource.sync(existingSchema);
  logHandler.info("database migration complete");
  process.exit(0);
};

migrate(process.argv).catch((err) => {
  logHandler.error("Cannot migrate database schema", err);
  process.exit(1);
});

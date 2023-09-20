const StarkBankConnection = require("./StarkBank");
const CronJobConfig = require("./CronJob");
require("dotenv").config();

const bootApp = async () => {
  StarkBankConnection();
  // CronJobConfig();
};

module.exports = bootApp;

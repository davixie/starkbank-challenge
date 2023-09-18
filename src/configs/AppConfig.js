const StarkBankConnection = require("./StarkBank");
require("dotenv").config();

const bootApp = async () => {
  StarkBankConnection();
};

module.exports = bootApp;

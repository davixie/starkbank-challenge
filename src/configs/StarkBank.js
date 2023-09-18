const starkbank = require("starkbank");

const StarkBankConnection = () => {
  const project = new starkbank.Project({
    environment: process.env.ENVIRONMENT,
    id: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY,
  });
  starkbank.user = project;
  starkbank.language = 'en-US';
};

module.exports = StarkBankConnection;
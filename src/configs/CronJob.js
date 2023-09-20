const InvoiceService = require("../services/invoice");

const CronJobConfig = () => {
  InvoiceService.sendInvoice("*/30 * * * * *", 60000);
};

module.exports = CronJobConfig;
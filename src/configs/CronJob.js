const InvoiceService = require("../services/invoice");

const CronJobConfig = () => {
  InvoiceService.sendInvoice();
};

module.exports = CronJobConfig;
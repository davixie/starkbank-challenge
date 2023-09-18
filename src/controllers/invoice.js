const InvoiceService = require("../services/invoice");
const cron = require('node-cron');

// const schedule = "0 */3 * * *";
const schedule = "*/15 * * * * *";

// const limitOfJob = 24 * 60 * 60 * 1000;
const limitOfJob = 60 * 1000;

const sendInvoiceInACronJob = async (req, res) => {
  const job = cron.schedule(schedule, () => {
    InvoiceService.sendInvoice();
  });

  setTimeout(() => {
    job.stop();
    console.log('Cron job stopped after 24 hours');
  }, limitOfJob);
  return res.status(200).json({msg: "Sending invoices"})
};

const InvoiceController = {
  sendInvoiceInACronJob
}

module.exports = InvoiceController;
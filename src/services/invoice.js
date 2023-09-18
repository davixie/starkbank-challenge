const InvoiceRepository = require("../repositories/invoice");
const cron = require('node-cron');
const { getRandomValueFromRange } = require("./utils");

const sendInvoice = (scheduleInput, limitOfJobInput) => {
  const schedule = scheduleInput || "0 */3 * * *";

  const limitOfJob = limitOfJobInput || 24 * 60 * 60 * 1000;

  const randomNumberOfInvoices = getRandomValueFromRange(8, 12);

  const job = cron.schedule(schedule, () => {
    console.log("Executing one time the cron job");
    InvoiceRepository.sendInvoice(randomNumberOfInvoices);
  });

  setTimeout(() => {
    job.stop();
    console.log("Cron job stopped after 24 hours");
  }, limitOfJob);
};

const transferToStarkBank = async (amount) => {
  return InvoiceRepository.transferToStarkBank(amount);
};

const InvoiceService = {
  sendInvoice,
  transferToStarkBank,
}

module.exports = InvoiceService;
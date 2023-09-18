const InvoiceRepository = require("../repositories/invoice");
const cron = require('node-cron');
const { getRandomValueFromRange } = require("./utils");

const sendInvoice = () => {
  // const schedule = "0 */3 * * *";
  const schedule = "*/15 * * * * *";

  // const limitOfJob = 24 * 60 * 60 * 1000;
  const limitOfJob = 60 * 1000;

  const randomNumberOfInvoices = getRandomValueFromRange(8, 12);

  const job = cron.schedule(schedule, () => {
    InvoiceRepository.sendInvoice(randomNumberOfInvoices);
  });

  setTimeout(() => {
    job.stop();
    console.log('Cron job stopped after 24 hours');
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
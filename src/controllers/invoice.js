const starkbank = require("starkbank");
const InvoiceService = require("../services/invoice");

const sendInvoiceInACronJob = async (req, res) => {
  InvoiceService.sendInvoice();
  return res.status(200).json({msg: "Sending invoices"});
};

const receiveInvoicePaid = async (req, res) => {
  console.log("\n\nauqi temos:", req.body);
  const event = await starkbank.event.parse({
    content: req.body.toString(),
    signature: req.headers['digital-signature']
  });
  if (event.subscription !== 'invoice') {
    return res.status(400).json({msg: "Bad request, endpoint only to receive invoice subscription"});
  }
  console.log("Received invoice subscription ", event.log.invoice);
  const response = await InvoiceService.transferToStarkBank(event.log.invoice.amount);
  return res.status(200).json(response);
};

const InvoiceController = {
  sendInvoiceInACronJob,
  receiveInvoicePaid,
};

module.exports = InvoiceController;
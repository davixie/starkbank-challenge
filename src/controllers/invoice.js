const InvoiceService = require("../services/invoice");

const sendInvoiceInACronJob = async (req, res) => {
  try {
    const { schedule, limitOfJob } = req.body;
    InvoiceService.sendInvoiceInACronJob(schedule, limitOfJob);
    return res.status(200).json({msg: "Cron job started to send invoices"});
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};

const sendInvoice = async (req, res) => {
  try {
    await InvoiceService.sendInvoice();
    return res.status(200).json({msg: "Sent invoices"});
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};

const receiveInvoicePaid = async (req, res) => {
  try {
    const { event } = req.body;
    if (event.subscription !== 'invoice') {
      return res.status(400).json({msg: "Bad request, endpoint only to receive invoice subscription"});
    }
    console.log("Received invoice subscription");
    const response = await InvoiceService.transferToStarkBank(event.log.invoice.amount);
    return res.status(200).json(response);
  } catch(err) {
    return res.status(500).json({ error: err });
  }
};

const InvoiceController = {
  sendInvoiceInACronJob,
  sendInvoice,
  receiveInvoicePaid,
};

module.exports = InvoiceController;
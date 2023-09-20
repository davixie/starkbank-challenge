const express = require("express");
const InvoiceController = require("../controllers/invoice");

const InvoiceRouter = express.Router();

InvoiceRouter.post("/cronjob", InvoiceController.sendInvoiceInACronJob);
InvoiceRouter.post("/send", InvoiceController.sendInvoice);
InvoiceRouter.post("/receive", InvoiceController.receiveInvoicePaid);

module.exports = InvoiceRouter;
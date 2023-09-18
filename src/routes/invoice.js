const express = require("express");
const InvoiceController = require("../controllers/invoice");

const InvoiceRouter = express.Router();

InvoiceRouter.post("/send", InvoiceController.sendInvoiceInACronJob);
InvoiceRouter.post("/receive", InvoiceController.receiveInvoicePaid);

module.exports = InvoiceRouter;
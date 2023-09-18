const express = require("express");
const InvoiceController = require("../controllers/invoice");

const InvoiceRouter = express.Router();

InvoiceRouter.post("/", InvoiceController.sendInvoiceInACronJob);

module.exports = InvoiceRouter;
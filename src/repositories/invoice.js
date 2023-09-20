const starkbank = require("starkbank");
const UtilsService = require("../services/utils");
const { cpf } = require("cpf-cnpj-validator");
const random = require("random-name");

const MAX_AMOUNT = 9999;

const sendInvoice = async (randomNumberOfInvoices) => {
  console.log("\nSending invoice");
  const listOfInvoices = [];
  for(let i = 0; i < randomNumberOfInvoices; i++) {
    listOfInvoices.push({
      amount: UtilsService.getRandomValueFromRange(0, MAX_AMOUNT),
      name: random(),
      taxId: cpf.generate(true),
      fine: 2.5,
      interest: 1.3,
    });
  }
  const invoices = await starkbank.invoice.create(listOfInvoices);
  console.log("\nSent all invoices");
  return invoices;
};

const transferToStarkBank = async (amount) => {
  const amountWithoutTaxes = amount;
  console.log("\nTransfering amount ", amountWithoutTaxes, " to starkbank");
  const transfer = await starkbank.transfer.create([{
    amount: amountWithoutTaxes,
    bankCode: process.env.BANK_CODE,
    branchCode: process.env.BRANCH_CODE,
    accountNumber: process.env.ACCOUNT_NUMBER,
    name: "Stark Bank S.A.",
    taxId: process.env.TAX_ID,
    accountType: "payment",
    rules: [
      new starkbank.transfer.Rule({
        key: "resendingLimit",
        value: 5, // default is 10
      })
    ],
  }]);
  console.log("\nTransfer executed ");

  return transfer;
};

const InvoiceRepository = {
  sendInvoice,
  transferToStarkBank,
};

module.exports = InvoiceRepository;
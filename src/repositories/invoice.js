const starkbank = require("starkbank");
const { getRandomValueFromRange } = require("../services/utils");
const { cpf } = require("cpf-cnpj-validator");
const random = require("random-name");

const MAX_AMOUNT = 9999;

const sendInvoice = async (randomNumberOfInvoices) => {
  console.log("\nSending the cron job message");
  const listOfInvoices = [];
  for(let i = 0; i < randomNumberOfInvoices; i++) {
    listOfInvoices.push({
      amount: getRandomValueFromRange(0, MAX_AMOUNT),
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
  const amountWithoutTaxes = amount * 0.9;
  console.log("\nTransfering amount ", amountWithoutTaxes, " to starkbank");
  const transfer = await starkbank.transfer.create([{
    amount: amountWithoutTaxes,
    bankCode: "20018183",
    branchCode: "0001",
    accountNumber: "6341320293482496",
    name: "Stark Bank S.A.",
    taxId: "20.018.183/0001-80",
    accountType: "payment",
    rules: [
      new starkbank.transfer.Rule({
        key: "resendingLimit",
        value: 5, // default is 10
      })
    ],
  }]);
  console.log("\nTransfer executed ", transfer);

  return transfer;
};

module.exports = {
  sendInvoice,
  transferToStarkBank,
};
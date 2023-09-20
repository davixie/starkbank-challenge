const InvoiceRepository = require("../../repositories/invoice");
const UtilsService = require("../../services/utils");
const starkbank = require("starkbank");
const { cpf } = require("cpf-cnpj-validator");
const random = require("random-name");

process.env.BANK_CODE = "1",
process.env.BRANCH_CODE = "2",
process.env.ACCOUNT_NUMBER = "12",
process.env.TAX_ID = "123",

jest.mock("../../services/utils", () => jest.fn());
jest.mock("random-name", () => jest.fn());

describe("testing src/repositories/invoice.js", () => {
  describe(".sendInvoice", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("should generate and send invoices", async () => {
      const randomNumberOfInvoices = 5;
      const amountMocked = 100;
      UtilsService.getRandomValueFromRange = jest.fn().mockReturnValue(amountMocked);
  
      const cpfMocked = "111.111.111-11";
      const nameMocked = "Invoice Name";

      starkbank.invoice.create = jest.fn().mockResolvedValue({});
      cpf.generate = jest.fn().mockReturnValue(cpfMocked);
      random.mockReturnValue(nameMocked);

      const invoices = await InvoiceRepository.sendInvoice(randomNumberOfInvoices);

      expect(invoices).toEqual({});
      expect(UtilsService.getRandomValueFromRange).toHaveBeenCalledWith(0, 9999);
      expect(UtilsService.getRandomValueFromRange).toHaveBeenCalledTimes(randomNumberOfInvoices);
      expect(starkbank.invoice.create).toHaveBeenCalledWith(Array(randomNumberOfInvoices).fill(
        {
          amount: amountMocked,
          name: nameMocked,
          taxId: cpfMocked,
          fine: 2.5,
          interest: 1.3,
        },
      ));
    });
  });

  describe(".transferToStarkBank", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should transfer", async () => {
      const amount = 100;

      starkbank.transfer.create = jest.fn().mockResolvedValue({});
      starkbank.transfer.Rule = jest.fn().mockReturnValue({});

      const transfer = await InvoiceRepository.transferToStarkBank(amount);

      expect(transfer).toEqual({});
      expect(starkbank.transfer.create).toHaveBeenCalledWith([
        {
          amount: amount,
          bankCode: "1",
          branchCode: "2",
          accountNumber: "12",
          name: "Stark Bank S.A.",
          taxId: "123",
          accountType: "payment",
          rules: [{}],
        },
      ]);
    });
  });
});
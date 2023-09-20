const { mockRequest, mockResponse } = require("./utils");
const InvoiceController = require("../../controllers/invoice");
const InvoiceService = require("../../services/invoice");

jest.mock("../../services/invoice", () => jest.fn());

describe("testing src/controllers/invoice.js", () => {
  beforeEach(() => {;
    jest.clearAllMocks();
  });

  describe(".sendInvoiceInACronJob", () => {
    it("should return correct values when body not empty", async () => {
      const request = mockRequest({
        body: {
          schedule: "*/60 * * * * *",
          limitOfJob: 60000
        },
      });

      const response = mockResponse();

      InvoiceService.sendInvoice = jest.fn().mockReturnValue({});

      await InvoiceController.sendInvoiceInACronJob(request, response);

      expect(InvoiceService.sendInvoice).toHaveBeenCalledTimes(1);
      expect(InvoiceService.sendInvoice).toHaveBeenCalledWith(request.body.schedule, request.body.limitOfJob);
      expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should return correct values when body empty", async () => {
      const request = mockRequest({
        body: {},
      });

      const response = mockResponse();

      InvoiceService.sendInvoice = jest.fn().mockReturnValue({});

      await InvoiceController.sendInvoiceInACronJob(request, response);

      expect(InvoiceService.sendInvoice).toHaveBeenCalledTimes(1);
      expect(InvoiceService.sendInvoice).toHaveBeenCalledWith(undefined, undefined);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe(".receiveInvoicePaid", () => {
    it("should work with correct subscription", async () => {
      const request = mockRequest({
        body: {
          event: {
            subscription: "invoice",
            log: {
              invoice: {
                amount: 100,
              }
            }
          }
        },
      });

      const response = mockResponse();

      InvoiceService.transferToStarkBank = jest.fn().mockReturnValue({});

      await InvoiceController.receiveInvoicePaid(request, response);

      expect(InvoiceService.transferToStarkBank).toHaveBeenCalledTimes(1);
      expect(InvoiceService.transferToStarkBank).toHaveBeenCalledWith(100);
      expect(response.status).toHaveBeenCalledWith(200);
    });

    it("should return 400 error when subscription different than invoice", async () => {
      const request = mockRequest({
        body: {
          event: {
            subscription: "transfer",
            log: {
              invoice: {
                amount: 100,
              }
            }
          }
        },
      });

      const response = mockResponse();

      InvoiceService.transferToStarkBank = jest.fn();

      await InvoiceController.receiveInvoicePaid(request, response);

      expect(InvoiceService.transferToStarkBank).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(400);
    });
  });
});

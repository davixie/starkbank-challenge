const InvoiceRepository = require("../../repositories/invoice");
const InvoiceService = require("../../services/invoice");
const UtilsService = require("../../services/utils");
const cron = require('node-cron');

jest.useFakeTimers();

jest.mock("../../repositories/invoice", () => jest.fn());
jest.mock("node-cron");
jest.mock("../../services/utils");

describe("testing src/services/invoice.js", () => {
  beforeEach(() => {;
    jest.clearAllMocks();
  });

  describe('.sendInvoiceInACronJob', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should use default schedule and limitOfJob when no arguments are provided', () => {
      cron.schedule = jest.fn().mockReturnValue({
        stop: jest.fn(),
      });
      InvoiceService.sendInvoiceInACronJob();
      jest.advanceTimersByTime(24 * 60 * 60 * 1000);

      expect(cron.schedule).toHaveBeenCalledWith('0 */3 * * *', expect.any(Function));
    });

    it('should use schedule and limitOfJob when arguments are provided', () => {
      const mockSchedule = "*/60 * * * * *";
      const mockLimitOfJob = 60000;
      cron.schedule = jest.fn().mockReturnValue({
        stop: jest.fn(),
      });
      InvoiceService.sendInvoiceInACronJob(mockSchedule, mockLimitOfJob);
      jest.advanceTimersByTime(mockLimitOfJob);

      expect(cron.schedule).toHaveBeenCalledWith(mockSchedule, expect.any(Function));
    });
  });

  describe(".sendInvoice", () => {
    it("should work correctly", async () => {
      const mockedAmount = 8;
      UtilsService.getRandomValueFromRange = jest.fn().mockReturnValue(mockedAmount);
      InvoiceRepository.sendInvoice = jest.fn().mockResolvedValue({});

      const response = await InvoiceService.sendInvoice();

      expect(InvoiceRepository.sendInvoice).toHaveBeenCalledTimes(1);
      expect(InvoiceRepository.sendInvoice).toHaveBeenCalledWith(mockedAmount);
      expect(response).toStrictEqual({});
    });
  });

  describe(".transferToStarkBank", () => {
    it("should work correctly", async () => {
      const amount = 100;
      InvoiceRepository.transferToStarkBank = jest.fn().mockResolvedValue({});

      const response = await InvoiceService.transferToStarkBank(amount);

      expect(InvoiceRepository.transferToStarkBank).toHaveBeenCalledTimes(1);
      expect(InvoiceRepository.transferToStarkBank).toHaveBeenCalledWith(amount);
      expect(response).toStrictEqual({});
    });
  });
});

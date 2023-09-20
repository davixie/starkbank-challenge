const UtilsService = require("../../services/utils");

describe("testing src/services/invoice.js", () => {
  describe(".getRandomValueFromRange", () => {
    it("should return a random value within the specified range", () => {
      const min = 5;
      const max = 10;
      const randomValue = UtilsService.getRandomValueFromRange(min, max);
  
      expect(randomValue).toBeGreaterThanOrEqual(min);  
      expect(randomValue).toBeLessThanOrEqual(max);
    });
  
    it("should return a random value within a negative range", () => {
      const min = -10;
      const max = -5;
      const randomValue = UtilsService.getRandomValueFromRange(min, max);
  
      expect(randomValue).toBeGreaterThanOrEqual(min);  
      expect(randomValue).toBeLessThanOrEqual(max);
    });
  
    it("should return the minimum value when min and max are the same", () => {
      const min = 42;
      const max = 42;
      const randomValue = UtilsService.getRandomValueFromRange(min, max);
  
      expect(randomValue).toBe(min);
    });
  
    it("should return NaN when min or max is not a number", () => {
      const min = "invalid";
      const max = 10;
      const randomValue = UtilsService.getRandomValueFromRange(min, max);
  
      expect(isNaN(randomValue)).toBe(true);
    });
  });
});

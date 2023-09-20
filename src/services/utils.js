const getRandomValueFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const UtilsService = {
  getRandomValueFromRange,
}

module.exports = UtilsService;
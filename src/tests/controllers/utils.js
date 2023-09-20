const mockRequest = ({ body = {}, params = {}, query = {}, headers, user = {} }) => {
  return {
    body,
    params,
    query,
    headers,
    user,
  };
};

const mockResponse = () => {
  let res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

module.exports = {
  mockRequest,
  mockResponse,
};

const createPostRequest = function () {
  return (req, res) => {
    return res.send("POST");
  };
};

const createGetRequest = function () {
  return (req, res) => {
    return res.send("GET");
  };
};

const createPutRequest = function () {
  return (req, res) => {
    return res.send("PUT");
  };
};

const createDeleteRequest = function () {
  return (req, res) => {
    return res.send("DELETE");
  };
};

module.exports = {
  createPostRequest,
  createGetRequest,
  createPutRequest,
  createDeleteRequest,
};

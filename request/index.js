const validateJoi = require("../validation");

const createPostRequest = function ({ mongooseSchema, joiSchema }) {
  return async (req, res) => {
    // validate the request body
    const error = validateJoi(joiSchema, req.body);
    if (error) return res.status(400).send(error);
    // create the object in mongoose
    const mongooseObject = new mongooseSchema(req.body);
    try {
      // save the category
      return res.send(await mongooseObject.save());
    } catch (error) {
      return res.status(500).send({ error });
    }
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

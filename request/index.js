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
      return res.status(500).send(error);
    }
  };
};

const createGetRequest = function ({ mongooseSchema }) {
  return async (req, res) => {
    const { id } = req.params;
    try {
      const mongooseObject = await mongooseSchema.findById(id);
      if (!mongooseObject)
        return res.status(404).send(`${mongooseSchema.modelName} not Found!`);
      return res.send(mongooseObject);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
};

const createGetAllRequest = function ({ mongooseSchema }) {
  return async (req, res) => {
    try {
      const categories = await mongooseSchema.find();
      return res.send(categories);
    } catch (error) {
      return res.status(500).send(error);
    }
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
  createGetAllRequest,
  createPutRequest,
  createDeleteRequest,
};

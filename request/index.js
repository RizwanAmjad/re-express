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

const createPutRequest = function ({ mongooseSchema, joiSchema }) {
  return async (req, res) => {
    const { id } = req.params;
    // validate the request body
    const error = validateJoi(joiSchema, req.body);
    if (error) return res.status(400).send(error);
    // check to see if any document exists with the current id
    const doesExist = await mongooseSchema.findById(id);
    if (!doesExist)
      return res.status(404).send(`${mongooseSchema.modelName} not Found!`);
    try {
      const mongooseObject = await mongooseSchema.findByIdAndUpdate(
        id,
        req.body
      );
      return res.send(mongooseObject);
    } catch (ex) {
      return res.status(500).send(ex);
    }
  };
};

const createDeleteRequest = function ({ mongooseSchema }) {
  return async (req, res) => {
    const { id } = req.params;
    // delete the mongoose object
    try {
      const mongooseObject = await mongooseSchema.findById(id);
      if (!mongooseObject)
        return res.status(404).send(`${mongooseSchema.modelName} not Found!`);
      return res.send(await mongooseObject.remove());
    } catch (ex) {
      return res.status(500).send(ex);
    }
  };
};

module.exports = {
  createPostRequest,
  createGetRequest,
  createGetAllRequest,
  createPutRequest,
  createDeleteRequest,
};

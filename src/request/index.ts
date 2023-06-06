const validateJoi = require("../validation")

export const createPostRequest = function ({ mongooseSchema, joiSchema }: any) {
  return async (req: any, res: any) => {
    // validate the request body
    const error = validateJoi(joiSchema, req.body)
    if (error) return res.status(400).send(error)
    // create the object in mongoose
    const mongooseObject = new mongooseSchema(req.body)
    try {
      // save the category
      return res.send(await mongooseObject.save())
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}

export const createGetRequest = function ({ mongooseSchema }: any) {
  return async (req: any, res: any) => {
    const { id } = req.params
    try {
      const mongooseObject = await mongooseSchema.findById(id)
      if (!mongooseObject)
        return res.status(404).send(`${mongooseSchema.modelName} not Found!`)
      return res.send(mongooseObject)
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}

export const createGetAllRequest = function ({ mongooseSchema }: any) {
  return async (req: any, res: any) => {
    try {
      const categories = await mongooseSchema.find()
      return res.send(categories)
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}

export const createPutRequest = function ({ mongooseSchema, joiSchema }: any) {
  return async (req: any, res: any) => {
    const { id } = req.params
    // validate the request body
    const error = validateJoi(joiSchema, req.body)
    if (error) return res.status(400).send(error)
    // check to see if any document exists with the current id
    const doesExist = await mongooseSchema.findById(id)
    if (!doesExist)
      return res.status(404).send(`${mongooseSchema.modelName} not Found!`)
    try {
      const mongooseObject = await mongooseSchema.findByIdAndUpdate(
        id,
        req.body
      )
      return res.send(mongooseObject)
    } catch (ex) {
      return res.status(500).send(ex)
    }
  }
}

export const createDeleteRequest = function ({ mongooseSchema }: any) {
  return async (req: any, res: any) => {
    const { id } = req.params
    // delete the mongoose object
    try {
      const mongooseObject = await mongooseSchema.findById(id)
      if (!mongooseObject)
        return res.status(404).send(`${mongooseSchema.modelName} not Found!`)
      return res.send(await mongooseObject.remove())
    } catch (ex) {
      return res.status(500).send(ex)
    }
  }
}

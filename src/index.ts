import * as express from "express"
import { Express } from "express"

import {
  createPostRequest,
  createGetRequest,
  createPutRequest,
  createDeleteRequest,
  createGetAllRequest,
} from "./request"

const methods = { POST: 0, GET: 1, PUT: 2, DELETE: 3 }

interface ReExpress extends Express {
  endpoint?: any
}

const app: ReExpress = express()

app.use(express.json())
/**
 *
 * @param {String} name
 * @param {number[]} method
 * @param {Object} schema
 */
app.endpoint = function endpoint(name: any, method: any, schema: any) {
  if (method.includes(methods.POST)) {
    app.post(`/${name}`, createPostRequest(schema))
  }

  if (method.includes(methods.GET)) {
    app.get(`/${name}/:id`, createGetRequest(schema))
    // get all items route
    app.get(`/${name}`, createGetAllRequest(schema))
  }

  if (method.includes(methods.PUT)) {
    app.put(`/${name}/:id`, createPutRequest(schema))
  }

  if (method.includes(methods.DELETE)) {
    app.delete(`/${name}/:id`, createDeleteRequest(schema))
  }
}

function reexpress(): ReExpress {
  return app
}

module.exports = reexpress
module.exports.methods = methods

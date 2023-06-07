import * as express from "express"
import { Express } from "express"

import {
  createPostRequest,
  createGetRequest,
  createPutRequest,
  createDeleteRequest,
  createGetAllRequest,
} from "./request"

type Method = "POST" | "GET" | "PUT" | "DELETE"

interface ReExpress extends Express {
  endpoint?: any
}

const app: ReExpress = express()

app.use(express.json())

app.endpoint = function endpoint(name: string, methods: Method[], schema: any) {
  if (methods.includes("POST")) {
    app.post(`/${name}`, createPostRequest(schema))
  }

  if (methods.includes("GET")) {
    app.get(`/${name}/:id`, createGetRequest(schema))
    // get all items route
    app.get(`/${name}`, createGetAllRequest(schema))
  }

  if (methods.includes("PUT")) {
    app.put(`/${name}/:id`, createPutRequest(schema))
  }

  if (methods.includes("DELETE")) {
    app.delete(`/${name}/:id`, createDeleteRequest(schema))
  }
}

function reexpress(): ReExpress {
  return app
}

module.exports = reexpress

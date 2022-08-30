const express = require("express");

const {
  createPostRequest,
  createGetRequest,
  createPutRequest,
  createDeleteRequest,
} = require("./request");

const methods = { POST: 0, GET: 1, PUT: 2, DELETE: 3 };

const app = express();

app.use(express.json());
/**
 *
 * @param {String} name
 * @param {number[]} method
 * @param {Object} schema
 */
app.endpoint = function endpoint(name, method, schema) {
  if (method.includes(methods.POST)) {
    app.post(`/${name}`, createPostRequest(schema));
  }

  if (method.includes(methods.GET)) {
    app.get(`/${name}`, createGetRequest());
  }

  if (method.includes(methods.PUT)) {
    app.put(`/${name}`, createPutRequest());
  }

  if (method.includes(methods.DELETE)) {
    app.delete(`/${name}`, createDeleteRequest());
  }
};

function reexpress() {
  return app;
}

module.exports = reexpress;
module.exports.methods = methods;

# Re Express

Javascript library to build Restful API's super fast.

It is build on top of ExpressJS & provides the express app object with additional functions to build an endpoint super fast.

## 1. Usage

```
const reexpress = require("re-express");
const { methods } = require("re-express");

// initialize the app object
const app = reexpress();

// create the endpoint using the re-express by specifying the enpoint name and methods
app.endpoint("todo", [methods.POST, methods.GET]);

app.listen(3000, () => console.log("Listening on Port 3000"));

```

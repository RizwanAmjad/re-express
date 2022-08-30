# Re Express

Javascript library to build Restful API's super fast.

It is build on top of ExpressJS & provides the express app object with additional functions to build an endpoint super fast.

# Usage

1. **Import the dependencies**

```
const reexpress = require("re-express");
const { methods } = require("re-express");
const { mongoose } = require("mongoose");
```

2. **Initiailize the app and Connect to mongoose**

```
const app = reexpress();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/test-re-express";

```

3. **Create mongoose schema and yup validation schema**
   Preferably, in any module (in this example `./models/user.js`)

```
const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 255 },
  email: { type: String, required: true, match: /\S+@\S+\.\S+/, unique: true },
  password: { type: String, require: true },
});

const User = mongoose.model("User", UserSchema);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().label("Name"),
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().min(8).max(1024).label("Password"),
});

module.exports = { User, joiSchema };
```

4. **Create the endpoint**

```
app.endpoint("todo", [methods.POST, methods.GET], {
  mongooseSchema: User,
  joiSchema,
});
```

# Complete Example

```
const reexpress = require("re-express");
const { methods } = require("re-express");

// initialize the app object
const app = reexpress();

// create the endpoint using the re-express by specifying the enpoint name and methods
app.endpoint("todo", [methods.POST, methods.GET]);

app.listen(3000, () => console.log("Listening on Port 3000"));

```

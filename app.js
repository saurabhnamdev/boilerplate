const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");
const InitiateMongoServer = require("./src/mongo/db");
const userRouter = require("./src/api/users");

InitiateMongoServer();
app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/api/user", userRouter);

module.exports = app;

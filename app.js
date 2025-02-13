// Express
const express = require("express");
const app = express();

require("dotenv").config();

//Regulare middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//MongoDB connection
const connectWithDB = require("./db/db");
connectWithDB();
// Morgan logger
const morgan = require("morgan");
app.use(morgan("tiny"));

//User routes
const user = require("./routers/userRouter");
app.use("/api/v1", user);
PORT = process.env.PORT || 8030;
app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});

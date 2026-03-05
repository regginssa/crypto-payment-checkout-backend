const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use("/api", require("./routes"));

const connectDB = require("./config/db");
connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Checkout server is running on ${PORT}`));

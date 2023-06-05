const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

app. use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGOOSE_URL,()=>{
  console.log("connected");
})

app.listen(8000,()=>{
  console.log("server is running");
})

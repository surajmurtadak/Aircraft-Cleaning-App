const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const app = express();

mongoose
.connect("mongodb://localhost:27017/aircraft")
.then(()=>console.log("Mongo Connection Established"))
.catch((err)=>console.log("Connection Error: ",err));

app.use("/",router);

app.listen(4000,()=>console.log("App running on port 4000"));
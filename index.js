const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//MongoDB connection

mongoose
.connect("mongodb://localhost:27017/aircraft")
.then(()=>console.log("Mongo Connection Established"))
.catch((err)=>console.log("Connection Error: ",err));

app.use("/",userRouter);

app.listen(5000,()=>console.log("App running on port 5000"));
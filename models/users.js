const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    role : String
});

const userCollection = new mongoose.model("userCollection",userSchema);

module.exports = userCollection;
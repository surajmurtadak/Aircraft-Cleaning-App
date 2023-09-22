const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['employee', 'admin'],
        required: true
    },
    city: {
        type: String,
        required: true
    }
  });

const userCollection = new mongoose.model("userCollection",userSchema);

module.exports = userCollection;

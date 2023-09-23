const express = require('express');
const userRouter = express.Router();
const {homeController, signUpController, loginController, profileController} = require("../controllers/user");
const varification = require("../middleware/varification");

// API for homepage

userRouter.get("/",homeController);

//API for login user

userRouter.post("/login",loginController);

//API for signup user

userRouter.post("/signup",signUpController);

//API for access profile

userRouter.post("/profile",varification,profileController);


module.exports = userRouter;
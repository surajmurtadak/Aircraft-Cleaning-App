const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const signUpController = require("../controllers/signUpController");
const profileController = require("../controllers/profileController");
const varification = require("../middleware/varification");

router.get("/",homeController);
router.post("/login",loginController);
router.post("/signup",signUpController);
router.post("/profile",varification,profileController);


module.exports = router;
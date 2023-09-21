const userCollection = require("../models/users");

const homeController = (req,res) =>{
    const newUser = new userCollection({
        name : "Suraj Murtadak",
        role : "admin"
    });
    newUser.save()
    .then((data)=>res.send(data))
    .catch((err)=>res.send(err));
};

module.exports = homeController;
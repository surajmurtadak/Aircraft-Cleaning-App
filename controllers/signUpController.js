const userCollection = require("../models/users");
const bcrypt = require('bcrypt');
require("dotenv").config();
const saltRounds = Number(process.env.SALT_ROUNDS);
const signUpController = async(req,res) =>{

    const {username,email,password,role,city} = req.body;
    const existedUser = await userCollection.findOne({email});
    console.log(existedUser);
    if(!existedUser){
        console.log("if");
        console.log(typeof saltRounds);
        bcrypt.hash(password,saltRounds,(err,hashedPass)=>{
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                const newUser = new userCollection({
                    username,
                    email,
                    password:hashedPass,
                    role,
                    city
                });

                newUser.save()
                .then((data)=>{
                    res.json({
                        message:"successfully Registered",
                        data
                    });
                })
                .catch((err)=>{
                    res.status(400).send(`${err}`);
                });
    
            }
        });

    }
    else{
        console.log("else");
        res.status(409).json({ message: "The email address you've entered is already associated with an existing account."});
    }
}

module.exports = signUpController;
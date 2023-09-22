const userCollection = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

const loginController = async(req,res) =>{
    const {email,password} = req.body;
    try{

        const userData = await userCollection.findOne({email});
        console.log(password);
        if(userData){

            bcrypt
            .compare(password,userData.password)
            .then((result)=>{
                if(result){
                const payload = { username : userData.username, email: email, role : userData.role };
                const secretKey = process.env.SECRET_KEY;
                const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

                return res.json({ success: true, token: token ,result});
                }
                else{
                    return res.status(401).json({
                        message: "Incorrect password",
                       });
                }

            })
            .catch((err)=>{
                return res.status(401).json({
                    message: "Something went wrong",
                    error:`${err}`
                   });
            });
            
        }
        else{

            return res.status(404).json({ message: "User not found"});
        }
    }
    catch(err){

       return res.status(400).json({ message: `Something went wrong : ${err}` });
    }
};

module.exports = loginController;
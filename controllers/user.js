const userCollection = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = Number(process.env.SALT_ROUNDS);

// Controller for fetch all UserData

module.exports.homeController = async(req,res) =>{
    const allUserData = await userCollection.find();
    res.json({
        message:"Welcome to Aircraft Cleaning App",
        data:allUserData
    });
}; 

//Controller for signup route 

module.exports.signUpController = async(req,res) =>{

    const {username,email,password,role,city} = req.body;

    const existedUser = await userCollection.findOne({email});

    if(!existedUser){

        bcrypt.hash(password,saltRounds,(err,hashedPass)=>{

            if(err){
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
        res.status(409).json({ message: "The email address you've entered is already associated with an existing account."});
    }
}

//Controller for login route

module.exports.loginController = async(req,res) =>{
    const {email,password} = req.body;
    try{

        const userData = await userCollection.findOne({email});

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

//Controller for profile route

module.exports.profileController = (req,res) => {

    jwt.verify(req.token,process.env.SECRET_KEY,(err,authData)=>{
        
        if(err){
            res.status(401).json({ message: "Invalid token"});
        }
        else{
            res.json({
                message: "profile accessed",
                data : authData
            })
        }
    })
}
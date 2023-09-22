const jwt = require("jsonwebtoken");

const profileController = (req,res) => {
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

module.exports = profileController;
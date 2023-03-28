
const db = require("../../models/index.js");
const userModel = db.user;


const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require('dotenv').config()


const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  var usr = {
    name: req.body.name,
    last_name: req.body.lastname,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  };

  try {
    created_user = await userModel.create(usr);
    res.status(201).json({ insertionId: created_user.id });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
     
      res.status(409).json({ message: "Email is already in use" });
    } else {
      
      res.status(500).json({ message: "An error occurred while registering the user" });
    }
  }
};

const login = async(req,res)=>{
  const user = await userModel.findOne({ where : {email : req.body.email }});
  const userId =user.id
  if(user){
     const password_valid = await bcrypt.compare(req.body.password,user.password);
     
     if(password_valid){
         const token = jwt.sign({userId},process.env.SECRET_KEY,{ expiresIn: '8h' });
         
         res.status(200).json({ token : token,userId:user.id});
     } else {
       res.status(403).json({ error : "Password or user Incorrect" });
     }
   
   }else{
     res.status(403).json({ error :  "Password or user Incorrect"});
   }
   
   };

function verifyToken(req, res, next) {

  const authHeader = req.headers["authorization"]
  const reqUser=req.params.id
  
  
  if (!authHeader) {
    return res.status(401).send({ message: 'Authorization header missing' });
  }
  
  jwt.verify(authHeader, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Invalid token' });
    }
    
    if(decoded.exp <= Date.now() / 1000){
      return res.status(403).send({ message: 'Invalid token' })
    }
    const userIdFromToken = decoded.userId
    if(userIdFromToken == reqUser){
      next();
    } else {return res.status(403).send({ message: 'Invalid token' });}
    

  });
}



module.exports = {
    registerUser,
    login,
    verifyToken
  }



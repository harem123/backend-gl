
const db = require("../../models/index.js");
const userModel = db.user;


const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//TODO const dotenv = require('dotenv');
// TODO add try catch

const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    var usr = {
        name : req.body.name,
        last_name:req.body.lastname,
        email : req.body.email,
        password : await bcrypt.hash(req.body.password, salt)
      };
      created_user = await userModel.create(usr);        
      res.status(201).json({insertionId: created_user.id});
}

const login = async(req,res)=>{
  const user = await userModel.findOne({ where : {email : req.body.email }});
  if(user){
     const password_valid = await bcrypt.compare(req.body.password,user.password);
     if(password_valid){
         token = jwt.sign({ "id" : user.id,"email" : user.email },'my_secret_token');
         res.status(200).json({ token : token});
     } else {
       res.status(400).json({ error : "Password or user Incorrect" });
     }
   
   }else{
     res.status(400).json({ error :  "Password or user Incorrect"});
   }
   
   };

   const validateToken= (req,res,next) =>{
    jwt.verify(req.token, 'my_secret_token', (err) => {
        if(err) {
            console.log("not validated")
          //  res.sendStatus(404)
        } else {
            console.log("validated")
           next()
        }
    })
}

   function ensureToken (req,res,next) {
    const bearHeader = req.headers["authorization"]
    console.log("token "+ bearHeader)
    if (typeof bearHeader != 'undefined') {
        const bearer = bearHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        //////
        
               next()
           
       //////
    } else  { res.sendStatus(403)}
}



function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}



module.exports = {
    registerUser,
    login,
    ensureToken,
    validateToken
  }



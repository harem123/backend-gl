const express = require("express")
const router =  express.Router()
const v1ControlStatistics= require('../controllers/controlStatistics.js')
const v1RegistControl = require('../controllers/userControl')

//router.get("/sessions", v1ControlStatistics.getSessions); 
router.post("/sessions", v1ControlStatistics.createSession); 
router.get("/stats/:id", v1ControlStatistics.getStatsProtected); 
router.post("/register", v1RegistControl.registerUser);
router.post("/login", v1RegistControl.login);
router.get('/protected', verifyToken, (req, res) => {
  res.send({ message: 'You have access to protected content' });
});

// exporting modules
module.exports = router

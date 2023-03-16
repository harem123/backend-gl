const express = require("express")
const router =  express.Router()
const v1ControlStatistics= require('../controllers/controlStatistics.js')
const v1RegistControl = require('../controllers/userControl')

//router.get("/sessions", v1ControlStatistics.getSessions); 
router.post("/sessions", v1ControlStatistics.createSession); 
router.post("/register", v1RegistControl.registerUser);
router.post("/login", v1RegistControl.login);
// exporting modules
module.exports = router
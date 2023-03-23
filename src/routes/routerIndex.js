const express = require("express")
const router =  express.Router()
const v1ControlStatistics= require('../controllers/controlStatistics.js')
const v1UserControl = require('../controllers/userControl')

//router.get("/sessions", v1ControlStatistics.getSessions); 
router.post("/sessions", v1ControlStatistics.createSession); 
router.get("/stats/:id", v1ControlStatistics.getStatsProtected); 
router.post("/register", v1UserControl.registerUser);
router.post("/login", v1UserControl.login);
router.get('/protected', v1UserControl.verifyToken, (req, res) => {
  res.send({ message: 'You have access to protected content' });
});
router.get('/protectedstats/:id', v1UserControl.verifyToken, v1ControlStatistics.getStatByUser );

// exporting modules
module.exports = router

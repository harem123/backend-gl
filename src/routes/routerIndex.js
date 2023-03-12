const express = require("express")
const router =  express.Router()
const v1ControlStatistics= require('../controllers/controlStatistics.js')


router.get("/",(req, res) => {
    res.send('Hello World!')
  })
  router.post("/statistics", v1ControlStatistics.createSession); 
// exporting modules
module.exports = router
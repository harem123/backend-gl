const url = require('url');
const express = require("express");
const bodyParser = require('body-parser')
const v1Router = require('./src/routes/routerIndex.js')

const app = express();



app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Router)
require('dotenv').config();
let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
// exports server for testing
module.exports = app; 
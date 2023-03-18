const url = require('url');
const express = require("express");
const bodyParser = require('body-parser')
const v1Router = require('./src/routes/routerIndex.js')

const app = express();



app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Router)
require('dotenv').config();
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
// exports server for testing
module.exports = app; 
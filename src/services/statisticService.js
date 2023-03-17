const db = require("../../models/index.js");

const statsModel = db.stat;



const  postSession= async (newSession) => {
  try{
    const createResult = statsModel.create(newSession);
  
    return (createResult.score)
  }
  catch(error){
    console.log(error)
  }
  
}

const  getStats= async (user) => {
  try{
    
    const queryResult = await statsModel.findByPk(user);
if (queryResult === null) {
  console.log('Not found!');
} else {
  console.log(queryResult.score ); // true
  // Its primary key is 123
}
    return (queryResult.score)
  }
  catch(error){
    console.log(error)
  }
  
}
/////// exports
  module.exports = {
    
    postSession,
    getStats
    
 }
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

/////// exports
  module.exports = {
    
    postSession,
    
 }
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
    
    const { count, rows } = await statsModel.findAndCountAll({
      where: {
        user_id: user
      },
      order: [ [ 'createdAt', 'DESC' ]],
      limit: 2
    });

  
  return ({count,rows})

    
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
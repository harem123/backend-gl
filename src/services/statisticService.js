const db = require("../../models/index.js");

const statsModel = db.stat;
const averageModel = db.average;


const  postSession= async (newSession) => {
  try{
    const createResult = await statsModel.create(newSession);
    console.log(createResult)
    const dateInsert = createResult.createdAt
    return (dateInsert)
  }
  catch(error){
    console.log(error)
  }
  
}
const postAverage = async (newSession) => {
  try{
    const createResult = await averageModel.create(newSession);
  
    return (createResult)
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
      limit: 30
    });

  
  return ({count,rows})
  }
  catch(error){
    console.log(error)
  }
  
}

const findOrCreateAvr = async (user) => {
  try{
    
    const [stat, created ] = await averageModel.findOrCreate({
      where: {
        user_id: user
      },
      defaults: {
      user_id: user,
      shots_acc:0,
      score:0,
      average_score: 0,
      average_time: 0,
      average_fails: 0,
      average_hits: 0,
      time_progress:0,
      score_progress:0,
      hits_progress:0,
      fails_progress:0
      },
      order: [ [ 'createdAt', 'DESC' ]],
      limit: 1
    });
 
  return ({stat,created})    
  }
  catch(error){
    console.log(error)
  }
}

const  getAvr= async (user) => {
  try{
    const { count,rows } = await averageModel.findAndCountAll({
      where: {
        user_id: user
      },
      order: [ [ 'createdAt', 'DESC' ]],
      limit: 5
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
    getStats,
    getAvr,
    postAverage,
    findOrCreateAvr
    
 }
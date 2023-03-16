const v1ServiceStats= require('../services/statisticService.js')

const createSession = async (req, res) => {
    
   const {body} = req
   if ( 
     !body.id 
   ){
     return
   }
  // inicializo la info
  const newSession= {
    user_id: body.id,
   score:body.score,
   total_blue: body.total_blue,
   total_red: body.total_red,
    total_green: body.total_green,
    total_white: body.total_white,
    total_time_sec: body.total_time,
    total_shots:  body.total_shots,
    machine_id: body.machine_id
  }
  
   
   try {
    createdGenre= await v1ServiceStats.postSession(newSession)
     res.status(201).send({status:"OK"} );
   } catch (error) {
     console.log(error)
     res.status(500).send({status:"FAILED"});
   } 
 };

 module.exports = {
    createSession
    
  }
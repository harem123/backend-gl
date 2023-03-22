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
const newAvr= {
  user_id: body.id,
  average_score: body.score/body.total_shots,
    average_time: body.total_time/body.total_shots,
    average_fails: body.total_red/body.total_shots,
    average_hits: (body.total_green+body.total_blue+body.total_white)/body.total_shots,
}
console.log(newAvr)
   try {
    createdSession= await v1ServiceStats.postSession(newSession)
    createdAverage= await v1ServiceStats.postAverage(newAvr)
     res.status(201).send({status:"OK",createdAverage} );
   } catch (error) {
     console.log(error)
     res.status(500).send({status:"FAILED"});
   } 
 };


 const getStatByUser = async (req, res) => {
  const userId = req.params.id;  
  
  try {
   statResult= await v1ServiceStats.getStats(userId)
   avrResult= await v1ServiceStats.getAvr(userId) 
   
   
   const countStats = statResult.count
   const countAverage = avrResult.count
   console.log(countAverage)
   const scoreAcc = (avrResult.rows.reduce((acc, row) => {
    return acc + parseInt(row.average_score);
  }, 0));

  const failsAcc = avrResult.rows.slice(1).reduce((acc, row) => {
    return acc + parseInt(row.average_fails);
  }, 0);
  
  const time = statResult.rows.reduce((acc, row) => {
    return acc + parseInt(row.total_time_sec);
  }, 0);

  const scoreProgres = (statResult.rows[0].score*100)/(scoreAcc/countStats)
  const timeProgres = 0.8
  const failsProgres = avrResult.rows[0].average_fails-(failsAcc/countAverage)
  const hitProgres = 0.2
  
  const summary = {
    score:{totScore: statResult.rows[0].score,
          progress:scoreProgres},
    time:{timeAvr:avrResult.rows[0].average_time,
          progress:timeProgres},
    hits:{hitPercent:avrResult.rows[0].average_hits,
      progress:hitProgres},
    fails:{failPercent:avrResult.rows[0].average_fails,
        progress:failsProgres},
  }
   
    
    res.status(201).send({summary,countStats,scoreAcc} );
   
   
  } catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 
};


 module.exports = {
    createSession,
    getStatByUser
  }
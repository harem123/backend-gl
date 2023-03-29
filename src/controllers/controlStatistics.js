
const v1ServiceStats= require('../services/statisticService.js')
const security= require('../controllers/userControl.js')

const createSession = async (req, res) => {
    
   const {body} = req
   if ( 
     !body.id 
   ){
    res.status(500).send({status:"FAILED"});
   }
  // inicializo la info
  const newSession= {
    user_id: body.id,
   score:body.score,
   total_blue: body.total_blue,
   total_red: body.total_red,
    total_green: body.total_green,
    total_white: body.total_white,
    total_time_sec: body.total_time_sec,
    total_shots:  body.total_shots,
    machine_id: body.machine_id
  }

   try {
    createdSession= await v1ServiceStats.postSession(newSession)

    getAverage= await v1ServiceStats.findOrCreateAvr(body.id)
    
    const stats = getAverage.stat
    let shots_acc = stats.shots_acc
    const shots = (shots_acc + body.total_shots)
    const scoreAcc= (parseInt(stats.average_score)*parseInt(stats.shots_acc))
    const timeAcc= (parseInt(stats.average_time)*parseInt(stats.shots_acc))
    const hitsAcc= (parseInt(stats.average_hits)*parseInt(stats.shots_acc))
    const failsAcc= (parseInt(stats.average_fails)*parseInt(stats.shots_acc))
    let newAvr = {
      user_id: body.id,
      shots_acc:getAverage.stat.shots_acc + body.total_shots,
      score:body.score,
      average_score: (scoreAcc + body.score) / (shots),
      average_time: (timeAcc + body.total_time_sec) / (shots),
      average_hits: (hitsAcc + body.total_blue + body.total_green+ body.total_white) / (shots),
      average_fails: (failsAcc + body.total_red) / (shots)
    }

    if (getAverage.created){
      
        newAvr.average_score=  body.score /  body.total_shots
        newAvr.average_time= ( body.total_time_sec) / (body.total_shots)
        newAvr.average_hits= ( body.total_blue + body.total_green +body.total_white) / (body.total_shots)
        newAvr.average_fails= ( body.total_red)  / (body.total_shots)
    }

    console.log(newAvr.average_score)
    
    createdAverage= await v1ServiceStats.postAverage(newAvr)
   
    res.status(201).send({status:"OK",newAvr} );
   } catch (error) {
     console.log(error)
     res.status(500).send({status:"FAILED"});
   } 
 };

 ////////////////////////////////////////////////

 const protectedSection = async (req,res) =>{
  const userId = req.params.id; 
  jwt.verify(req.token, 'my_secret_token', (err,data) => {
      if(err) {
        res.status(403).send({status:"FAILED"});
      } 
      })
      try {
        statResult= await v1ServiceStats.getStats(userId)
        avrResult= await v1ServiceStats.getAvr(userId) 
        res.status(201).send({summary,countStats,scoreAcc} );
      }  catch(error) {
        res.status(500).send({status:"FAILED"});
      }  
}
 

//////////////////////////////////////////////////
 const getStatByUser = async (req, res) => {
  const userId = req.params.id;  
  
  try {
     
   avrResult= await v1ServiceStats.getAvr(userId) 
   const countAverage = avrResult.count-1
  
   const scoreAcc = (avrResult.rows.slice(1).reduce((acc, row) => {
    return acc + parseInt(row.average_score);
  }, 0));

  const failsAcc = avrResult.rows.slice(1).reduce((acc, row) => {
    return acc + parseInt(row.average_fails);
  }, 0);

  const hitsAcc = avrResult.rows.slice(1).reduce((acc, row) => {
    return acc + parseInt(row.average_hits);
  }, 0);
  

  const scoreProgres = (avrResult.rows[0].average_score)-(scoreAcc/countAverage)
  const failsProgres = avrResult.rows[0].average_fails-(failsAcc/countAverage)
  const hitProgres = avrResult.rows[0].average_hits-(hitsAcc/countAverage)
  
  const summary = {
    score:{totScore: avrResult.rows[0].score,
          progress:scoreProgres},
    time:{timeAvr:avrResult.rows[0].average_time},
    hits:{hitPercent:avrResult.rows[0].average_hits,
      progress:hitProgres},
    fails:{failPercent:avrResult.rows[0].average_fails,
        progress:failsProgres},
  }
   
    res.status(201).send({summary,countAverage,scoreAcc} );
   
  
  } catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 

};

//////////////////////////// dont works

const getStatsProtected = async (req, res) => {
   
  
  try {
  
  security.ensureToken(req, res, function (err) {
   });

    security.validateToken(req, res, function (err) {
    });

    userId= req.params.id
    statResult= await v1ServiceStats.getStats(userId)
   avrResult= await v1ServiceStats.getAvr(userId) 

   const countAverage = avrResult.count-1
   res.status(201).send({countAverage} );
     
  } 
  catch (error) {
    console.log(error)
    res.status(500).send({status:"FAllA"});
  } 
};


 module.exports = {
    createSession,
    getStatByUser,
    protectedSection,
    getStatsProtected
  }
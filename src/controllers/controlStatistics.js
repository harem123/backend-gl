
const createSession = async (req, res) => {
    
   const {body} = req
   if ( 
     !body.id
   ){
     return
   }
  // inicializo la info
  const newSession= {
   id: body.id,
   score:body.score
  }
  console.log(newSession.score)
   //onst createdUser = usersModel.create(newUser);
   try {
     
     res.status(201).send({status:"OK"} );
   } catch (error) {
     console.log(error)
     res.status(500).send({status:"FAILED"});
   } 
 };

 module.exports = {
    createSession
    
  }
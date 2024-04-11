const express=require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');

router.post('/api/login',async (req,res)=>{
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  const formData=req.body
  try {
    const user = await usersCollection.findOne( {email: formData.email} );
    if(user.password==formData.password){
      res.json({
        user:user
    })
    }
    else{
      throw new Error('password not correct')
    }
  } catch (err) {
    throw new Error('error getting user')
  }
})

module.exports = router;

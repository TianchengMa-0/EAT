const express=require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');

router.post('/api/signup',async (req,res)=>{
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const formData=req.body
    
      const user = await usersCollection.findOne( {email: formData.email} );
      if (user){
        console.log("user already exists");
        return
      }
    
    try {
      const result = await usersCollection.insertOne({ email: formData.email, password: formData.password });
      console.log('User created:', result.insertedId);
    } catch (err) {
      throw new Error('Error creating user')
    }
    res.json({
        message:'form data is received successfully!'
    })
})

module.exports = router;

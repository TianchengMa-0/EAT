const express=require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');

router.post('/api/saveWeight',async (req,res)=>{
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const formData=req.body
    
    const user = await usersCollection.findOne( {email: formData.email} );
    if (!user){
        console.log("user does not exist");
        return
    }    
    try {
      const result = await usersCollection.updateOne(
        { email: formData.email },
        { $push: { weight: formData.weight, unit:formData.unit } }
      );
      if (result.modifiedCount === 0) {
        throw new Error("No changes made to the user");
      }
    } catch (err) {
        console.error(err);
    }
    res.json({
        message:'form data is received successfully!'
    })
})

router.post('/api/fetchWeight',async (req,res)=>{
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const formData=req.body
    
    const user = await usersCollection.findOne( {email: formData.username} );
    if (!user){
        console.log("user does not exist");
        return
    }else{
        res.json({
            weight:user.weight,
            unit:user.unit
        })
    }
})

module.exports = router;

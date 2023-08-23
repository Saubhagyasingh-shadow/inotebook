 const express = require('express');
 const User = require('../models/User');
 const router = express.Router();
const {body,validationResult} =require('express-validator')
const bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken');
const JWT_SECRET='harryisagoodboy'

var fetchuser=require('../middleware/fetchuser')
 //Route1: Create a User using: POST "/api/auth/createUser".Does not require login
 router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5}),

 ],async (req,res)=>{
    //if there are errors ,return Bad request and errors
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   try{
  // check whether user with this email exists already 
   let user =await User.findOne({email:req.body.email});
   if(user){
    return res.status(400).json({error:"sorry a user with this email alreadyb exists"})
   }
   const salt =await bcrypt.genSalt(10);
   secPass=await bcrypt.hash(req.body.password,salt);
   user = await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass
   })
//    .then(user=>res.json(user))
//    .catch(err=> {console.log(err); res.json({error:'Please enter a unique value for email',message:err.message})})
const data={
    user:{
        id:user.id
    }
}
const authtoken=jwt.sign(data,JWT_SECRET);

res.json({authtoken}) 
   }catch(error){
    console.error(error.message);
    res.status(500).send("some error ocured")
   }
})

//Route2:Authenticate a user using:"api/auth/login"
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password can not be blank').exists(),

 ],async (req,res)=>{
   //if there are errors ,return Bad request and errors
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   const {email,password}=req.body;
   try{
  let user=await User.findOne({email});
  if(!user){
    return res.status(400).json({error:"please try to login with corrrect credentials"})
  }

  const passwordCompare= await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    return res.status(400,json({error:"please try ton login with correct credentials"}))
  }
  const data={
    user:{id:user.id}
  }
  const authtoken=jwt.sign(data,JWT_SECRET);
  res.json({authtoken})

 }catch(error){
    console.error(error.message);
    res.status(500).send("internal server error ocured")
 }});

//ROUTE 3: loggedin  User details using:POST "/api/auth/getuser".login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try{
       const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
})


 module.exports=router
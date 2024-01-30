// const express = require('express');
// const router = express.Router();
// const con = require('../db/connect.js');
// const jwt = require('jsonwebtoken');


// router.get('/',(req ,res ,next)=>{
//     res.json({msg:'hellow world'})
// })

// // jwt playload
// const payload = (req)=>{
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token , process.env.JWT_SECRET);
//     return decoded;
// }

// // midleware
// const authenticationToken = (req , res , next)=>{
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         if (!token) {
//             res.status(401).json({msg:'not token'});
//         }
//         const decoded  = jwt.verify(token , process.env.JWT_SECRET);
//         if (decoded) {
//             next();
//         }
//     }catch  {
//         res.status(403).json({msg:'authen error'});

//     }
// }




// router.post('/login', async (req , res)=>{
//     const {username , password} = req.body;
//     await con.connect();
//     const resault = await con.query("select * from users where username = $1 and password = $2 " , [username , password]) 
//     if (resault.rowCount > 0) {
        
        
//         const token = jwt.sign({id:resault.rows[0].id} , process.env.JWT_SECRET , {expiresIn: '1h'})
//         res.status(200).json({msg:'login success',token:token})
//     }else {
//         res.status(404).send("not users")
//     }
    
// })




// router.get('/posts', async (req ,res ,next)=>{
//     await con.connect()
//     const resault = await con.query("select * from posts")
//     res.json({data:resault.rows})
//     con.end()
// })



// router.get('/posts/public/feed' , async (req , res)=>{
//     await con.connect();
    
//     const resault = await con.query("select * from posts")
//     if (resault ) {
//         res.status(201).json({data:resault.rows})
//     }
    
// })




// router.post('/posts/create'  , authenticationToken , async (req , res)=>{
//     await con.connect();
//     const paload = payload(req)
//     const {userid , content }= req.body;
//     const resault = await con.query("insert into posts(user_id , content) values($1 , $2 ) " , [paload.id , content])
//     if (resault ) {
//         res.status(201).json({msg:'posts success'})
//     }
    
// })








// module.exports = router
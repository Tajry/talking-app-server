const express = require('express');
const router = express.Router();
const con = require('../db/connect.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;


router.post('/signin' , async (req , res , next)=>{
    const {username , password} = req.body;
    await con.connect();
    const resault = await con.query("select * from users where username = $1 " , [username]) 
    if (resault.rowCount > 0) {
        
        const match = await bcrypt.compare(password  , resault.rows[0].password)
        if (match) {

            const token = jwt.sign({id:resault.rows[0].id} , process.env.JWT_SECRET , {expiresIn: '1h'})
            return res.status(200).json({msg:'login success',token:token})
        }else {
            return res.status(401).json({msg:'invalid password  '})
        }

    }else {
        return res.status(404).send("users not found")
    }
})




router.post('/signup' ,async (req ,res , next)=>{
    await con.connect();
    const {username ,password } = req.body;
    const count = await con.query("select * from users where username = $1 " ,[username])

    if (count.rowCount > 0) {
        return res.status(400).json({msg:'user alreaydy exists'});
    }else {
        const hash = await bcrypt.hash(password , salt);
        const success = await  con.query("insert into users(username , password ) values($1, $2)",[username , hash]);
        if (success) {
            return res.status(200).json({msg:"signin success"})
        }

    }

    

})










module.exports = router;
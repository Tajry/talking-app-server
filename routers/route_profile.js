const express = require('express');
const router = express.Router();
const con = require('../db/connect.js');
const payload = require('../midleware/payload.js');


router.get('/', async (req ,res ,next)=>{
    const Payload = payload(req);
    const resault = await con.query("select * from users where id = $1" , [Payload.id]);
    if (resault) {
        return  res.status(200).json({data:resault.rows})
    }
})










module.exports = router
const express = require('express');
const router = express.Router();
const con = require('../db/connect.js');
const payload = require('../midleware/payload.js');



router.get('/getuser/:username' , async (req ,res , next)=>{
    const username = req.params.username;

    const sql = `select p.* , u.username , u.avatar from users u inner join  posts p on u.id = p.user_id where u.username = $1 `;

    const resault = await con.query(sql ,[username])

    if (resault.rowCount == 0) {
        return res.status(404).json({msg:"user not found"})
    } else {
        return res.status(200).json({data:resault.rows})
    }
})







module.exports = router
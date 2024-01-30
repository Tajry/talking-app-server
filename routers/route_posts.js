const express = require('express');
const router = express.Router();
const con = require('../db/connect.js');
const payload = require('../midleware/payload.js');



router.get('/feed' , async (req , res , next)=>{
    const data = await con.query('select * from posts')
    return res.status(200).json({data:data.rows})
})


router.post('/insert' , async (req , res , next)=>{
    const {content} = req.body;
    const Playload = payload(req)
    const resault = con.query('insert into posts (user_id , content) values($1 , $2 ) ',[Playload.id , content])
    if (resault) {
        return res.status(201).json({msg:'insert success'})
    }

})



router.patch('/update' , async (req , res , next)=>{
    const {content , id}  = req.body;
    const Playload = await payload(req)
    
    const check = await con.query("select * from posts where id = $1 and user_id = $2 ",[id , Playload.id])

    if (check.rowCount == 0) {
        return res.status(404).json({msg:'not found'})
    }

    const resault = await con.query("update posts set content = $1 where id = $2 and user_id = $3 " , [content , id , Playload.id])

    if (resault) {
        return res.status(200).json({msg:"update success"})
    }

})



router.delete('/delete/:id' , async (req , res ,next)=>{
    const Playload = await payload(req);
    const id = req.params.id
    const check = await con.query("select * from posts where id = $1 and user_id = $2 ",[id , Playload.id])
    if (check.rowCount == 0) {
        return res.status(404).json({msg:'not found'})
    }

    const resault = await con.query("delete from posts where id = $1 and user_id = $2 ",[id , Playload.id])
    
    if (resault) {
        return res.status(200).json({msg:"delete success"})

    }
})








module.exports = router;

const express = require('express');
const router = express.Router();
const con = require('../db/connect.js');
const payload = require('../midleware/payload.js');



router.post('/create/:id' , async (req , res , next)=>{
    
    const id = req.params.id;
    const {content} = req.body;
    const Payload  = await payload(req);
    const resault = await con.query("insert into comment (user_id , posts_id , content) values($1 , $2 ,$3 )" , [Payload.id , id , content])
    if (resault) {
        return res.status(201).json({msg:'success'})
    }


})



router.delete('/delete/:id', async (req , res , next)=>{
    const id = req.params.id;
    const Payload = await payload(req);
    const resault = await con.query("delete from comment where id = $1 and user_id = $2 " , [id , Payload.id]);
    if (resault.rowCount != 0 ) {
        return res.status(200).json({msg:'delete success'})
    }else {
        return res.status(404).json({msg:"not found"})
    }
})


router.patch('/update/:id', async (req ,res , next)=>{
    const id  = req.params.id;
    const {content} = req.body;
    const Payload = await payload(req);
    const resault = await con.query("update comment set content = $1 where id = $2 and user_id = $3 ",[content , id , Payload.id])
    if (resault) {
        return res.status(200).json({msg:'update success'})
    }
})














module.exports = router;
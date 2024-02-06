const express = require('express');
const router = express.Router();
const con = require('../db/connect.js');
const payload = require('../midleware/payload.js');





router.get('/feed' , async (req , res , next)=>{
    const data = await con.query(
        `select p.id , p.content , p.created_at , p.updated_at  , u.username from posts p
        inner join users u on p.user_id = u.id `
        )
    return res.status(200).json({data:data.rows})
})

router.get('/items/:id' , async (req , res , next)=>{
    const id  = req.params.id
    const data = await con.query(
        `select p.id , p.content , p.created_at , p.updated_at  , u.username from posts p
        inner join users u on p.user_id = u.id  where p.id = $1` ,[id]
        )
    return res.status(200).json({data:data.rows})
})



router.get('/postsuser' , async (req , res , next)=>{
    const Payload = payload(req);
    const data = await con.query(
        `select p.id , p.content , p.created_at , p.updated_at , u.username  from posts p
        inner join users u on p.user_id = u.id where p.user_id = $1 order by created_at desc` ,
        [Payload.id]
    )
    return res.status(200).json({data:data.rows})
})

// n
router.post('/insert' , async (req , res , next)=>{
    const {content} = req.body;
    const Playload = payload(req)
    const resault = con.query('insert into posts (user_id , content) values($1 , $2 ) ',[Playload.id , content])
    if (resault) {``
        return res.status(201).json({msg:'insert success'})
    }

})

router.get('/getposts/:id' , async (req ,res ,next)=>{
    const id = req.params.id;
    // console.log(id)
    const Playload = await payload(req)
    const row = await con.query("select * from posts where id = $1 and user_id = $2 ",[id , Playload.id])
    if (row.rowCount == 0) {
        return res.status(404).json({msg:"not found"})
    }else {
        return res.status(200).json({data:row.rows[0]})
    }
    
})


router.post('/update/:id' , async (req , res , next)=>{
    const {content}  = req.body;
    const id = req.params.id;
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



router.get('/delete/:id' , async (req , res ,next)=>{
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

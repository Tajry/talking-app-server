const express  = require('express');
const app = express();
const dotenv = require('dotenv');
const routerLogin = require('./routers/route_login.js');
const routerPosts = require("./routers/route_posts.js");
const routerComment = require("./routers/route_comment.js");
const auth = require('./midleware/auth.js')
dotenv.config()
const PORT = process.env.PORT;


app.use(express.json())


app.use("/authen" ,routerLogin );
app.use("/posts",auth , routerPosts);
app.use("/comment",auth , routerComment);








app.listen(PORT ,(error)=>{
    console.log(`server is runing on port ${PORT}`)
})
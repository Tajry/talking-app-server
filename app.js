const express  = require('express');
const app = express();
const dotenv = require('dotenv');
const routerLogin = require('./routers/route_login.js');
const routerPosts = require("./routers/route_posts.js");
const routerComment = require("./routers/route_comment.js");
const routerProfile = require("./routers/route_profile.js")
const routerUser = require('./routers/route_user.js')
const auth = require('./midleware/auth.js')
const cors = require('cors')
dotenv.config()
const PORT = process.env.PORT;


app.use(express.json())

app.use(cors())

app.use("/authen" ,routerLogin );
app.use("/posts",auth , routerPosts);
app.use("/comment",auth , routerComment);
app.use("/profile",auth , routerProfile);
app.use("/user", auth , routerUser);








app.listen(PORT ,(error)=>{
    if (error) throw error
    console.log(`server is runing on port ${PORT}`)
})
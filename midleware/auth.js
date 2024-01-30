const jwt = require('jsonwebtoken')

module.exports = (req , res , next)=>{
    try {

        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            res.status(401).json({msg:'not token'})
        }
        const decoded  = jwt.verify(token , process.env.JWT_SECRET)
        if (decoded) {
            next()
        }
    }catch  {
        res.status(403).json({msg:'authen error'})

    }
}
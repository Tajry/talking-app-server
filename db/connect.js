const dotenv = require('dotenv')
const {Pool} = require('pg')



dotenv.config()
const connect = new Pool({
    user:process.env.POSTGRES_USERNAME,
    host:process.env.POSTGRES_HOST,
    password:process.env.POSTGRES_PASSWORD,
    database:process.env.POSTGRES_DATABASE,
    port:process.env.POSTGRES_PORT,
})




module.exports = connect;




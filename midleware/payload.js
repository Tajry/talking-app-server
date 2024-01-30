const jwt = require('jsonwebtoken');

const express = require('express')
const payload = (req) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token , process.env.JWT_SECRET )
    return decoded;
}


module.exports = payload
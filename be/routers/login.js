const express = require('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const AuthorModel = require('../moduls/author');
const jwt = require('jsonwebtoken');
require('dotenv').config();

login.post('/login', async (req, res) => {

    const user = await AuthorModel.findOne({ email: req.body.email })

    if (!user) {
        return res.status(404).send({
            message: "User not found",
            statuscode: 404
        })
    }



    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(404).send({
            statuscode: 404,
            message: "Password or email is incorrect"
        });
    }

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '24h'
    })

    res.header('Authorization', token).status(200).send({
        message: 'Login successful',
        statuscode: 200,
        token
    })

})




module.exports = login;
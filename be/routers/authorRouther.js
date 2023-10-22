const express= require('express');
const authors= express.Router();

const AuthorModel = require ('../moduls/author')
const bcrypt = require('bcrypt');


authors.get('/author', async (req, res) => {


    try{
        const author = await AuthorModel.find()

        res.status(200).send({
            statuscode: 200,
            author
        })
    }
    catch(err){
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server"
        })
    }
})

authors.post('/author/create', async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password || '', salt)

    const newAuthor = new AuthorModel({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    })

    try{
        const authorNew = await newAuthor.save()
        res.status(200).send({
            statuscode: 200,
            message: "author saved successfully",
            payload: authorNew

        })
    }
    catch(err){
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server"
        })
    }


})

authors.get('/author/:id', async (req, res) => {

    const {id}= req.params;
    const authorExist = await AuthorModel.findById(id)

    if(!authorExist){
        return res.status(404).send({
            statuscode: 404,
            message: "author not found"
        })
    }
    try{
        res.status(200).send({
            statuscode: 200,
            author: authorExist
        })
    } catch(err){
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server",
            err
        })
    }

})

authors.patch('/author/update/:id', async (req, res) => {

    const {id}=req.params;

    const authorExist = await AuthorModel.findById(id)

    if (!authorExist){
        return res.status(404)({
            statuscode: 404,
            message: 'Author not found'
        })
    }

    try {
        const authorToUpdate = req.body;
        const options = {
            new:true
        }
        const result = await AuthorModel.findByIdAndUpdate(id, authorToUpdate, options);

        res.status(200).send({
            statuscode: 200,
            message:"modified successfully",
            result
        })

    }  catch(err){
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server"
        })
    }
})


authors.delete('/author/delete/:id', async (req,res) => {
    const {id} = req.params;

   
    try{
        const authorToDelete = await AuthorModel.findByIdAndDelete(id);
        if (!authorToDelete){
            return res.status(404).send({
                statuscode: 404,
                message: "author not found"
            })
        }

        res.status(200).send({
            statuscode: 200,
            message: "author deleted"
        })
    } catch(err){
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server",
            err
        })
    }

})

module.exports = authors;


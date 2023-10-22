const express = require('express');
const comments = express.Router();

const CommentModel = require('../moduls/comment')

comments.get('/comments', async (req, res) => {


    try {

        const comment = await CommentModel.find()
        .populate('author')
        res.status(200).send({
            statuscode: 200,
            message: "comment found",
            comment
        })
    } catch (err) {
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server"
        })
    }

})

comments.post('/comments/create', async (req, res) => {

    const newComment = await CommentModel({
        comment: req.body.comment,
         rate: req.body.rate
        // author: req.body.author
    })
    

    try {
        const commentNew = await newComment.save()
        res.status(200).json({
            statuscode: 200,
            message: "comment added successfully",
            comment: commentNew
        })
       
    } catch (err) {
        res.status(400).send({
            statuscode: 400,
            message: "error interno del server",
            err: err
        })
    }



})

comments.patch('/comments/update/:id', async (req, res) => {
    const {id}= req.params;
    const commentExists = await CommentModel.findById(id);

    if (!commentExists){
        return res.status(404)({
            statuscode: 404,
            message: 'The comment does not exist'
        })
    }
    try {
        const commentToUpdate = req.body;
        const options = {
            new:true
        }
        const result = await CommentModel.findByIdAndUpdate(id, commentToUpdate, options)

        res.status(200).send({
            statuscode: 200,
            message: 'Comment updated successfully',
            result: result
        })
    } catch (err) {
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server",
            err
        })
    }
})

comments.get('/comments/:id', async (req, res) => {
    const {id}= req.params;
    const commentExists = await CommentModel.findById(id);

    if (!commentExists){
        return res.status(404).json({
            statuscode: 404,
            message: 'The comment does not exist'
        })
    }
    try { res.status(200).json({
        statuscode: 200,
        message: 'Comment updated successfully',
        comment: commentExists
    })
} catch (err) {
    res.status(500).send({
        statuscode: 500,
        message: "errore interno del server",
        err
    })
}


})

comments.delete('/comments/delete/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const commentToDelete = await CommentModel.findByIdAndDelete(id);
        if (!commentToDelete){
            return res.status(404).send({
                statuscode: 404,
                message: "comment not found"
            });
        }

        res.status(200).send({
            statuscode: 200,
            message: "comment deleted",
            commentToDelete
        })
    } catch (err) {
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server",
            err
        })
    }

})

comments.get("/comments/posts/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const commentPost = await CommentModel.findById(id)
    if (!commentPost){
            return res.status(404).send({
                statuscode: 404,
                message: "comment not found"
            });
        }

        res.status(200).send({
            statuscode: 200,
            message: "post comment successfully",
            commentsPost
        })
    } catch (err) {
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server",
            err
        })
    }
})

module.exports = comments;

const express = require('express');
const post = express.Router();
const multer = require('multer')
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2
const logger = require('../middlewars/logger');
const validatePost = require('../middlewars/validatePost');
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const verifyToken = require('../middlewars/verifyToken');
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARI_CLUOD_NAME,
    api_key: process.env.CLOUDINARI_API_KEY,
    api_secret: process.env.CLOUDINARI_API_SECRET

})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'paolocartella',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name

    }
})

// const internalStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public')
//     },
//     filename: (req, file, cb) => {
//         const unique = `${Date.now()}-${crypto.randomUUID()}`
//         const fileExtension = file.originalname.split('.').pop()
//         cb(null, `${file.fieldname}-${unique}.${fileExtension}`)
//     }
// })

const PostModel = require('../moduls/post')


// const upload = multer({ storage: internalStorage })
const cloudUpload = multer({ storage: cloudStorage })

post.post('/posts/cloudUpload', cloudUpload.single('images'), async (req, res) => {

    console.log(req.file);
    try {
        res.status(200).json({ images: req.file.path });
    } catch (err) {
        res.status(400).send({
            err,
            statuscode: 400,
            message: "error interno del server"
        })
    }
});

// post.post('/posts/uploads', upload.single('images'), async (req, res) => {
//     const url = `${req.protocol}://${req.get('host')}`

//     console.log(req.file);

//     try {
//         const imgUrl = req.file.filename;
//         res.status(200).json({ images: `${url}/public/${imgUrl}` })

//     }
//     catch (err) {
//         res.status(400).send({
//             statuscode: 400,
//             message: "error interno del server"
//         })
//     }

// })





post.get('/posts', verifyToken, async (req, res) => {

    const {page=1, pagesize=6}= req.params;

    try {
        const post = await PostModel.find()
            .populate('author')
            .limit(pagesize)
            .skip((page-1)*pagesize)

            const totalPost = await PostModel.count();

        res.status(200).send({
            statuscode: 200,
            currentpage: Number(page),
            //ceil ci da i numeri interi
            totalPages: Math.ceil(totalPost / pagesize),
            totalPost,
            post
        })
    } catch (err) {
        res.status(400).send({
            statuscode: 400,
            message: "error interno del server"
        })
    }
})

post.post('/posts/create', validatePost, async (req, res) => {

    const newPost = new PostModel({
        category: req.body.category,
        title: req.body.title,
        images: req.body.images,
        author: req.body.author
    })


    try {
        const postNew = await newPost.save()
        res.status(200).json({
            statuscode: 200,
            message: "post saved successfully",
            payload: postNew
        })
    } catch (err) {
        res.status(400).send({
            statuscode: 400,
            message: "error interno del server",
            err
        })
    }


})

post.patch('/posts/update/:id', async (req, res) => {
    const { id } = req.params;
    const postExists = await PostModel.findById(id);

    if (!postExists) {
        return res.status(404)({
            statuscode: 404,
            message: "post not found"
        })
    }
    try {
        const postToUpdate = req.body;
        const options = {
            new: true
        }
        const result = await PostModel.findByIdAndUpdate(id, postToUpdate, options)

        res.status(200).send({
            statuscode: 200,
            message: "modified successfully",
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

post.delete('/posts/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const postToDelete = await PostModel.findByIdAndDelete(id);
        if (!postToDelete) {
            return res.status(404).send({
                statuscode: 404,
                message: 'post not found'
            });
        }

        res.status(200).send({
            statuscode: 200,
            message: "Delete post successfully"
        })
    } catch (err) {
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server",
            err
        })
    }
})

post.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const postExists = await PostModel.findById(id);

    if (!postExists) {
        return res.status(404).send({
            statuscode: 404,
            message: 'The post does not exist'
        })
    }

    try {
        res.status(200).send({
            statuscode: 200,
            post: postExists
        })
    } catch (err) {
        res.status(500).send({
            statuscode: 500,
            message: "errore interno del server",
            err
        })
    }
})

// post.get('/posts/bytitle', async (req, res) => {
//     const { title } = req.query;
//     try {
//         const postByTitle = await PostModel.find({
//             title: {
//                 $regex: title,
//                 $options: 'i'
//             }
//         })

//         res.status(200).send({ postByTitle });

//     } catch (err) {
//         res.status(500).send({
//             statuscode: 500,
//             message: "errore interno del server",
//             err
//         })
//     }
// })

module.exports = post;
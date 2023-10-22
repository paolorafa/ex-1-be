const validatePost = (req, res, next) => {

    const errors = [];

    const {category, title, images, value, author}=req.body;

    if (typeof category !== "string"){
        errors.push('category must be a string')
    }

    if (typeof title !== "string"){
        errors.push('title must be a string')
    }

    if (typeof images !== "string"){
        errors.push('images must be a string')
    }

    if (typeof author !== "string"){
        errors.push('author must be a string')
    }

    if (errors.length > 0) {
       
        return res.status(400).json({ errors });
    }

   
    next();


}

module.exports = validatePost
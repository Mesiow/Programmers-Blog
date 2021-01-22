const express = require("express");
const router = express.Router();

const path = require("path");
/*node.js middleware for handling uploading files*/
const multer = require("multer");

/*Models*/
const Blog = require("../models/Blog");

//Where to upload the file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); //which folder the uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); //save file as original file name
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 
    'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

//Middleware
const upload = multer({storage: storage, fileFilter: fileFilter});



//Get
/*Home Page*/
router.get("/", async (req, res) => {
    //Get blogs from Database
    const blogs = await Blog.find().sort({
        date: 'desc'}); //sort based on date
    res.render("index", {blogs: blogs});
});

//New blog Route
router.get("/new", (req, res) => {
    res.render("blogs/new", {blog: new Blog()});
});

//Show blog route based on it's id
router.get("/:slug", async (req, res) => {
    const blog = await Blog.findOne({slug: req.params.slug});
    if(blog == null)
        res.redirect('/');
    res.render("blogs/show", {blog: blog});
});


//Post
//Post new blog to main page
router.post("/", upload.any(), async (req, res, next) => {
    if(req.files && req.body){
        const newBlog = {
            title: req.body.title,
            desc: req.body.desc,
            filename: req.files[0].filename,
            markdown: req.body.markdown,
            date: Date.now()
        }

        //Save to database
        const blog = new Blog(newBlog);
        await blog.save((err) => {
            if(err){
                console.log(err);
                res.render("blogs/new", {blog: newBlog});
            }
        });
        res.redirect(`blogs/${blog.slug}`);
    }else{
        console.log("No File uploaded");
    }
});

module.exports = router;
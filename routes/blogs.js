const express = require("express");
const router = express.Router();

const path = require("path");
/*node.js middleware for handling uploading files*/
const multer = require("multer");

const upload = require("../upload.js");

/*Models*/
const Blog = require("../models/Blog");

const middleware = require("./middleware");




//Get
/*Home Page*/
router.get("/", async (req, res) => {
    //Get blogs from Database
    const blogs = await Blog.find().sort({
        date: 'desc'}); //sort based on date
    res.render("index", {blogs: blogs});
});

//New blog Route
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("blogs/new", {blog: new Blog()});
});


//Show blog route based on it's slug
router.get("/:slug", async (req, res) => {
    const blog = await Blog.findOne({slug: req.params.slug});
    if(blog == null) res.redirect('/');

    res.render("blogs/show", {blog: blog});
});


//Post
//Post new blog to main page
router.post("/", middleware.isLoggedIn, upload.any(), async (req, res, next) => {
    req.blog = new Blog();
    next();
}, saveBlogAndRedirect("new"));

//Edit blogs
router.get("/edit/:id", middleware.checkBlogOwnership, async (req, res) => {
    await Blog.findById(req.params.id, (err, blog) => {
        if(err){
            console.log(err);
            res.redirect("/");
        }
        res.render("blogs/edit", {blog: blog});
    });  
});


router.put("/:id", middleware.checkBlogOwnership, upload.single("filename"), async (req, res, next) => {
   req.blog = await Blog.findById(req.params.id);
   next();

}, saveBlogAndRedirect("edit"));


//Delete route
router.delete("/:id", middleware.checkBlogOwnership, async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
            res.redirect("/");
        }
        res.redirect("/");
    });
});

function saveBlogAndRedirect(path) {
    return async (req, res) => {
            let filename = "";
            let mimetype = "";
            if(req.files){
                filename = req.files[0].filename;
                mimetype = req.files[0].mimetype;
            }
            console.log(req.files);
        
           let author = {
               id: req.user.id,
               username: req.user.username
           };

            let blog = req.blog;
            blog.author = author;
            blog.title = req.body.title;
            blog.desc = req.body.desc;
            blog.filename = filename,
            blog.filenameCopy = req.body.filenameCopy;
            blog.markdown = req.body.markdown;

            //Save to database
            try{
                blog = await blog.save();
                res.redirect(`/blogs/${blog.slug}`);
            }catch(e){
                console.log(e);
                res.render(`/blogs/${path}`, {blog: blog});
            }
    }
}


module.exports = router;
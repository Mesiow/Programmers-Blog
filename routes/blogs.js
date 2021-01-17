const express = require("express");
const router = express.Router();

const path = require("path");

/*node.js middleware for handling uploading files*/
const multer = require("multer");

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
router.get("/", (req, res) => {
    const blogs = [{
        title: "Top 10 C++ Projects Ideas for C++ Beginners",
        desc: "Test",
        date: new Date()
    }];
    res.render("index", {blogs: blogs});
});

//New blog Route
router.get("/new", (req, res) => {
    res.render("blogs/new");
});


//Post
//Post new blog to main page
router.post("/", upload.any(), (req, res, next) => {
    if(req.files && req.body){
        const newBlog = {
            title: req.body.title,
            desc: req.body.desc,
            filename: req.files[0].filename,
            markdown: req.body.markdown,
        }
        //Upload to database
        res.redirect("/");
    }else{
        console.log("No File uploaded");
    }
});

module.exports = router;
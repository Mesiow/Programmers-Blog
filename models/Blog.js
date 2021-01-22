const mongoose = require("mongoose");
const slugify = require("slugify"); //used for adding name of blog in the url instead of its' id
const marked = require("marked"); //used for markdown

const blogSchema = new mongoose.Schema({
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String 
    },
    title: {
        type: String,
        required: true
    },
    desc: { 
        type: String
    },
    filename: {
        type: String,
        require: true
    },
    markdown: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

//Pre validate before saving article to db
blogSchema.pre('validate', function(next) {
    if(this.title){
        console.log("validate");
        this.slug = slugify(this.title, {lower: true, 
        strict: true});
    }
    next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
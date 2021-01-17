const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
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
    } 
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
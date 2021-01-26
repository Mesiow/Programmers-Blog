const mongoose = require("mongoose");
const slugify = require("slugify"); //used for adding name of blog in the url instead of its' id
const marked = require("marked"); //converts markdown to html
const createDomPurify = require("dompurify"); //for sanitizing html
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window); //allows us to purify html markup by using a jsdom window obj

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
        required: true
    },
    filenameCopy:{
        type: String,
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
    },
    sanitizedHtml:{
        type: String,
        required: true
    }
});

//Pre validate before saving article to db
blogSchema.pre('validate', function(next) {
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true});
    }
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
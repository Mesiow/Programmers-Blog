const Blog = require("../models/Blog");

var middleware = {};

middleware.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
        return next();

    res.redirect("/login");
}

middleware.checkBlogOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, (err, foundBlog) => {
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                //Check if we own the blog
                if(foundBlog.author.id.equals(req.user._id)){
                    return next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

module.exports = middleware;
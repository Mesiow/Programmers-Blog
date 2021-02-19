const Blog = require("../models/Blog");

var middleware = {};

middleware.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
        return next();

    res.redirect("/login");
}

module.exports = middleware;
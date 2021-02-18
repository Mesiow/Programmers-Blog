const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const envsetup = require("./env_setup");



mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const init = require("./passport_config");
init(passport);

//Routes
const blogRoutes = require("./routes/blogs");
const authRoutes = require("./routes/auth");

//setup view engine and public dir
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //path for styles
app.use(express.static(__dirname + "/client")); //path for scripts
app.use(express.static(__dirname + "/models"));
app.use(express.static(path.join(__dirname, '/uploads'))); //For file uploads
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user; //allows access to currentUser in every ejs template
    next();
})

//Routes
app.use("/blogs", blogRoutes);
app.use("/", authRoutes);


//Root
app.get("/", (req, res) => {
    res.redirect("/blogs");
});


const PORT = 5000;
app.listen(PORT, () => {console.log("Server Running");});
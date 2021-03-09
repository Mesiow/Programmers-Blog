const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");



const env = require("./env_setup");


//TODO: Be able to reference aws assets/images on heroku


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const uri = `mongodb+srv://Chris:${env.atlas_pass}@blogcluster.pqtbf.mongodb.net/blog?retryWrites=true&w=majority`
            || env.local_db_uri;


mongoose.connect(uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    if(uri == env.local_db_uri)
        console.log("Connected to local db");
    else{
        console.log("Connected to remote db");
    }
}).catch(err => {
    console.log("Error: ", err.message);
})

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
app.use(express.static(__dirname + "/uploads")); //For file uploads
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: env.session_id,
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("Server Running");});
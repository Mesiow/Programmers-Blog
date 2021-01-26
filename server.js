const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

//Routes
app.use("/blogs", blogRoutes);
app.use("/", authRoutes);


//Root
app.get("/", (req, res) => {
    res.redirect("/blogs");
});


const PORT = 5000;
app.listen(PORT, () => {console.log("Server Running");});
const express = require("express");
const app = express();

//setup view engine
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index");
});

const PORT = 5000;
app.listen(PORT, () => {console.log("Server Running");});
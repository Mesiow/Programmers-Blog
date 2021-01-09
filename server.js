const express = require("express");
const app = express();

//setup view engine and public dir
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
    res.render("index");
});

const PORT = 5000;
app.listen(PORT, () => {console.log("Server Running");});
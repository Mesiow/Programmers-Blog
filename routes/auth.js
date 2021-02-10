const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/User");


//Auth Routes
router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(result){
                console.log("login success");
                res.redirect("/");
            }else{
                console.log("login failed");
            }
        });
    }catch{
        res.redirect("/register");
    }
});


router.post("/register", async(req, res) => {
    try{
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
        await user.save();

        res.redirect("/login");
    }catch{
        res.redirect("/register");
    }
});


module.exports = router;
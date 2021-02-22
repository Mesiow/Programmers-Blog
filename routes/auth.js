const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");



//Auth Routes
router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


router.post("/register", async(req, res) => {
    handleNewRegistration(req, res);     
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

async function handleNewRegistration(req, res){
    //Check username
    const username = await User.findOne({username: req.body.username});
    const email = await User.findOne({email: req.body.email});
    if(username != null){
        req.flash("error", "A user with that username already exists");
        res.redirect("/register");
    }
    //Check email
    else if(email !== null){
        req.flash("error", "A user with that E-mail already exists");
        res.redirect("/register");
    }else{
        //Check if user confirmed pass
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        if(await bcrypt.compare(req.body.confirmpass, hashedPass)){
            try{
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
        }
        else{ 
            req.flash("error", "Passwords do not match");
            res.redirect("/register");
        } 
    }
}


module.exports = router;
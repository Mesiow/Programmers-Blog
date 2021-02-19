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

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})


module.exports = router;
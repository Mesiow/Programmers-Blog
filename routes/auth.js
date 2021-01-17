const express = require("express");
const router = express.Router();


//Auth Routes
router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.get("/register", (req, res) => {
    res.render("auth/register");
});


module.exports = router;
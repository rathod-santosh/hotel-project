const express = require("express");
const wrapAsyc = require("../utils/wrapAsyc");
const User = require("../models/user.js");
const passport = require("passport");
const router = express.Router();
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/users.js");


router
.route("/signup")
.get(userController.renderSignupForm )
.post( wrapAsyc(userController.signup));

router
.route("/login")
.get(userController.renderLoginForm )
.post(
    
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
        session: true
    }),
    userController.login
);







router.get("/logout",userController.logout );


module.exports = router;

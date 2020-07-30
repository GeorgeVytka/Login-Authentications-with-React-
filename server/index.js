const express = require("express");
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const keys = require("../config");
const chalk = require("chalk");
let user = {};


passport.serializeUser( (user, cb) => {
    cb(null, user);
});
passport.deserializeUser(  (user, cb) => {
    cb(null, user);
});

//A JavaScript Callback Function is a function that is passed as a parameter to another J
//JavaScript function,
// and the callback function is run inside of the function it was passed into

//Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackUrl: "/auth/facebook/callback"
},

(accesToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    /*
   Spread operator allows an iterable to expand in places where 0+ arguments are expected. It is
    mostly used in the variable array where there 
   is more than 1 values are expected.  
    */
    user = {...profile};
    return cb(null, profile);
}));


const app = express();
app.use(cors());
app.use(passport.initialize());

//uses the facebook strategy
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate(("facebook"), 
(req, res) =>{
    res.redirect("/profile");
}));


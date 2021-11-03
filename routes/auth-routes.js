const passport = require('passport');

const router = require('express').Router();
const mongoose = require('mongoose')
const keys = require('../config/keys')

mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log("connected to mongodb")
})

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'), (req,res)=>{
    res.redirect('/profile/')
})

module.exports = router;
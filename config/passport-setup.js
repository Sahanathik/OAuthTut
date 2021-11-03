const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model')

passport.serializeUser((user,done) =>{
    done(null,user.id);
})

passport.deserializeUser((id,done) =>{
    User.findById(id).then((user)=>{
        done(null,user); 
    })
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken,refreshToken,profile,done) => {
        // passport callback function
        console.log('passport Call back function is fired');
        console.log(profile);
        User.findOne({googleid:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log("User is" + currentUser)
                done(null,currentUser)
            }else{
                new User({
                    username : profile.displayName,
                    googleid : profile.id
                }).save().then((newUser) =>{
                    console.log("New user created" + newUser)
                    done(null,newUser)
                })

            }
        })
        
    })
);
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, cb) {
    cb(null, user);
})

passport.deserializeUser(function (user, cb) {
    cb(null, user);
});

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "http://localhost:3000/facebook/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser(function(user, cb){
    cb(null, user);
})

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http://localhost:3000/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));


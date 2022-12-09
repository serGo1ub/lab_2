const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
require('./passport-google-setup');
require('./passport-facebook-setup');
require('./passport-github-setup');

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))


app.use(bodyParser.json())

app.use(expressSession({
    secret: 'you secret key',
    saveUninitialized: true,
    resave: false,
}))

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


app.get('/', (req, res) => res.send('You are not logged in!'))
app.get('/failed', (req, res) => res.send('You Failed to log on!'))
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${
    req.user.displayName || req.user.username || 'Unknown'
}`))


// google auth
app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/failed'}),
    function (req, res) {
        res.redirect('/good');
    });

// facebook auth
app.get('/facebook',
    passport.authenticate('facebook')
);

app.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/good');
    });

// github auth
app.get('/github',
    passport.authenticate('github')
);

app.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/failed'}),
    function (req, res) {
        res.redirect('/good');
    });

// logout
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function () {
        res.redirect('/');
    });
})

app.listen(3000, () => console.log(`Example app listening on port ${3000}`))


const passport = require('koa-passport')
const util = require('util');
const LoginManager = require('./classes/LoginManager');

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
passport.use(new GoogleStrategy(
  {
    "clientID": '666643282620-93og63j8ljr7b2ufb2gcqkqdkp71f3q6.apps.googleusercontent.com',
    "clientSecret": 'WE_dsYEEN8axEfSK4U3REtpe',
    "callbackURL": 'http://127.0.0.1:1337/google_callback'
  },

  async function(accessToken, refreshToken, profile, done) {
    const user = await LoginManager.registerOrLogUserIn(profile,accessToken,refreshToken);
    return done(null, user);
  }
));


const passport = require('koa-passport')
const util = require('util');
const LoginManager = require('./classes/LoginManager');

const oauth_callback_url = process.env.OAUTH_CALLBACK_URL || 'http://127.0.0.1:3000/google_callback';

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
    "callbackURL": oauth_callback_url
  },

  async function(accessToken, refreshToken, profile, done) {
    const user = await LoginManager.registerOrLogUserIn(profile,accessToken,refreshToken);
    return done(null, user);
  }
));


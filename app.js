const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');
const team = require('./routes/team');
const events = require('./routes/events');
const middleware = require('./middleware');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const MySQLStore = require('koa-mysql-session');

const session_store_config = require('./config.js').session_store_config;

const mongoose = require('mongoose');
const mongodb_config = require('./config.js').mongodb_config
app.keys = ['your-session-secret'];
app.use(convert(session({store:new MySQLStore(session_store_config)})));

const mongo_connection = mongoose.connect(mongodb_config.db_url);

// authentication
require('./auth');
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

const util = require('util');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/views', {
  extension: 'hbs',
  map: { hbs: 'handlebars' }
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/team',team.routes(),team.allowedMethods());
router.use('/events',events.routes(),events.allowedMethods())

router.get('/auth/google',
  passport.authenticate('google',{scope:['openid email profile'],accessType: 'offline',approvalPrompt:'force'})
);

router.get('/google_callback',
  passport.authenticate('google', {
    successRedirect: '/account',
    failureRedirect: '/'
  })
);

//TODO:remove from here
const TeamManager = require('./classes/TeamManager');
const EventsManager = require('./classes/EventsManager');
const Utils = require('./classes/Utils');

router.get('/account',middleware.ensureAuthenticated ,async function (ctx, next) {
  // const events = await EventsManager.getAllEvents(Utils.getSessionParam(ctx,'teamid'));
  const team_members = await TeamManager.getAllTeamMembers(Utils.getSessionParam(ctx,'teamid'));
  await ctx.render('account', {
     team_members
  });
})

router.get('/logout', function(ctx) {
  ctx.logout()
  ctx.redirect('/')
});

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});

module.exports = app;
const router = require('koa-router')();
const middleware = require('../middleware');
const EventsManager = require('../classes/EventsManager');
const Utils = require('../classes/Utils');

router.get('/', middleware.ensureAuthenticated ,async function (ctx, next){
    ctx.body = await EventsManager.getAllEvents(Utils.getSessionParam(ctx,'teamid'));
    
});

router.post('/create_event',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.createEvent(Utils.getPostParams(ctx,'event_name'),Utils.getSessionParam(ctx,'teamid'));
});
module.exports = router;

const router = require('koa-router')();
const middleware = require('../middleware');
const TeamManager = require('../classes/TeamManager');
const RegistrationManager = require('../classes/RegistrationManager');
const Utils = require('../classes/Utils');

router.get('/', middleware.ensureAuthenticated ,async function (ctx, next){
    const team_members = await TeamManager.getAllTeamMembers(Utils.getSessionParam(ctx,'teamid'));
    ctx.body = team_members;
});

router.post('/invite_user',middleware.ensureAuthenticated, async function(ctx,next){
    console.log(Utils.getSessionParam(ctx,'teamid')+" "+Utils.getPostParams(ctx,'email'));
    ctx.body = await TeamManager.inviteUser(Utils.getSessionParam(ctx,'teamid'),Utils.getPostParams(ctx,'email'));  
});
module.exports = router;

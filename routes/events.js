const router = require('koa-router')();
const middleware = require('../middleware');
const EventsManager = require('../classes/EventsManager');
const Utils = require('../classes/Utils');

router.get('/', middleware.ensureAuthenticated ,async function (ctx, next){
    ctx.body = await EventsManager.getAllEvents(Utils.getSessionParam(ctx,'teamid'));
});

router.post('/create_event',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.createEvent(Utils.getPostParams(ctx, 'event_name'), Utils.getPostParams(ctx, 'ticket_types') ,
    Utils.getSessionParam(ctx, 'teamid'), Utils.getPostParams(ctx, 'event_start'), Utils.getPostParams(ctx, 'event_end'), 
    Utils.getPostParams(ctx, 'venue'));
});

router.get('/:id',middleware.ensureAuthenticated, async function (ctx,next){
    ctx.body = await EventsManager.getEventData(Utils.getUrlParams(ctx,'id'));
});

router.post('/add_ticket/:id', middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.createTickets(Utils.getPostParams(ctx, 'ticket_types'), Utils.getUrlParams(ctx, 'id'));
});

router.post('/create_task/:id',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.createTask(Utils.getPostParams(ctx,'task_name'),Utils.getUrlParams(ctx,'id'));
});

router.post('/assign_task/:task_id',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.assignTask(Utils.getUrlParams(ctx,'task_id'),Utils.getPostParams(ctx,'userid'));
});

router.post('/change_task_status/:task_id',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.changeTaskStatus(Utils.getUrlParams(ctx,'task_id'),Utils.getPostParams(ctx,'status'));
});

router.post('/create_form/:event_id',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.createEventForm(Utils.getUrlParams(ctx,'event_id'));
});

router.get('/event_form/:event_id', async function(ctx,next){
    const eventid = Utils.getUrlParams(ctx, 'event_id');
    // const event_form_elements_obj = await EventsManager.getEventFormElements(eventid);
    // const ticket_types = await EventsManager.getAllTickets(eventid);
    const registration_data =  await EventsManager.getRegistrationFormData(eventid);
    await ctx.render('event_form', registration_data);
});

router.post('/add_form_fields/:event_id', middleware.ensureAuthenticated, async function(ctx, next){
    ctx.body = await EventsManager.addRegistrationFormFields(Utils.getUrlParams(ctx, 'event_id'), Utils.getPostParams(ctx, 'form_fields'))
});

router.post('/get_form_elements/:event_id', middleware.ensureAuthenticated, async function(ctx, next){
    const res = await EventsManager.getEventFormElements(Utils.getUrlParams(ctx, 'event_id'));
    ctx.body = res;
});

router.post('/publish_event/:event_id', middleware.ensureAuthenticated, async function(ctx, next){
    ctx.body = await EventsManager.publishEvent(Utils.getUrlParams(ctx, 'event_id'));
});

router.post('/unpublish_event/:event_id', middleware.ensureAuthenticated, async function(ctx, next){
    ctx.body = await EventsManager.unpublishEvent(Utils.getUrlParams(ctx, 'event_id'));
});

router.post('/submit_form/:event_id', async function(ctx,next){
    console.log(ctx.request.body);
    const res = await EventsManager.registerNewAttendee(Utils.getUrlParams(ctx,'event_id'),Utils.getPostParams(ctx, 'form_fields'),
    Utils.getPostParams(ctx, 'ticketid'), Utils.getPostParams(ctx, 'quantity'));
    console.log(`result is ${res}`);
    ctx.body = res;
});

module.exports = router;

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
    ctx.body = await EventsManager.createTicket(Utils.getPostParams(ctx, 'ticket_name'), 
    Utils.getPostParams(ctx, 'maximum_available'), Utils.getPostParams(ctx, 'max_per_person'), Utils.getUrlParams(ctx, 'id'));
});

router.post('/create_task/:id',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.createTask(Utils.getPostParams(ctx,'task_name'),Utils.getUrlParams(ctx,'id'));
});

router.post('/assign_task/:task_id',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.assignTask(Utils.getUrlParams(ctx,'task_id'),Utils.getPostParams(ctx,'userid'));
});

router.post('/change_task_status/:task_id',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.changeTaskStatus(Utils.getUrlParams(ctx,'task_id'),Utils.getPostParams(ctx,'new_status'));
});

router.post('/create_form/:event_id',middleware.ensureAuthenticated, async function(ctx,next){
    ctx.body = await EventsManager.createEventForm(Utils.getUrlParams(ctx,'event_id'));
});

router.get('/event_form/:id', middleware.ensureAuthenticated, async function(ctx,next){
    const event_data = await EventsManager.getFormData(Utils.getUrlParams(ctx,'id'));
    console.log(event_data);
    await ctx.render('event_form',event_data[0]);
});

router.post('/add_form_fields/:event_id', middleware.ensureAuthenticated, async function(ctx, next){
    ctx.body = await EventsManager.addRegistrationFormFields(Utils.getUrlParams(ctx, 'event_id'), Utils.getPostParams(ctx, 'form_fields'))
});

router.post('/get_form_elements/:event_id', middleware.ensureAuthenticated, async function(ctx, next){
    const res = await EventsManager.getEventFormElements(Utils.getUrlParams(ctx, 'event_id'));
    ctx.body = res;
});

router.all('/submit_form', middleware.ensureAuthenticated, async function(ctx,next){
    const attendee_data = {
        email:Utils.getPostParams(ctx,'email'),
        firstname:Utils.getPostParams(ctx,'firstname'),
        lastname:Utils.getPostParams(ctx,'lastname'),
        eventid:1
    };
    ctx.body = await EventsManager.registerNewAttendee(attendee_data);
});

module.exports = router;

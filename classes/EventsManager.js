const Events = require('../models/Events');
const Tasks = require('../models/Tasks');
const Tickets = require('../models/Tickets');
const EventAttendees = require('../models/EventAttendees');
const Emailer = require('./Emailer');
const EventFormElements = require('../models/EventFormElements');
const EventFormElementOptions = require('../models/EventFormElementOptions');

const EventsManager = {
    getAllEvents: (teamid) => {
        return Events.getAllEvents(teamid);
    },

    createEvent: async function(name, ticket_types, teamid, event_start, event_end, venue, organizer_email){
		const eventid_array = await Events.createNew(name, teamid, event_start, event_end, venue);
        ticket_types.forEach((ticket_type) => {ticket_type.eventid = eventid_array[0]});
        const email_data = {
            from: "Akshay Singh <akshaysingh.8128@gmail.com>",
            to: "Akshay Hiver <akshay.hiver@gmail.com>",
            subject: "Event created successfully",
            text: "Pohcha kya"
        };
        Emailer.sendEmail(email_data);
        return this.createTickets(ticket_types);
	},

    getEventData: async function(eventid) {
        const tasks = await this.getAllTasks(eventid);
        const tickets = await this.getAllTickets(eventid);
        return {tasks, tickets};
    },

    createTickets: (ticket_data_array) => {
        return Tickets.createNew(ticket_data_array)
    },

    getAllTickets: (eventid) => {
        return Tickets.getAllTickets(eventid);
    },

    createTask: (name,eventid) => {
        return Tasks.createNew(name,eventid);
    },

    getAllTasks: (eventid) => {
        return Tasks.getAllTasks(eventid);
    },

    assignTask: (taskid,userid) => {
      return Tasks.assignTask(taskid,userid);
    },

    changeTaskStatus: (taskid,status) => {
        return Tasks.changeTaskStatus(taskid,status);
    },

    createEventForm: (eventid) => {
        return Events.createEventForm(eventid);
    },

    getFormData: async (eventid) => {
        const form_elements = EventFormElements.getFormElements(eventid);
        return Events.getFormData(eventid);
    },

    registerNewAttendee: async (eventid, form_fields, ticketid, quantity) => {
        const mandatory_fields = ['email', 'firstname', 'lastname'];
        let attendee_data = {ticketid, eventid, quantity}, extra_data = {};
        Object.keys(form_fields).forEach((field) => {
            if(mandatory_fields.indexOf(field) !== -1){
                attendee_data[field] = form_fields[field];
            }
            else{
                extra_data[field] = form_fields[field];
            }
        });
        attendee_data.extra_data = extra_data;
        console.log("saving data ",attendee_data);
        let attendee_status =  await new EventAttendees(attendee_data).save();
        let ticket_status = await Tickets.updateTicketCount(ticketid, quantity);
        return attendee_data && attendee_status;
    },

    addRegistrationFormFields: async (event_id, form_fields) => {
        const form_element_ids = [];
        await form_fields.forEach(async (field) => {
            let form_element_id = await EventFormElements.createNew({
                eventid: field.eventid,
                name: field.name,
                element_type:field.element_type
            });
            if(field.element_type !== "text" && field.options){
                field.options.forEach(async (option) => {
                    let element_option_id = await EventFormElementOptions.createNew({
                        form_elementid: form_element_id[0],
                        value: option.value
                    });
                });
            }
        });

        return {status:true};
    },

    getEventFormElements: async (event_id) => {
        const form_elements = await EventFormElements.getFormElements(event_id);
        const form_elements_with_options = [];
        for(let i=0;i<form_elements.length;i++){
            if(form_elements[i].element_type !== "text"){
                let options = await EventFormElementOptions.getFormElementOptions(form_elements[i].id);
                form_elements[i].options = []
                options.forEach((option) => {
                    form_elements[i].options.push(option.value);
                });
            }
        }
        return form_elements;
    },

    publishEvent: (event_id) => {
        return Events.publishEvent(event_id);
    },

    unpublishEvent: (event_id) => {
        return Events.unpublishEvent(event_id);
    },

    getRegistrationFormData: async function (event_id){
        const event_form_elements_obj = await this.getEventFormElements(event_id);
        const ticket_types = await this.getAllTickets(event_id);
        const event_name = await Events.getName(event_id);
        return {event_id, ticket_types, event_form_elements_obj, event_name:event_name[0]};
    }
    
}

module.exports = EventsManager;

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
        console.log("in createEvent ",event_start, event_end, venue);
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
        console.log("received taskid is ",taskid," status is ",status);
        return Tasks.changeTaskStatus(taskid,status);
    },

    createEventForm: (eventid) => {
        return Events.createEventForm(eventid);
    },

    getFormData: (eventid) => {
        return Events.getFormData(eventid);
    },

    registerNewAttendee: async (attendee_data) => {
        console.log("EventAttendees object is ",EventAttendees );
        return await new EventAttendees(attendee_data).save();
    },

    addRegistrationFormFields: async (event_id, form_fields) => {
        console.log(`params are ${event_id} and ${form_fields}`);

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
        // form_elements.forEach(async (form_element, index) => {
        //     let form_element_with_options = form_element
        //     if(form_element.element_type !== 'text'){
        //         form_element_with_options.options = await EventFormElementOptions.getFormElementOptions(form_element.id);
        //     }
        //     form_elements_with_options.push(form_element_with_options);
        //     console.log(`after pushing ${index}: ${JSON.stringify(form_elements_with_options,null,2)}`);
        //     return;
        // });
        // console.log("after pushing all");
        // return form_elements_with_options;
    },

    publishEvent: (event_id) => {
        return Events.publishEvent(event_id);
    },

    unpublishEvent: (event_id) => {
        return Events.unpublishEvent(event_id);
    }
    
}

module.exports = EventsManager;

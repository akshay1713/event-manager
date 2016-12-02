const Events = require('../models/Events');
const Tasks = require('../models/Tasks');
const Tickets = require('../models/Tickets');
const EventAttendees = require('../models/EventAttendees');

const EventsManager = {
    getAllEvents: (teamid) => {
        return Events.getAllEvents(teamid);
    },

    createEvent: async function(name, ticket_types, teamid, event_start, event_end, venue){
        console.log("in createEvent ",event_start, event_end, venue);
		const eventid_array = await Events.createNew(name, teamid, event_start, event_end, venue);
        ticket_types.forEach((ticket_type) => {ticket_type.eventid = eventid_array[0]});
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

    getFormData: (eventid) => {
        return Events.getFormData(eventid);
    },

    registerNewAttendee: (attendee_data) => {
        return EventAttendees.createNew(attendee_data);
    }
    
}

module.exports = EventsManager;
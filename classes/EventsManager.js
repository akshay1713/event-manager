const Events = require('../models/Events');
const Tasks = require('../models/Tasks');
const Tickets = require('../models/Tickets');
const EventAttendees = require('../models/EventAttendees');

const EventsManager = {
    getAllEvents: (teamid) => {
        return Events.getAllEvents(teamid);
    },

    createEvent: (name,teamid) => {
		return Events.createNew(name,teamid);
	},

    getEventData: async function(eventid) {
        const tasks = await this.getAllTasks(eventid);
        const tickets = await this.getAllTickets(eventid);
        return {tasks, tickets};
    },

    createTicket: (name, maximum_available, max_per_person, eventid) => {
        return Tickets.createNew(name,  maximum_available, max_per_person, eventid)
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
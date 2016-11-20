const Events = require('../models/Events');
const Tasks = require('../models/Tasks');
const EventAttendees = require('../models/EventAttendees');

const EventsManager = {
    getAllEvents: async (teamid) => {
        return await Events.getAllEvents(teamid);
    },

    createEvent: async (name,teamid) => {
		return  await Events.createNew(name,teamid);
	},

    createTask: async (name,eventid) => {
        return await Tasks.createNew(name,eventid);

    },

    getAllTasks: async (eventid) => {
        return Tasks.getAllTasks(eventid);
    },

    assignTask: async (taskid,userid) => {
      return Tasks.assignTask(taskid,userid);
    },

    changeTaskStatus: async (taskid,status) => {
        return Tasks.changeTaskStatus(taskid,status);
    },

    createEventForm: async (eventid) => {
        return Events.createEventForm(eventid);
    },

    getFormData: async (eventid) => {
        return Events.getFormData(eventid);
    },

    registerNewAttendee: async (attendee_data) => {
        return EventAttendees.createNew(attendee_data);
    }
    
}

module.exports = EventsManager;
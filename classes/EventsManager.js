const Events = require('../models/Events');

const EventsManager = {
    getAllEvents: async (teamid) => {
        return await Events.getAllEvents(teamid);
    },

    createEvent: async (name,teamid) => {
		const res =  await Events.createNew(name,teamid);
        console.log(res);
        return res;
	}
}

module.exports = EventsManager;
const knex = require('./BaseModel').knex;
const table = 'Events';

const Events = {
	createNew: (name, teamid, event_start, event_end, venue) => {
        console.log("in events create",event_start, event_end, venue);
		return knex(table)
		.returning('id')
		.insert({name, teamid, event_start, event_end, venue});
	},

    getAllEvents: (teamid) => {
        return knex(table)
        .select('id','name','form_created')
        .where({teamid});
    },

    createEventForm: (eventid) => {
        return knex(table)
        .where({'id':eventid})
        .update({'form_created':true});
    },

    getFormData:(eventid) => {
        return knex(table)
        .select('name','id')
        .where({'id':eventid})
    }
};

module.exports = Events;
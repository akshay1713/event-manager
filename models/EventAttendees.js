const knex = require('./BaseModel').knex;
const table = 'EventAttendees';

const EventAttendees = {
	createNew: (attendee_data) => {
		return knex(table)
		.insert(attendee_data);
	},

    getAllEventAttendees: (eventid) => {
        return knex(table)
        .select('id','email','firstname','lastname')
        .where({eventid});
    }

};

module.exports = EventAttendees;
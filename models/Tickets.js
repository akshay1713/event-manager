const knex = require('./BaseModel').knex;
const table = 'Tickets';

const Tickets = {
	createNew: (name, maximum_available, max_per_person, eventid) => {
        console.log(name, eventid);
		return knex(table)
		.returning('id','name')
		.insert({name, maximum_available, max_per_person, eventid});
	},

    getAllTickets: (eventid) => {
        return knex(table)
        .select('id', 'name', 'booked', 'maximum_available', 'max_per_person')
        .where({eventid});
    }
};

module.exports = Tickets;
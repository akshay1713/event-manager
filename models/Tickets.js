const knex = require('./BaseModel').knex;
const table = 'Tickets';

const Tickets = {
	createNew: (ticket_data_array) => {
		return knex(table)
		.returning('id','name')
		.insert(ticket_data_array);
	},

    getAllTickets: (eventid) => {
        return knex(table)
        .select('id', 'name', 'booked', 'maximum_available', 'max_per_person')
        .where({eventid});
    }
};

module.exports = Tickets;
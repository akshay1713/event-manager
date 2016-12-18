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
    },

    updateTicketCount: (ticketid, count) => {
        //TODO: remove raw query
        return knex.raw(`UPDATE Tickets SET booked = booked + ${count} WHERE id = ${ticketid}`);
    }
};

module.exports = Tickets;
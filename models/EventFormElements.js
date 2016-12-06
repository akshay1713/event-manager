const knex = require('./BaseModel').knex;
const table = 'EventFormElements';

const EventFormElements = {
	createNew: (form_data) => {
		return knex(table)
		.returning('id')
		.insert(form_data);
	},

	getFormElements: (eventid) => {
		return knex(table)
		.select('id', 'name', 'element_type')
		.where({eventid})
	}
};

module.exports = EventFormElements;
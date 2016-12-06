const knex = require('./BaseModel').knex;
const table = 'EventFormElementOptions';

const EventFormElementOptions = {
	createNew: (option_data) => {
		return knex(table)
		.returning('id')
		.insert(option_data);
	},

    getFormElementOptions: (form_elementid) => {
        return knex(table)
        .select('value', 'form_elementid')
        .where({form_elementid});
    }
};

module.exports = EventFormElementOptions;
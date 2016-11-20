const knex = require('./BaseModel').knex;
const table = 'Events';

const Events = {
	createNew: (name,teamid) => {
        console.log(name,teamid);
		return knex(table)
		.returning('id','name')
		.insert({name,teamid});
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
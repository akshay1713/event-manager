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
        .select('id','name')
        .where({teamid});
    }
};

module.exports = Events;
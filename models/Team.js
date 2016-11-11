const knex = require('./BaseModel').knex;
const table = 'Team';

const Team = {
	createNew: (firstname) => {
		return knex(table)
		.returning('id')
		.insert({
			name: firstname + '\'s team'
		});
	}
};

module.exports = Team;
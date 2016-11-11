const knex = require('./BaseModel').knex;
const table = 'TeamAdmins';

const TeamAdmins = {
	createNew: (userid,teamid) => {
		return knex(table)
		.returning('id')
		.insert({
			teamid: teamid,
			userid: userid
		});
	}
};

module.exports = TeamAdmins;
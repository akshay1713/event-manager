const knex = require('./BaseModel').knex;
const table = 'TeamInvitations';

const TeamInvitations = {

	deleteInvitation: (userid) => {
		return knex(table)
		.where('userid',userid)
		.del();
	},

	createNew: (userid,teamid) => {
		return knex(table)
		.returning('id')
		.insert({teamid,userid});
	}
};

module.exports = TeamInvitations;
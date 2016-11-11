const knex = require('./BaseModel').knex;
const table = 'TeamMembers';

const TeamMembers = {
	createNew: (userid,teamid,is_active,is_admin) => {
		return knex(table)
		.returning('id')
		.insert({
			teamid: teamid,
			userid: userid,
			is_active:is_active,
			is_admin:is_admin
		});
	},

	findTeamForUser: (userid) => {
		return knex.select('teamid').where('userid',userid).from(table).limit(1);
	},

	activateInvitedUser: (userid) => {
		return knex(table)
		.where('userid',userid)
		.update({
			'is_active': true
		});
	},

	getAllTeamMembers: (teamid) => {
		return knex(table)
		.join('User','User.id','TeamMembers.userid')
		.select('User.firstname','User.lastname','User.status','User.email');
	}
};

module.exports = TeamMembers;
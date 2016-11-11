const Team = require('../models/Team');
const TeamMembers = require('../models/TeamMembers');
const User = require('../models/User');
const TeamInvitations = require('../models/TeamInvitations');

const TeamManager = {
    getAllTeamMembers: async (teamid) => {
        return await TeamMembers.getAllTeamMembers(teamid);
    },

    inviteUser: async (teamid,email) => {
		console.log(teamid,email);
		const userid = await User.createNew({},email,null,'invited');
		console.log(userid);
		const team_invitation = await TeamInvitations.createNew(userid,teamid);
		const team_member = await TeamMembers.createNew(userid,teamid,false,false);

		return (team_member) ? {status:true} : {status:false}; 
	}
}

module.exports = TeamManager;
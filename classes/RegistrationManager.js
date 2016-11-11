const User = require('../models/User');
const Team = require('../models/Team');
const TeamMembers = require('../models/TeamMembers');
const TeamAdmins = require('../models/TeamAdmins');
const AuthTokens = require('../models/AuthTokens');
const TeamInvitations = require('../models/TeamInvitations');
const Utils = require('./Utils');


const RegistrationManager = {
	registerNewUser: async (name,email,google_id,access_token,refresh_token) => {
		console.log("registering")
		const userid = await User.createNew(name,email,google_id);
		const teamid = await Team.createNew(name.givenName);
		const team_member = await TeamMembers.createNew(userid,teamid,true,true);
		const auth_tokens = await AuthTokens.createNew(userid,access_token,refresh_token);
		return userid;
	},

	registerInvitedUser: async (name,userid,access_token,refresh_token) => {
		console.log('in registerInvitedUser ',JSON.stringify(name,null,2),userid,access_token,refresh_token);
		let status;
		status = await User.updateInvitedUserDetails(userid,name);
		status = await TeamMembers.activateInvitedUser(userid);
		status = await TeamInvitations.deleteInvitation(userid);
		status = await AuthTokens.createNew(userid,access_token,refresh_token);

		return await User.findById(userid);
	}
};

module.exports = RegistrationManager;
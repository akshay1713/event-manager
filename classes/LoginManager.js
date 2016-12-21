const RegistrationManager = require('./RegistrationManager');
const User = require('../models/User');
const TeamMembers = require('../models/TeamMembers');

const LoginManager = {
	registerOrLogUserIn: async (user_profile,access_token,refresh_token) => {
		let existing_user = await User.findByEmail(user_profile.emails[0].value);
		console.log(existing_user);
		if(existing_user.length === 0){
			const new_userid = await RegistrationManager.registerNewUser(user_profile.name,user_profile.emails[0].value,user_profile.id,access_token,refresh_token);
			existing_user = await User.findById(new_userid[0]);
			console.log("es",existing_user,"user",new_userid);
		}
		else if(existing_user[0].status === 'invited'){
			console.log('registering invited user');
			existing_user[0] = await RegistrationManager.registerInvitedUser(user_profile.name,existing_user[0].id,access_token,refresh_token);
		}
		const team_info = await TeamMembers.findTeamForUser(existing_user[0].id);
		existing_user[0].teamid = team_info[0].teamid;
		return existing_user[0];
	}
};

module.exports = LoginManager;
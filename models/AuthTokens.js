const knex = require('./BaseModel').knex;
const table = 'AuthTokens';

const AuthTokens = {
	createNew: (userid,access_token,refresh_token) => {
		return knex(table)
		.returning('id')
		.insert({
			userid: userid,
			access_token:access_token,
			refresh_token:refresh_token
		});
	}
};

module.exports = AuthTokens;
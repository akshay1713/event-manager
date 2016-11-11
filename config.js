const config = {
	db: {
		username: 'root',
		password: 'root',
		name: 'knex_test',
		host: '127.0.0.1'
	},
	oauth: {
		clientID: '666643282620-93og63j8ljr7b2ufb2gcqkqdkp71f3q6.apps.googleusercontent.com',
	    clientSecret: 'WE_dsYEEN8axEfSK4U3REtpe',
	    callbackURL: 'http://127.0.0.1:1337/google_callback'
	}
};

module.exports = config;
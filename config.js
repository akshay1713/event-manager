const db_username = process.env.DB_USER_NAME || 'root';
const db_password = process.env.DB_PASSWORD || 'ksh';
const db_name = process.env.DB_NAME || 'kex_test';
const db_host = process.env.DB_HOST || 'us-cdbr-iron-east-04.cleardb.net';
const db_port = process.env.DB_PORT || 3307;

const config = {
	db: {
		username: db_username,
		password: db_password,
		name: db_name,
		host: db_host,
		port: db_port
	},
	oauth: {
		clientID: '666643282620-93og63j8ljr7b2ufb2gcqkqdkp71f3q6.apps.googleusercontent.com',
	    clientSecret: 'WE_dsYEEN8axEfSK4U3REtpe',
	    callbackURL: 'http://127.0.0.1:1337/google_callback'
	}
};

module.exports = config;
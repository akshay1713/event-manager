const db_username = process.env.DB_USER_NAME || 'root';
const db_password = process.env.DB_PASSWORD || 'kri';
const db_name = process.env.DB_NAME || 'knex_test';
const db_host = process.env.DB_HOST || '127.0.0.1';
const db_port = process.env.DB_PORT || 3307;

const session_store_host = process.env.SESSION_STORE_HOST || '127.0.0.1';
const session_store_user = process.env.SESSION_STORE_USER || 'root';
const session_store_db = process.env.SESSION_STORE_DB || 'sessions';
const session_store_password = process.env.SESSION_STORE_PASSWORD || 'kri';
const session_store_port = process.env.SESSION_STORE_PORT || 3307
const mongodb_uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/event_attendees'

const emailer_sender = process.env.em_sender;
const emailer_password = process.env.em_password;

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
	},

	session_store_config: {
		host:session_store_host, database:session_store_db, user:session_store_user, password:session_store_password, port:session_store_port
	},

	mongodb_config: {
		db_url: mongodb_uri
	},

	emailer:{
		sender:emailer_sender,
		password:emailer_password
	}
};

module.exports = config;
const config = require('../config');

const BaseModel = {
	knex : require('knex')({
  	client: 'mysql',
		connection: {
			host: config.db.host,
			user: config.db.username,
			password: config.db.password,
			database: config.db.name,
			port:config.db.port,
			charset: 'utf8'
		}
	}),

	createNewRecord: function(table,data,returning){
		data.created_at = Date.now();
		data.updated_at = Date.now();
		return this.knex(table)
		.returning(returning)
		.insert(data);
	},

	findExistingRecord: function(table,data){
		return this.knex.select().from(table).where(data);
	}
};

module.exports=BaseModel
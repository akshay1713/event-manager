const config = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

	mongoose:{
		createModel: (model_schema, model_name) => {
			const modelSchema = new Schema(model_schema);
			// autoIncrement.initialize(mongoose.connection);
			// modelSchema.plugin(autoIncrement.plugin(model_name));
			const new_model = mongoose.model(model_name, modelSchema);
			return new_model;
		}
	}
};

module.exports=BaseModel
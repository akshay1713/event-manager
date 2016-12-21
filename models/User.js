const BaseModel = require('./BaseModel');
const knex = BaseModel.knex;
const table = 'User';

const User = {
	findById : (id) => {
		 return knex.select().where('id',id).from(table);
	},

	createNew: (name={}, email, google_id=null,status='joined') => {	
		return knex(table)
		.returning('id')
		.insert({
			firstname:name.givenName,
			lastname:name.familyName,
			email:email,
			status:status,
			google_id:google_id
		});
		//return await BaseModel.createNewRecord(table,user_data,null);
	},

	findByEmail: (email,next) => {
		return knex.select().where('email',email).from(table);
	},

	updateInvitedUserDetails: async (userid,name) => {
		return await knex(table)
		.where({id:userid})
		.update({
			firstname:name.givenName,
			lastname:name.familyName
		});

	}
};

module.exports = User;
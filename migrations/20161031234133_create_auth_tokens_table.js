
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('AuthTokens',function(table){
			table.bigIncrements('id').primary();
			table.bigInteger('userid').unsigned().notNullable();
			table.string('access_token');
			table.string('refresh_token');
			table.foreign('userid').references('User.id').onDelete('cascade');
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([
 		knex.schema.dropTable('AuthTokens')
 	]);
};

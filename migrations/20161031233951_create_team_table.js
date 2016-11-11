
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('Team',function(table){
			table.bigIncrements('id').primary();
			table.string('name').notNullable();
			table.boolean('isactive').defaultTo(true).notNullable();
          	table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('Team')
	]); 
};

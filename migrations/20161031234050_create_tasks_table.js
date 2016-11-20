
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('Tasks',function(table){
			table.bigIncrements('id').primary();
			table.string('name').notNullable();
			table.bigInteger('userid').nullable().unsigned();
			table.bigInteger('eventid').notNullable().unsigned();
			table.string('status').notNullable().defaultTo('pending');
          	table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
			table.foreign('userid').references('User.id').onDelete('cascade');
			table.foreign('eventid').references('Events.id').onDelete('cascade');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('Tasks')
	]);
};

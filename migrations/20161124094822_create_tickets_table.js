exports.up = function(knex, Promise) {
 	return Promise.all([
 		knex.schema.createTable('Tickets',function(table){
 			table.bigIncrements('id').primary();
            table.string('name').notNullable();
 			table.bigInteger('eventid').notNullable().unsigned();
            table.integer('maximum_available').notNullable();
            table.integer('booked').notNullable().defaultTo(0);
			table.integer('max_per_person').notNullable();
          	table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()')); 			
			table.foreign('eventid').references('Events.id').onDelete('cascade');
 		})
 	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([
 		knex.schema.dropTable('Tickets')
 	]);
};

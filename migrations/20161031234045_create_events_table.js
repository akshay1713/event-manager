
exports.up = function(knex, Promise) {
 	return Promise.all([
 		knex.schema.createTable('Events',function(table){
 			table.bigIncrements('id').primary();
 			table.bigInteger('teamid').notNullable().unsigned();
 			table.string('name').notNullable();
          	table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()')); 			
			table.foreign('teamid').references('Team.id').onDelete('cascade');
 		})
 	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([
 		knex.schema.dropTable('Events')
 	]);
};

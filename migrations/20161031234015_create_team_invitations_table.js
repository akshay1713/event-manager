
exports.up = function(knex, Promise) {
 	return Promise.all([
 		knex.schema.createTable('TeamInvitations',function(table){
 			table.bigIncrements('id').primary();
 			table.bigInteger('teamid').notNullable().unsigned();
 			table.bigInteger('userid').notNullable().unsigned();
          	table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
 			table.foreign('teamid').references('Team.id').onDelete('cascade');
 			table.foreign('userid').references('User.id').onDelete('cascade');
 		})
 	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([
 		knex.schema.dropTable('TeamInvitations')
 	]);
};


exports.up = function(knex, Promise) {  
    return Promise.all([
        knex.schema.createTable('User', function(table){
        	table.bigIncrements('id').primary();
          	table.string('firstname').nullable();
          	table.string('lastname').nullable();
          	table.string('email').unique().notNullable();
          	table.string('status');
            table.string('google_id').unique().nullable();
          	table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('User')
    ]);
};

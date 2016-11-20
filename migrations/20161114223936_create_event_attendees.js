
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('EventAttendees',function(table){
            table.bigIncrements('id').primary();
            table.bigInteger('eventid').notNullable().unsigned();
            table.string('email').notNullable().unique();
            table.string('firstname').nullable();
            table.string('lastname').nullable();
            table.string('phone_number').nullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
            table.foreign('eventid').references('Events.id').onDelete('cascade');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('EventAttendees')
    ]);
};

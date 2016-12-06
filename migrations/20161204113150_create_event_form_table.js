
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('EventFormElements', (table) => {
            table.bigIncrements('id').primary();
            table.bigInteger('eventid').unsigned().notNullable();
            table.string('name').notNullable();
            table.string('element_type').nullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
            table.foreign('eventid').references('Events.id').onDelete('cascade');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('EventFormElements')
    ]);
};

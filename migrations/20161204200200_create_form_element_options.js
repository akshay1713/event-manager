exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('EventFormElementOptions', (table) => {
            table.bigIncrements('id').primary();
            table.bigInteger('form_elementid').unsigned();
            table.string('value').notNullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
            table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
            table.foreign('form_elementid').references('EventFormElements.id').onDelete('cascade');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('EventFormElementOptions')
    ]);
};

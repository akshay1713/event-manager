
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Tickets', (table) => {
            table.boolean('collect_attendee_details').notNullable().defaultTo(false);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Tickets', (table) => {
            table.dropColumn('collect_attendee_details');
        })
    ]);
};

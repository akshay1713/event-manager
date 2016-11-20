
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', function (table) {
            table.boolean('form_created').notNullable().defaultTo(false);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', function (table) {
            table.dropColumn('form_created');
        })
    ]);
};

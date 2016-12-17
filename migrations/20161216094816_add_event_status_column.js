exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', function(table){
            table.string('status').notNullable().defaultTo('unpublished');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', function(table){
            table.dropColumn('status');
        })
    ]);
};

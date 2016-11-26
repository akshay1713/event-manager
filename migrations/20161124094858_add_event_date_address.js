
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', function (table) {
            table.text('venue').nullable();
            table.timestamp('event_date').nullable();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', function (table) {
            table.dropColumn('venue');
            table.dropColumn('event_date');
        })
    ]);  
};

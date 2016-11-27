
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', function (table) {
            table.datetime('event_start').nullable();
            table.datetime('event_end').nullable();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', function (table) {
            table.dropColumn('event_start');
            table.dropColumn('event_end');
        })
    ]);  
};

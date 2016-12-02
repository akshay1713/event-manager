
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('Events', (table) => {
            table.dropColumn('event_date');
        })
    ]);
};

exports.down = function(knex, Promise) {
  
};

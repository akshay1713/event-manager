
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('EventAttendees', function (table) {
            table.bigInteger('ticketid').unsigned().notNullable().after('eventid');
            table.integer('quantity').notNullable().after('phone_number');
            table.foreign('ticketid').references('Tickets.id').onDelete('cascade');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('EventAttendees', function (table) {
            table.dropColumn('ticketid');
            table.dropColumn('quantity');
        })
    ]);  
};

exports.up = function(knex, Promise) {
    return knex.schema.table('Tasks', function(table){
        table.bigInteger('last_userid').notNullable().unsigned();
        table.text('description').nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('Tasks', function(table){
        table.dropColumn('last_userid');
        table.dropColumn('description');
    });
};

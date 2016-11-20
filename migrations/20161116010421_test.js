
exports.up = function(knex, Promise) {
    return Promise.all([
  knex.schema.createTable('Tests',function(table){
 			table.bigIncrements('id').primary();
 		})
    ]);
};

exports.down = function(knex, Promise) {
  
};

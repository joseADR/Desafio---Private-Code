exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.string("user_id").primary();
    table.string("userName").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
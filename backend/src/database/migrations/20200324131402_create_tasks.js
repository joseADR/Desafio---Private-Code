exports.up = function(knex) {
  return knex.schema.createTable("tasks", function(table) {
    table.increments();

    table.string("title").notNullable();
    table.string("description").notNullable();

    table.string("user_id").notNullable();

    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tasks");
};
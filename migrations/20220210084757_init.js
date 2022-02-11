
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('student', table => {
      table.increments('id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('book', table => {
      table.increments('id');
      table.string('book_name').notNullable();
      table.string('author').notNullable();
      table.string('borrowed_by_student').notNullable();
      table.date('date_of_borrow').notNullable();
      table.date('expected_date_return').notNullable();
      table.timestamps(true, true);
    })
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('student')
    .dropTable('book');
};

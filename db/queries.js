const knex = require('./knex');

module.exports = {
  getAllstudent() {
    return knex('student');
  },
  getOnestudent(id) {
    return knex('student').where('id', id).first();
  },
  createstudent(student) {
    return knex('student').insert(student, '*');
  },
  updatestudent(id, student) {
    return knex('student').where('id', id).update(student, '*');
  },
  deletestudent(id) {
    return knex('student').where('id', id).del();
  },
  countstudent() {
    return knex('student').count('id');
  },
  getAllbook() {
    return knex('book');
  },
  getOnebook(id) {
    return knex('book').where('id', id).first();
  },
  createbook(book) {
    return knex('book').insert(book, '*');
  },
  updatebook(id, book) {
    return knex('book').where('id', id).update(book, '*');
  },
  deletebook(id) {
    return knex('book').where('id', id).del();
  },
  countbook() {
    return knex('book').count('id');
  }
}

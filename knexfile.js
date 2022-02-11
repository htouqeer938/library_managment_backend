// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'library_managment',
      user: 'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-library_managment'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

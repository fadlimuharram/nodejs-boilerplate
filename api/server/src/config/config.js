require("dotenv").config();

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: "books",
    username: "root",
    password: "root",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    port: "8889",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },

  test: {
    database: "books_test",
    username: "root",
    password: "root",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    port: "8889",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};

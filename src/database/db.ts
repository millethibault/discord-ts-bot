import mysql from 'mysql2/promise';
require('dotenv').config();
const database = process.env.DATABASE_NAME;
const password = process.env.DATABASE_PASSWORD;

export default mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: database,
  password: password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
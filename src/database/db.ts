import mysql from 'mysql2/promise';
require('dotenv').config();
const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);;
const user = process.env.DATABASE_USER;
const database = process.env.DATABASE_NAME;
const password = process.env.DATABASE_PASSWORD;

export default mysql.createPool({
  host: host,
  port: port,
  user: user,
  database: database,
  password: password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
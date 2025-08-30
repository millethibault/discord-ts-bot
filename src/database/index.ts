import mysql from 'mysql2/promise';
import { DATABASE_NAME, DATABASE_PASSWORD} from '../config/env'

const connectionPromise = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME
});

export default connectionPromise;

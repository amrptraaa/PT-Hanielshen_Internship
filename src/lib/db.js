import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'aaronkho02',
  database: 'hanielsen',
});

export default pool;

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  // host: "localhost",
  // user: 'tahg8361_bgtahumagelang',
  // password: 'bgtahumagelang17',
  // database: 'tahg8361_bgtahumagelang',
  host: "localhost",
  user: 'root',
  password: '',
  database: 'bgtahumagelang',
});

export default pool;

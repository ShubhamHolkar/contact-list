import asyncHandler from "express-async-handler";

import pg from "pg";
const { Pool } = pg;
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;
const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

const client = await pool.connect();
export default {
  query: (text, params) => client.query(text, params),
};

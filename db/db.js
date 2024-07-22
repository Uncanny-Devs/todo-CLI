import pkg from "pg";
const { Pool } = pkg;
import { config } from "dotenv";
config();

const pool = new Pool({
	user: process.env.DB_USER, // your PostgreSQL username
	host: process.env.DB_HOST, // your PostgreSQL server host
	database: process.env.DB, // your PostgreSQL database name
	password: process.env.DB_PASSWORD, // your PostgreSQL password
	port: process.env.DB_PORT, // default PostgreSQL port
});


export default pool;

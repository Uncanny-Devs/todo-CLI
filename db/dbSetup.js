import pool from "./db.js";
import { config } from "dotenv";
config();

const createDB = async () => {
	const dbName = process.env.DB;
	try {
		// Check if the database already exists
		const checkDbExistQuery = `
		SELECT 1 FROM pg_database WHERE datname = $1;
	  `;
		const res = await serverPool.query(checkDbExistQuery, [dbName]);

		if (res.rowCount === 0) {
			// Database does not exist, create it
			await serverPool.query(`CREATE DATABASE ${dbName}`);
			console.log(`Database ${dbName} created successfully.`);
		} else {
			console.log(`Database ${dbName} already exists.`);
		}
	} catch (error) {
		console.error("Error creating database:", error);
	} finally {
		await serverPool.end();
	}
};

// Create DB if not present already
createDB();

const setupDatabase = async () => {
	try {
		// Create the table if it doesn't exist
		await pool.query(`
        CREATE TABLE IF NOT EXISTS todos (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
		  status VARCHAR(10) NOT NULL CHECK (status IN ('DONE', 'ACTIVE')),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP
        );
      `);

		// Check if a specific column exists, if not, add it (example for schema update)
		const res = await pool.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name='todos' AND column_name='created_at';
      `);

		if (res.rows.length === 0) {
			// Column 'created_at' does not exist, so we alter the table to add it
			await pool.query(`
          ALTER TABLE todos
          ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
        `);
		}

		console.log("Database setup complete.");
	} catch (err) {
		console.error("Error setting up database:", err);
	} finally {
		await pool.end();
	}
};

setupDatabase();

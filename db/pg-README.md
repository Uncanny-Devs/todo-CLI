# How to use Node-Postgress : `pg`

## Install the pg package:

```bash
npm install pg
```
## Set up the connection to the PostgreSQL database:

### Create a file named db.js to handle the connection:

```js
// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your-username',    // your PostgreSQL username
  host: 'localhost',        // your PostgreSQL server host
  database: 'your-database', // your PostgreSQL database name
  password: 'your-password', // your PostgreSQL password
  port: 5432,               // default PostgreSQL port
});

module.exports = pool;
```
## Create a file for your CRUD operations:

### Create a file named crud.js to handle your CRUD operations:

```js
Copy code
// crud.js
const pool = require('./db');

// Create a new record
const createTodo = async (title, description) => {
  try {
    const res = await pool.query(
      'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    console.log('Todo created:', res.rows[0]);
  } catch (err) {
    console.error('Error creating todo:', err);
  }
};
```
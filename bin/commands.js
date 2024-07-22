import pool from "../db/db.js";

export async function createTodo(title, description) {
	if (!title) {
		console.error("ERROR creating TODO, Title Not provided");
		return;
	}

	try {
		const queryText = `
        INSERT INTO todos (title, description, status)
        VALUES ($1, $2, 'ACTIVE')
        RETURNING *;
      `;
		const values = [title, description || null];
		const res = await pool.query(queryText, values);
		console.log("Successfully Created TODO :", res.rows[0]);
	} catch (error) {
		console.error("Failed to create TODO, INTERNAL SERVER ERROR:", error);
	} finally {
		process.exit(0);
	}
}

export async function getTodos() {
	try {
		const res = await pool.query(`
                SELECT id, status, title, description
                FROM todos
                ORDER BY id;
              `);
		console.log(res.rows);
	} catch (error) {
		console.error("Failed to get your TODOS");
	} finally {
		process.exit(0);
	}
}

export async function getTodoById(id) {
    if(!id){
        console.log("ID NOT PROVIDED");
        return;
    }
	try {
		const res = await pool.query(`
                SELECT id, status, title, description
                FROM todos
                WHERE id = $1;
              `, [id]);
		console.log(res.rows);
        return res.rows;
	} catch (error) {
		console.error("Failed to get your TODOS");
	}
}

export async function updateTodo(id, title, description, status) {
	if (!id) {
		console.error("ERROR updating TODO, ID Not provided");
		return;
	}

	// Prepare an array to hold query fragments and values
	const updates = [];
	const values = [];
	let valueCounter = 1;

	if (title) {
		updates.push(`title = $${valueCounter++}`);
		values.push(title);
	}

	if (description !== undefined) {
		updates.push(`description = $${valueCounter++}`);
		values.push(description);
	}

	if (status) {
		if (status !== "DONE" && status !== "ACTIVE") {
			console.error("ERROR updating TODO, Invalid status value");
			return;
		}
		updates.push(`status = $${valueCounter++}`);
		values.push(status);
	}

	if (updates.length === 0) {
		console.error("ERROR updating TODO, No fields to update");
		return;
	}

	// Add the ID to the values array
	values.push(id);

	// Construct the SQL query
	const queryText = `
      UPDATE todos
      SET ${updates.join(", ")}, updated_at = NOW()
      WHERE id = $${valueCounter}
      RETURNING *;
    `;

	try {
		const res = await pool.query(queryText, values);
		if (res.rowCount === 0) {
			console.log("No TODO found with the provided ID");
		} else {
			console.log("Successfully Updated TODO :", res.rows[0]);
		}
	} catch (error) {
		console.error("Failed to update TODO, INTERNAL SERVER ERROR:", error);
	} finally {
		process.exit(0);
	}
}

export async function deleteTodo(id) {
    if (!id) {
      console.error("ID NOT PROVIDED");
      return;
    }
  
    try {
      // Assuming getTodoById is a function that fetches a TODO by ID
      const todo = await getTodoById(id);
      if (!todo) {
        console.error("TODO with provided ID does not exist");
        return;
      }
  
      const res = await pool.query(`
        DELETE FROM todos
        WHERE id = $1
        RETURNING *;
      `, [id]);
  
      if (res.rowCount === 0) {
        console.log('No TODO found with the provided ID');
      } else {
        console.log('TODO deleted successfully:', res.rows[0]);
      }
    } catch (error) {
      console.error("ERROR while DELETING TODO :", error);
    }finally{
        process.exit(0);
    }
  }
const { pool } = require('../../db/pool');


async function createTask({ title, description, status }) {
const result = await pool.query(
`INSERT INTO tasks (title, description, status)
VALUES ($1, $2, COALESCE($3, 'pending'))
RETURNING *`,
[title, description ?? null, status ?? null]
);
return result.rows[0];
}


async function getTasks() {
const result = await pool.query(
'SELECT * FROM tasks ORDER BY created_at DESC'
);
return result.rows;
}


async function getTaskById(id) {
const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
return result.rows[0] || null;
}


async function updateTask(id, { title, description, status }) {
const result = await pool.query(
`UPDATE tasks
SET title = COALESCE($1, title),
description = COALESCE($2, description),
status = COALESCE($3, status)
WHERE id = $4
RETURNING *`,
[title ?? null, description ?? null, status ?? null, id]
);
return result.rows[0] || null;
}


async function deleteTask(id) {
const result = await pool.query(
'DELETE FROM tasks WHERE id = $1 RETURNING *',
[id]
);
return result.rows[0] || null;
}


module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
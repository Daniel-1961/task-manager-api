const repo = require('./task.repo');
const ApiError = require('../../utils/ApiError');
const { StatusCodes } = require('http-status-codes');


async function createTask(data) {
return repo.createTask(data);
}


async function listTasks() {
return repo.getTasks();
}


async function getTaskOrThrow(id) {
const task = await repo.getTaskById(id);
if (!task) throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
return task;
}


async function updateTaskOrThrow(id, data) {
const updated = await repo.updateTask(id, data);
if (!updated) throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
return updated;
}


async function deleteTaskOrThrow(id) {
const deleted = await repo.deleteTask(id);
if (!deleted) throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
return deleted;
}


module.exports = {
createTask,
listTasks,
getTaskOrThrow,
updateTaskOrThrow,
deleteTaskOrThrow,
};
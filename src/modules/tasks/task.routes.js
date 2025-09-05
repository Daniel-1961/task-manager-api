const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { createTaskRules, idParamRules, updateTaskRules } = require('./task.validation');
const service = require('./task.service');


// Create
router.post('/', validate(createTaskRules), async (req, res, next) => {
try {
const task = await service.createTask(req.body);
res.status(201).json(task);
} catch (err) { next(err); }
});


// Read all
router.get('/', async (req, res, next) => {
try {
const tasks = await service.listTasks();
res.json(tasks);
} catch (err) { next(err); }
});


// Read one
router.get('/:id', validate(idParamRules), async (req, res, next) => {
try {
const task = await service.getTaskOrThrow(req.params.id);
res.json(task);
} catch (err) { next(err); }
});


// Update (partial)
router.patch('/:id', validate([...idParamRules, ...updateTaskRules]), async (req, res, next) => {
try {
const task = await service.updateTaskOrThrow(req.params.id, req.body);
res.json(task);
} catch (err) { next(err); }
});


// Delete
router.delete('/:id', validate(idParamRules), async (req, res, next) => {
try {
await service.deleteTaskOrThrow(req.params.id);
res.status(204).send();
} catch (err) { next(err); }
});


module.exports = router;
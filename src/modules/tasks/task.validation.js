const { body, param } = require('express-validator');


const createTaskRules = [
body('title').isString().trim().notEmpty().withMessage('title is required'),
body('description').optional().isString(),
body('status').optional().isIn(['pending', 'in_progress', 'completed'])
];


const idParamRules = [
param('id').isInt({ min: 1 }).toInt()
];


const updateTaskRules = [
body('title').optional().isString().trim().notEmpty(),
body('description').optional().isString(),
body('status').optional().isIn(['pending', 'in_progress', 'completed'])
];


module.exports = { createTaskRules, idParamRules, updateTaskRules };
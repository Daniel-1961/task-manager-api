const { validationResult } = require('express-validator');


function validate(rules) {
return [
...rules,
(req, res, next) => {
const result = validationResult(req);
if (!result.isEmpty()) {
return res.status(400).json({
success: false,
errors: result.array().map(e => ({ field: e.param, message: e.msg }))
});
}
next();
}
];
}


module.exports = validate;
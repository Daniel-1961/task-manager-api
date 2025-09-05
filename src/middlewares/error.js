const ApiError=require('../utils/ApiError');
const logger=require('../utils/logger');
function notFound(req, res, next) {
next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}


function errorHandler(err, req, res, next) { // eslint-disable-line
const status = err.statusCode || 500;
const payload = {
success: false,
message: err.message || 'Internal Server Error',
};
if (process.env.NODE_ENV !== 'production' && err.details) {
payload.details = err.details;
}
logger.error({ err }, 'Request failed');
res.status(status).json(payload);
}


module.exports = { notFound, errorHandler };
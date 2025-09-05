const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const pinoHttp = require('pino-http');
const { notFound, errorHandler } = require('./middlewares/error');
const taskRoutes = require('./modules/tasks/task.routes');
const logger = require('./utils/logger');


function createApp() {
const app = express();


// Logging & security
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors());


// Body parsing
app.use(express.json());


// Basic rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Task Manager API 🚀",
    availableRoutes: ["/api/v1/tasks", "/api/v1/users", "/health"]
  });
});

// Healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok' }));


// Routes
app.use('/api/v1/tasks', taskRoutes);



app.use(notFound);
app.use(errorHandler);


return app;
}


module.exports = createApp;
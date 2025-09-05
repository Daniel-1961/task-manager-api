require('dotenv').config();
const createApp = require('./app');
const { initDb } = require('./db/pool');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initDb();
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
})();

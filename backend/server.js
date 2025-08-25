// server.js
import app from './app.js';
import { env } from './config/env.js';

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

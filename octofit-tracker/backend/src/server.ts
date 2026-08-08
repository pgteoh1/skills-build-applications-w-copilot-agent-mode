import app from './app.js';
import { connectToDatabase } from './config/database.js';

const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

async function startServer() {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on ${baseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exit(1);
});
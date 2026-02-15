import express from "express";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";

const PORT = 3000;
const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

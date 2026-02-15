import express from "express";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import pageRoutes from "./routes/pages.routes.js";

const PORT = 3000;
const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use("/", pageRoutes);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

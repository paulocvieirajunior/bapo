import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/chat.html"));
});

router.get("/terms", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/terms.html"));
});

router.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/privacy.html"));
});

export default router;

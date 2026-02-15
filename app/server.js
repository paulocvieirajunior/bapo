import express from "express";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { randomUUID } from "crypto";
import pageRoutes from "./routes/pages.routes.js";

const queue = [];
const rooms = new Map();

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use("/", pageRoutes);

io.on("connect", (socket) => {
  socket.on("waiting", () => {
    if (queue.length === 0 && !queue.find((i) => i === socket.id)) {
      console.log("Há um usuário na fila de espera...");
      queue.push(socket.id);
      socket.emit("waiting");
    } else {
      const stranger = queue.shift();
      const strangerSocket = io.sockets.sockets.get(stranger);
      const room = randomUUID();

      if (strangerSocket) {
        socket.join(room);
        strangerSocket.join(room);

        rooms.set(socket.id, room);
        rooms.set(strangerSocket.id, room);
      }

      io.to(room).emit("match");
    }
  });

  socket.on("message", (text) => {
    const room = rooms.get(socket.id);

    if (room) {
      io.to(room).emit("message", { text, id: socket.id });
    }
  });

  socket.on("skip", () => {
    const room = rooms.get(socket.id);

    if (room) {
      io.to(room).emit("skip");
      socket.leave(room);
    }
  });

  socket.on("disconnect", () => {
    const index = queue.indexOf(socket.id);
    const room = rooms.get(socket.id);

    if (index > -1) {
      queue.splice(index, 1);
    }

    if (room) {
      io.to(room).emit("skip");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

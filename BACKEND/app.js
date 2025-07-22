const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("send_notification", ({ message }) => {
    if (!message || message.trim() === "") {
      socket.emit("error_notification", { error: "Message cannot be empty." });
      return;
    }
    console.log("Message received:", message);
    socket.broadcast.emit("receive_notification", { message });
    socket.emit("success_notification", { status: "Message sent!" });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Notification server running.");
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});

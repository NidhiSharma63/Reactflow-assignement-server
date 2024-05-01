import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "../routes/router.js";
import errorHandle from "../utils/Errorhandle.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", router);
app.use(errorHandle);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: false,
  },
});
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

// Export the io instance
export { io, server };

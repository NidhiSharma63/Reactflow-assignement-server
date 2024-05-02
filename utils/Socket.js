import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "../routes/router.js";
import errorHandle from "../utils/Errorhandle.js";

// create an instance of the server
const app = express();

// parse the body to json
app.use(express.json());

// enable cors
app.use(cors());

// parse the body to url encoded (help to access form data)
app.use(express.urlencoded({ extended: false }));

// use the router with the prefix /api/v1
app.use("/api/v1", router);

// handle errors
app.use(errorHandle);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
  },
});

// listen for connections
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

// Export the io instance
export { io, server };

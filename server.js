import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./src/routes/auth.js";
import postRoutes from "./src/routes/posts.js"; 
import dotenv from 'dotenv';
import registerChatHandlers from "./src/sockets/chat.socket.js";


dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());


mongoose
  .connect(process.env.MONGODB_URI ,{dbName:"socialmediaapp"})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error", err));

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes); 

io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);
  registerChatHandlers(io, socket);
});


const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

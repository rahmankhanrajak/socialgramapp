import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import authRoutes from "./src/routes/auth.js";
import postRoutes from "./src/routes/posts.js";
import dotenv from 'dotenv';


dotenv.config();

const app = express();


app.use(cors());
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



const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

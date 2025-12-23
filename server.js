import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import authRoutes from "./src/routes/auth.js";
import dotenv from 'dotenv';


dotenv.config();

const app = express();


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



const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

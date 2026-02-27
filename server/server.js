import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import messageRoutes from "./routes/message.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running")
);
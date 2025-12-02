import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Static uploads folder
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
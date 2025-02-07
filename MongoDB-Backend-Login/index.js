// import express from 'express';
// import connectDB from './db/connect.js';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import authRoutes from './routes/auth.js';
// import cookieParser from 'cookie-parser';

// dotenv.config();
// connectDB();
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser())

// app.use('/api/v1/user/', authRoutes);

// app.get("/", (req, res) => {
//     try {
//         return res.status(200).json({ success: true, error: false, message: 'Hello There Men you are the guy' });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: true, message: 'Internal Server Error' });
//     }
// })

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//     console.log(`Server is working suceessfully at ${PORT}`);
// })

import express from "express";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const app = express();

// ✅ Fix CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // ✅ Must match the frontend's URL
  credentials: true, // ✅ Required for cookies
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user/", authRoutes);

app.get("/", (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Hello There! Men, you are the guy!" });
  } catch (error) {
    console.error("Error in / route:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running successfully at ${PORT}`);
});

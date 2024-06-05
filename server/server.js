import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from 'fs';
import authRouter from './routes/auth.js';
import mongoose from "mongoose";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connected")).catch(err => console.log(err)); 
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api',authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

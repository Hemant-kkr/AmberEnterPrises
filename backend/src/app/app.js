import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import indexRoutes from '../routes/index-routes.js';
import { morganMiddleware } from "../middlewares/morgan-middleware.js";
import AppError from '../utils/appError.js';
import errorHandler from '../middlewares/errorHandling-middleware.js';
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename= fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);


app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                  
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morganMiddleware);
app.use('/uploads',express.static(path.join(__dirname,'../../','uploads')));

app.use('/api', indexRoutes);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;

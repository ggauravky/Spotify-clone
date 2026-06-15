import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import fileupload from 'express-fileupload';
import path from 'path';

import {connectDB} from './lib/db.js';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songsRoutes from './routes/songs.route.js';
import albumRoutes from './routes/album.route.js';
import statsRoutes from './routes/stats.route.js';


dotenv.config();

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(clerkMiddleware()); //this will add the user object to the request if the user is authenticated

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'),
  createParentPath: true,
  limit: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
}));

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/songs",songsRoutes);
app.use("/api/albums",albumRoutes);
app.use("/api/stats",statsRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
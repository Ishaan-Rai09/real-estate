import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { propertyRouter } from './routes/properties';
import { agentRouter } from './routes/agents';
import { favoritesRouter } from './routes/favorites';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection Options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
} as mongoose.ConnectOptions;

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://172.21.48.1:8080',
  process.env.CLIENT_URL
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/agents', agentRouter);
app.use('/api/favorites', favoritesRouter);

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB connection string is not defined');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
    console.log('Connected to MongoDB Atlas');
    
    // Start server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

// Initialize connection
connectDB(); 
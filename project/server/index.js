// server.js (or index.js)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db.js';  // Import the connectDB function
import categoryRoutes from './routes/categories.js';

dotenv.config();

// Create an Express app
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// ============ Middleware ============ //
// Enable CORS to allow frontend apps to access the API
app.use(cors());

// Enable parsing of JSON bodies
app.use(express.json());

// ============ Database Connection ============ //
// Connect to MongoDB using the imported connectDB function
connectDB();

// ============ Routes ============ //
// All routes starting with /api/categories will use the categoryRoutes logic
app.use('/api/categories', categoryRoutes);

// ============ Start the Server ============ //
// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

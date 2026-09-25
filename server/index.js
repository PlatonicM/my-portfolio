import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import blogRoutes from './routes/blog.js';
import contactRoutes from './routes/contact.js';
import resumeRoutes from './routes/resume.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection middleware for serverless environment
app.use('/api', async (_req, _res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Global 404 handler for API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Global Error Handler Middleware
app.use((err, _req, res, _next) => {
  console.error('Server Express Error:', err.stack || err.message || err);
  res.status(200).json({
    success: false,
    error: err.message || 'Internal Server Error',
    fallback: true,
  });
});

// Attempt database connection asynchronously
connectDB().catch((err) => {
  console.warn('MongoDB initial connection attempt deferred:', err.message);
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

export default app;


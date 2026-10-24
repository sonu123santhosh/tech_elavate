import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import experimentRoutes from './routes/experimentRoutes.js';
import equipmentCatalogRoutes from './routes/equipmentCatalogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';

// Security and CORS configuration
app.use(
  cors({
    origin: CLIENT_ORIGIN === '*' ? true : CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Payload parsing with size limit
app.use(express.json({ limit: '1mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount API routes
app.use('/api', chatRoutes);
app.use('/api', quizRoutes);
app.use('/api', equipmentCatalogRoutes);
app.use('/api/virtual-lab', experimentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Smart Lab Assistant Backend API',
    team: 'UNEMPLOYED 004',
    author: 'Person 4',
    features: [
      'pH-Metric Titration Service',
      'Conductometric Titration Service',
      'AI Lab Assistant Chat Service',
      'Smart AR Equipment Recognition & 63-Item Quiz System',
      'Virtual Chemistry Lab — 15 Experiments & Interactive Lab Manuals',
    ],
    endpoints: {
      health: 'GET /api/health',
      chat: 'POST /api/chat',
      equipment: 'GET /api/equipment',
      equipmentById: 'GET /api/equipment/:id',
      evaluateQuiz: 'POST /api/quiz/evaluate',
      experiments: 'GET /api/virtual-lab/experiments',
      experimentById: 'GET /api/virtual-lab/experiments/:id',
      evaluateExperimentQuiz: 'POST /api/virtual-lab/quiz/evaluate',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.url}`,
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'An unexpected internal server error occurred.',
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(` Smart Lab Assistant Backend running on http://localhost:${PORT}`);
    console.log(` Health Check available at http://localhost:${PORT}/api/health`);
    console.log(` Chat API available at POST http://localhost:${PORT}/api/chat`);
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.warn('️ WARNING: GEMINI_API_KEY is not set. Gemini chat requests will return 503 until key is added to .env');
    } else {
      console.log(' Gemini API Key detected.');
    }
  });
}

export default app;

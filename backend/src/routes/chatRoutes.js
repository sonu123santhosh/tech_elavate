import { Router } from 'express';
import { handleChat, handleChatStream, handleHealth } from '../controllers/chatController.js';
import { chatRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Health check endpoint
router.get('/health', handleHealth);

// Chat endpoints with validation and rate limiting
router.post('/chat/stream', chatRateLimiter, handleChatStream);
router.post('/chat', chatRateLimiter, handleChat);

export default router;


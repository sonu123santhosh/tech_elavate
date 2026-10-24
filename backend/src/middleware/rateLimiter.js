import rateLimit from 'express-rate-limit';

// Limit each IP to 20 chat requests per minute to prevent abuse
export const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate limit exceeded. Please wait a minute before sending more questions to the AI assistant.',
  },
});

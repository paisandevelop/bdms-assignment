import { rateLimit } from 'express-rate-limit'
import dotenv from 'dotenv';

dotenv.config();

const maxRequests = parseInt(process.env.RATE_LIMIT as string, 10);

// Rate limit middleware
export const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000,
  max: maxRequests || 10,
  message: "You have exceeded your maximum requests per minute limit.",
  headers: true,
});
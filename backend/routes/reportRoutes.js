// routes/reportRoutes.js
import express from 'express';
import { quizReport, studentReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Instructor gets quiz analytics
router.get('/quiz/:quizId', protect, quizReport);

// Student gets their own performance history
router.get('/student', protect, studentReport);

export default router;

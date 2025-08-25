import express from 'express';
import Quiz from '../models/Quiz.js';
import {
  createQuiz,
  getQuiz,
  submitQuiz,
  getInstructorQuizzes,
  updateQuiz,
  deleteQuiz,
  getCompletedQuizzes,
  getInstructorQuizById
} from '../controllers/quizController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// ================== Instructor routes ==================
router.get('/instructor/my-quizzes', protect, authorize('instructor'), getInstructorQuizzes);
router.get('/instructor/:id', protect, authorize('instructor'), getInstructorQuizById);

// Instructor CRUD
router.post('/', protect, authorize('instructor'), createQuiz);
router.put('/:id', protect, authorize('instructor'), updateQuiz);
router.delete('/:id', protect, authorize('instructor'), deleteQuiz);

// ================== Student routes ==================
router.get('/', protect, authorize('student'), async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', protect, authorize('student'), getQuiz);
router.post('/:id/submit', protect, authorize('student'), submitQuiz);
router.get('/student/completed', protect, authorize('student'), getCompletedQuizzes);

export default router;

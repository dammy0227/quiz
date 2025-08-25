// controllers/quizController.js
import Quiz from '../models/Quiz.js';
import { getRandomizedQuiz, gradeQuiz } from '../services/quizService.js';
import Response from '../models/Response.js';

// Create new quiz (Instructor only)
export const createQuiz = async (req, res, next) => {
  try {
    const { title, description, questions, schedule } = req.body;

    if (!title || !questions?.length || !schedule?.startTime || !schedule?.endTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      schedule,
      createdBy: req.user._id
    });

    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};

// Get quiz with randomized questions (Student)
export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await getRandomizedQuiz(req.params.id);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

// Submit quiz answers and grade
export const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const result = await gradeQuiz(req.params.id, req.user._id, answers);
    res.json(result);
  } catch (error) {
    next(error);
  }
};


// Get all quizzes created by logged-in instructor
export const getInstructorQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user._id });
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

// Update a quiz
export const updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    next(error);
  }
};


export const getCompletedQuizzes = async (req, res, next) => {
  try {
    const responses = await Response.find({ studentId: req.user._id }).select('quizId');
    const completedQuizIds = responses.map(r => r.quizId);
    res.json(completedQuizIds);
  } catch (err) {
    next(err);
  }
};

export const getInstructorQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found or not authorized' });
    }
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};
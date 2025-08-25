import { getQuizStats, getStudentPerformance } from '../services/reportService.js';

// Get analytics for a quiz (Instructor)
export const quizReport = async (req, res, next) => {
  try {
    const stats = await getQuizStats(req.params.quizId);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching quiz report:', error);
    res.status(500).json({ message: 'Failed to fetch quiz report', error: error.message });
  }
};

// Get student's quiz history (Student)
export const studentReport = async (req, res, next) => {
  try {
    const performance = await getStudentPerformance(req.user._id);
    res.json(performance);
  } catch (error) {
    console.error('Error fetching student report:', error);
    res.status(500).json({ message: 'Failed to fetch student report', error: error.message });
  }
};

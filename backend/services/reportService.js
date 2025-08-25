import Response from '../models/Response.js';
import Quiz from '../models/Quiz.js';
import User from '../models/User.js'; // for student names if needed

// Instructor quiz stats
export const getQuizStats = async (quizId) => {
  const responses = await Response.find({ quizId }).populate('studentId', 'name');

  if (!responses.length) {
    return { attempts: 0, averageScore: 0, questionDifficulty: [], studentScores: [] };
  }

  const totalScore = responses.reduce((sum, r) => sum + r.score, 0);
  const averageScore = totalScore / responses.length;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return { attempts: responses.length, averageScore, questionDifficulty: [], studentScores: [] };
  }

  const questionStats = quiz.questions.map((q) => {
    const correctCount = responses.filter((r) =>
      r.answers.find((a) => a.questionId.toString() === q._id.toString() && a.isCorrect)
    ).length;

    return {
      questionId: q._id,
      questionText: q.questionText,
      difficulty: ((responses.length - correctCount) / responses.length) * 100,
    };
  });

  // Filter out responses with deleted students
  const studentScores = responses
    .filter(r => r.studentId) // skip if student deleted
    .map((r) => ({
      studentId: r.studentId._id,
      studentName: r.studentId.name,
      score: r.score,
    }));

  return {
    attempts: responses.length,
    averageScore,
    questionDifficulty: questionStats,
    studentScores,
  };
};

// Student quiz history
export const getStudentPerformance = async (studentId) => {
  const responses = await Response.find({ studentId }).populate('quizId', 'title');

  return responses
    .filter(r => r.quizId) // skip if quiz deleted
    .map((r) => ({
      quizId: r.quizId._id,
      quizTitle: r.quizId.title,
      score: r.score,
    }));
};

// services/quizService.js
import Quiz from '../models/Quiz.js';
import Response from '../models/Response.js';

// Randomize questions and answer options
export const getRandomizedQuiz = async (quizId) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error('Quiz not found');

  // Shuffle questions
  const shuffledQuestions = quiz.questions.sort(() => Math.random() - 0.5);

  // Shuffle options for each question
  shuffledQuestions.forEach((q) => {
    q.options = q.options.sort(() => Math.random() - 0.5);
  });

  return { ...quiz._doc, questions: shuffledQuestions };
};

// Grade a quiz submission
export const gradeQuiz = async (quizId, studentId, answers) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error('Quiz not found');

  let score = 0;
  const answerDetails = [];

  quiz.questions.forEach((question) => {
    const submittedAnswer = answers.find((a) => a.questionId === question._id.toString());
    const isCorrect = submittedAnswer?.selectedOption === question.correctAnswer;

    if (isCorrect) {
      score += question.points || 1;
    }

    answerDetails.push({
      questionId: question._id,
      selectedOption: submittedAnswer?.selectedOption || '',
      isCorrect
    });
  });

  // Save response
  const response = new Response({
    quizId,
    studentId,
    answers: answerDetails,
    score
  });

  await response.save();

  return { score, totalPoints: quiz.questions.length, details: answerDetails };
};

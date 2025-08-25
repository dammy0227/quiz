import React, { useState } from 'react';
import QuizContext from './QuizContext';
import { createQuiz as createQuizService, getQuiz as getQuizService, submitQuiz as submitQuizService } from '../services/quizService';

const QuizProvider = ({ children }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const createQuiz = async (quizData) => await createQuizService(quizData);

  const getQuiz = async (quizId) => {
    const data = await getQuizService(quizId);
    setCurrentQuiz(data);
  };

  const submitQuiz = async (quizId, answers) => {
    const data = await submitQuizService(quizId, answers);
    setQuizResults(data);
  };

  return (
    <QuizContext.Provider value={{ currentQuiz, quizResults, createQuiz, getQuiz, submitQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;

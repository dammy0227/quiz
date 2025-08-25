import { useContext } from 'react';
import QuizContext from '../context/QuizContext';

export const useQuiz = () => {
  return useContext(QuizContext);
};

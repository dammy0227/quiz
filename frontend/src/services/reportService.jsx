// src/services/reportService.js
import API from './api';

// Instructor quiz report
export const getQuizReport = async (quizId) => {
  const { data } = await API.get(`/reports/quiz/${quizId}`);
  return data;
};

// Student performance report
export const getStudentReport = async () => {
  const { data } = await API.get('/reports/student');
  return data;
};


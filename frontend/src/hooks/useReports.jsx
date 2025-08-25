import { useState } from 'react';
import { getQuizReport, getStudentReport } from '../services/reportService';

export const useReports = () => {
  const [report, setReport] = useState(null);

  const fetchQuizReport = async (quizId) => {
    const data = await getQuizReport(quizId);
    setReport(data);
  };

  const fetchStudentReport = async () => {
    const data = await getStudentReport();
    setReport(data);
  };

  return { report, fetchQuizReport, fetchStudentReport };
};

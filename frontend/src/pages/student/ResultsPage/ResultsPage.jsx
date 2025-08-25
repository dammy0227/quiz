import React, { useEffect, useState } from 'react';
import { getStudentReport } from '../../../services/reportService';
import StudentLayout from '../../../layouts/StudentLayout/StudentLayout';
import './ResultsPage.css';

const ResultsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getStudentReport().then(setReports).catch(console.error);
  }, []);

  return (
    <StudentLayout>
      <div className="results-container">
        <h2 className="results-title">Your Quiz Results</h2>
        <div className="results-grid">
          {reports.map((r) => (
            <div className="result-card" key={r.quizId}>
              <h3>{r.quizTitle}</h3>
              <p><strong>Score:</strong> {r.score}%</p>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default ResultsPage;

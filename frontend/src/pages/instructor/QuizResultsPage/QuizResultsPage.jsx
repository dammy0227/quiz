import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import InstructorLayout from "../../../layouts/InstructorLayout/InstructorLayout";
import { getQuizReport } from "../../../services/reportService";
import "./QuizResultsPage.css";

const QuizResultsPage = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const [report, setReport] = useState(location.state?.report || null);

  useEffect(() => {
    // Only fetch if report not already provided
    if (!report) {
      const fetchReport = async () => {
        try {
          const data = await getQuizReport(quizId);
          setReport(data);
        } catch (err) {
          console.error("Error fetching report:", err);
        }
      };
      fetchReport();
    }
  }, [quizId, report]);

  if (!report) return <p className="results-loading">Loading results...</p>;

  const questions = Array.isArray(report.questionDifficulty) ? report.questionDifficulty : [];

  return (
    <InstructorLayout>
      <h1 className="results-title">{report.title || "Quiz"} - Results</h1>

      {/* Summary */}
      <div className="results-summary">
        <div className="summary-card">
          <h3>Total Attempts</h3>
          <p>{report.attempts || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Average Score</h3>
          <p>{report.averageScore?.toFixed(2) || 0}%</p>
        </div>
      </div>

      {/* Question Performance Table */}
      <div className="results-table-wrapper">
        <h2>Question Performance</h2>
         <div className="table-container"></div>
        <table className="results-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>% Correct</th>
              <th>% Incorrect</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i) => (
              <tr key={i}>
                <td>{q.questionText || "Question"}</td>
                <td>{(100 - q.difficulty)?.toFixed(2) || 0}%</td>
                <td>{q.difficulty?.toFixed(2) || 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Individual Student Scores */}
      <div className="results-student-scores">
        <h2>Student Scores</h2>
        {report.studentScores?.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {report.studentScores.map((s) => (
                <tr key={s.studentId}>
                  <td>{s.studentName}</td>
                  <td>{s.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No student data available</p>
        )}
      </div>
    </InstructorLayout>
  );
};

export default QuizResultsPage;

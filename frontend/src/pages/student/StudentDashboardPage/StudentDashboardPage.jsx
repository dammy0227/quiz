// src/pages/student/StudentDashboardPage/StudentDashboardPage.jsx
import React, { useEffect, useState } from "react";
import StudentLayout from "../../../layouts/StudentLayout/StudentLayout";
import QuizCard from "../../../components/QuizCard/QuizCard";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import "./StudentDashboardPage.css";

const StudentDashboardPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [completedQuizIds, setCompletedQuizIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Fetch quizzes
        const { data: allQuizzes } = await API.get("/quizzes");

        // Fetch completed quiz IDs
        const { data: completedIds } = await API.get(
          "/quizzes/student/completed"
        );
        setCompletedQuizIds(completedIds);

        // Sort quizzes: available first (newest to oldest), then completed (newest to oldest)
        const sortedQuizzes = [...allQuizzes].sort((a, b) => {
          const aIsCompleted = completedIds.includes(a._id);
          const bIsCompleted = completedIds.includes(b._id);

          if (aIsCompleted && !bIsCompleted) return 1; // completed goes after available
          if (!aIsCompleted && bIsCompleted) return -1;

          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a._id);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b._id);
          return dateB - dateA; // newest first
        });

        setQuizzes(sortedQuizzes);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartQuiz = (quizId) => {
    if (completedQuizIds.includes(quizId)) {
      alert("You have already attempted this quiz.");
      return;
    }
    navigate(`/student/quiz/${quizId}`);
  };

  return (
    <StudentLayout>
      <div className="student-dashboard">
        <h2 className="dashboard-title">📘 Available Quizzes</h2>

        <div className="quiz-list">
          {quizzes.length === 0 && (
            <p className="no-quizzes">No quizzes available.</p>
          )}
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              description={quiz.description}
              onStart={() => handleStartQuiz(quiz._id)}
              isDisabled={completedQuizIds.includes(quiz._id)}
            />
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboardPage;

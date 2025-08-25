import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorLayout from "../../../layouts/InstructorLayout/InstructorLayout";
import { getInstructorQuizzes, deleteQuiz } from "../../../services/quizService";
import { getQuizReport } from "../../../services/reportService";
import "./ManageQuizzesPage.css";

const ManageQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getInstructorQuizzes();

        // Sort newest first
        const sorted = [...data].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a._id);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b._id);
          return dateB - dateA;
        });

        setQuizzes(sorted);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuiz(id);
        setQuizzes((prev) => prev.filter((q) => q._id !== id));
      } catch (err) {
        console.error("Error deleting quiz:", err);
      }
    }
  };

  const handleEdit = (quiz) => {
    navigate(`/instructor/edit-quiz/${quiz._id}`, { state: { quiz } });
  };

  const handleViewResults = async (quizId) => {
    try {
      const report = await getQuizReport(quizId);
      navigate(`/instructor/quiz-results/${quizId}`, { state: { report } });
    } catch (err) {
      console.error("Failed to fetch report:", err);
      alert("Failed to fetch results");
    }
  };

  return (
    <InstructorLayout>
      <div className="manage-quizzes-container">
        <h2>Manage Quizzes</h2>
        {quizzes.length === 0 ? (
          <p>No quizzes created yet.</p>
        ) : (
          <div className="table-container">
            <table className="quizzes-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Questions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz._id}>
                    <td data-label="Title">{quiz.title}</td>
                    <td data-label="Description" title={quiz.description}>
                      {quiz.description}
                    </td>
                    <td data-label="Questions">{quiz.questions.length}</td>
                    <td data-label="Actions">
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(quiz)}>Edit</button>
                        <button onClick={() => handleDelete(quiz._id)}>Delete</button>
                        <button onClick={() => handleViewResults(quiz._id)}>View Results</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </InstructorLayout>
  );
};

export default ManageQuizzesPage;

// src/pages/student/QuizPage/QuizPage.jsx
import React, { useEffect, useState } from 'react';
import { getQuiz, submitQuiz } from '../../../services/quizService';
import StudentLayout from '../../../layouts/StudentLayout/StudentLayout';
import { useParams, useNavigate } from 'react-router-dom';
import Timer from '../../../components/Timer/Timer'; // ✅ import timer
import './QuizPage.css';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuiz(id);
        setQuiz(data);
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (submitted) return; // Prevent multiple submissions

    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));

    try {
      await submitQuiz(id, formattedAnswers);
      setSubmitted(true);
      alert('Quiz submitted successfully!');
      navigate('/student/results');
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    }
  };

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <StudentLayout>
      <div className="quiz-container">
        <h2>{quiz.title}</h2>

        {/* ✅ Timer added here */}
        <Timer
          duration={quiz.duration ? quiz.duration * 60 : 300} // quiz.duration in minutes → seconds
          onTimeUp={handleSubmit}
        />

        {quiz.questions.map((q) => (
          <div key={q._id} className="quiz-question">
            <p>{q.questionText}</p>
            {q.options.map((opt, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  onChange={() => handleAnswerChange(q._id, opt)}
                  disabled={submitted}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={submitted || Object.keys(answers).length === 0}
        >
          {submitted ? 'Quiz Submitted' : 'Submit Quiz'}
        </button>
      </div>
    </StudentLayout>
  );
};

export default QuizPage;

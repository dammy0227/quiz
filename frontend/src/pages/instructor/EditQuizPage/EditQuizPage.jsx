import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import InstructorLayout from '../../../layouts/InstructorLayout/InstructorLayout';
import { getInstructorQuiz, updateQuiz } from '../../../services/quizService';
import './EditQuizPage.css';

const EditQuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [quiz, setQuiz] = useState(
    state?.quiz || { title: '', description: '', questions: [], schedule: { startTime: '', endTime: '' } }
  );

  const [loading, setLoading] = useState(!state?.quiz);
  const [newQuestion, setNewQuestion] = useState({ questionText: '', options: ['', ''], correctAnswer: '', points: 1 });

  useEffect(() => {
    if (!state?.quiz) {
      const fetchQuiz = async () => {
        try {
          const data = await getInstructorQuiz(id);
          setQuiz(data);
        } catch (err) {
          console.error(err);
          alert('Failed to fetch quiz.');
          navigate('/instructor/manage-quizzes');
        } finally {
          setLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [id, navigate, state?.quiz]);

  const handleQuizChange = (e) => setQuiz({ ...quiz, [e.target.name]: e.target.value });
  const handleScheduleChange = (e) => setQuiz({ ...quiz, schedule: { ...quiz.schedule, [e.target.name]: e.target.value } });

  const handleQuestionChange = (e, qIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex][e.target.name] = e.target.value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (e, qIndex, oIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[oIndex] = e.target.value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options.push('');
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addNewQuestion = () => {
    if (!newQuestion.questionText || newQuestion.options.some((opt) => !opt) || !newQuestion.correctAnswer) {
      alert('Please fill all fields for the question');
      return;
    }
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
    setNewQuestion({ questionText: '', options: ['', ''], correctAnswer: '', points: 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateQuiz(id, quiz);
      alert('Quiz updated successfully!');
      navigate('/instructor/manage-quizzes');
    } catch (err) {
      console.error(err);
      alert('Failed to update quiz.');
    }
  };

  if (loading) return <p>Loading quiz...</p>;

  return (
    <InstructorLayout>
      <form className="edit-quiz-form" onSubmit={handleSubmit}>
        <h2>Edit Quiz</h2>
        <input name="title" value={quiz.title} onChange={handleQuizChange} placeholder="Quiz Title" required />
        <textarea name="description" value={quiz.description} onChange={handleQuizChange} placeholder="Description" />

        <h3>Schedule</h3>
        <input type="datetime-local" name="startTime" value={quiz.schedule.startTime} onChange={handleScheduleChange} />
        <input type="datetime-local" name="endTime" value={quiz.schedule.endTime} onChange={handleScheduleChange} />

        <h3>Edit Questions</h3>
        {quiz.questions.map((q, qIndex) => (
          <div className="question-card" key={qIndex}>
            <input
              name="questionText"
              value={q.questionText}
              placeholder="Question Text"
              onChange={(e) => handleQuestionChange(e, qIndex)}
            />
            {q.options.map((opt, oIndex) => (
              <input
                key={oIndex}
                value={opt}
                placeholder={`Option ${oIndex + 1}`}
                onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
              />
            ))}
            <button type="button" className="add-btn" onClick={() => addOption(qIndex)}>+ Add Option</button>
            <input
              name="correctAnswer"
              value={q.correctAnswer}
              placeholder="Correct Answer"
              onChange={(e) => handleQuestionChange(e, qIndex)}
            />
            <input
              type="number"
              name="points"
              value={q.points}
              placeholder="Points"
              onChange={(e) => handleQuestionChange(e, qIndex)}
            />
          </div>
        ))}

        <h3>Add New Question</h3>
        <input name="questionText" placeholder="Question" value={newQuestion.questionText} onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })} />
        {newQuestion.options.map((opt, idx) => (
          <input key={idx} placeholder={`Option ${idx + 1}`} value={opt} onChange={(e) => {
            const updatedOptions = [...newQuestion.options];
            updatedOptions[idx] = e.target.value;
            setNewQuestion({ ...newQuestion, options: updatedOptions });
          }} />
        ))}
        <button type="button" className="add-btn" onClick={() => setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ''] })}>+ Add Option</button>
        <input name="correctAnswer" placeholder="Correct Answer" value={newQuestion.correctAnswer} onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })} />
        <input type="number" name="points" value={newQuestion.points} placeholder="Points" onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) })} />
        <button type="button" onClick={addNewQuestion}>Add Question to Quiz</button>

        <h4>Questions Preview:</h4>
        {quiz.questions.map((q, i) => (
          <div className="question-card" key={i}>
            <p><strong>Q{i + 1}:</strong> {q.questionText}</p>
            <ul>{q.options.map((opt, idx) => <li key={idx}>{opt}</li>)}</ul>
            <p><strong>Correct:</strong> {q.correctAnswer} | <strong>Points:</strong> {q.points}</p>
          </div>
        ))}

        <button type="submit">Update Quiz</button>
      </form>
    </InstructorLayout>
  );
};

export default EditQuizPage;

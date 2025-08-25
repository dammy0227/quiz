import React, { useState } from "react";
import { createQuiz } from "../../../services/quizService";
import InstructorLayout from "../../../layouts/InstructorLayout/InstructorLayout";
import './CreateQuizPage.css'

const CreateQuizPage = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    schedule: { startTime: "", endTime: "" },
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    options: ["", ""],
    correctAnswer: "",
    points: 1,
  });

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleScheduleChange = (e) => {
    setQuiz({
      ...quiz,
      schedule: { ...quiz.schedule, [e.target.name]: e.target.value },
    });
  };

  const handleQuestionChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const addOption = () => {
    setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ""] });
  };

  const addQuestion = () => {
    if (
      !newQuestion.questionText ||
      newQuestion.options.some((opt) => !opt) ||
      !newQuestion.correctAnswer
    ) {
      alert("Please fill all fields for the question");
      return;
    }
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
    setNewQuestion({
      questionText: "",
      options: ["", ""],
      correctAnswer: "",
      points: 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuiz(quiz);
      window.location.href = "/instructor/manage-quizzes";
    } catch (err) {
      console.error(err);
      alert("Error creating quiz");
    }
  };

return (
  <InstructorLayout>
    <div className="create-quiz-container">
      <h2>Create New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={quiz.title}
          onChange={handleQuizChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={quiz.description}
          onChange={handleQuizChange}
        />

        <h3>Schedule</h3>
        <label>
          Start Time:
          <input
            type="datetime-local"
            name="startTime"
            value={quiz.schedule.startTime}
            onChange={handleScheduleChange}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            name="endTime"
            value={quiz.schedule.endTime}
            onChange={handleScheduleChange}
            required
          />
        </label>

        <h3>Add Question</h3>
        <input
          name="questionText"
          placeholder="Question"
          value={newQuestion.questionText}
          onChange={handleQuestionChange}
        />
        {newQuestion.options.map((opt, idx) => (
          <input
            key={idx}
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}
        <button
          type="button"
          className="secondary-btn"
          onClick={addOption}
        >
          + Add Option
        </button>
        <input
          name="correctAnswer"
          placeholder="Correct Answer"
          value={newQuestion.correctAnswer}
          onChange={handleQuestionChange}
        />
        <input
          type="number"
          name="points"
          value={newQuestion.points}
          onChange={handleQuestionChange}
          placeholder="Points"
        />
        <button
          type="button"
          className="secondary-btn"
          onClick={addQuestion}
        >
          Add Question to Quiz
        </button>

        <h4>Questions Added:</h4>
        <ul className="questions-list">
          {quiz.questions.map((q, i) => (
            <li key={i}>{q.questionText}</li>
          ))}
        </ul>

        <button type="submit">Save Quiz</button>
      </form>
    </div>
  </InstructorLayout>
);

};

export default CreateQuizPage;

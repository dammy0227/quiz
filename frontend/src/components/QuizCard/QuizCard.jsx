import React from 'react';
import './QuizCard.css';
import Button from '../Button/Button';

const QuizCard = ({ title, description, onStart }) => {
  return (
    <div className="quiz-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Button onClick={onStart}>Start Quiz</Button>
    </div>
  );
};

export default QuizCard;

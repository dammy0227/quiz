import React, { useEffect, useState } from 'react';
import InstructorLayout from '../../../layouts/InstructorLayout/InstructorLayout';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getInstructorQuizzes } from '../../../services/quizService';
import './InstructorDashboardPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const InstructorDashboardPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getInstructorQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch quizzes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <InstructorLayout><p>Loading quizzes...</p></InstructorLayout>;
  if (error) return <InstructorLayout><p>{error}</p></InstructorLayout>;
  if (quizzes.length === 0)
    return (
      <InstructorLayout>
        <p>No quizzes found. <a href="/instructor/create-quiz">Create your first quiz</a>.</p>
      </InstructorLayout>
    );

  const labels = quizzes.map(q => q.title);
  const scores = quizzes.map(q => q.averageScore || 0);

  const barData = {
    labels,
    datasets: [
      { label: 'Average Score', data: scores, backgroundColor: 'rgba(75, 192, 192, 0.6)' }
    ]
  };

  const lineData = {
    labels,
    datasets: [
      { label: 'Average Score Trend', data: scores, borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)', tension: 0.3, fill: true }
    ]
  };

  return (
    <InstructorLayout>
      <h1>Instructor Dashboard</h1>
      <div className="charts">
        <div className="chart-container"><Bar data={barData} /></div>
        <div className="chart-container"><Line data={lineData} /></div>
      </div>
    </InstructorLayout>
  );
};

export default InstructorDashboardPage;

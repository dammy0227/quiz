import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Chart.css';

// Register all needed chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ labels, dataValues, type = 'bar' }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Scores',
        data: dataValues,
        backgroundColor:
          type === 'pie'
            ? ['#45a049', '#4CAF50', '#3e8e41', '#66bb6a']
            : 'rgba(69,160,73,0.8)',
        borderColor: type === 'line' ? '#4CAF50' : undefined,
        fill: type === 'line' ? false : true,
        tension: type === 'line' ? 0.3 : 0, // smooth zigzag
      },
    ],
  };

  return (
    <div className="chart-container">
      {type === 'pie' && <Pie data={data} />}
      {type === 'bar' && <Bar data={data} />}
      {type === 'line' && <Line data={data} />}
    </div>
  );
};

export default Chart;

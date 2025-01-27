import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, Grid } from '@mui/material';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Insights({ agreements }) {
  const calculateRenewalTrends = (data) => {
    // Simulated calculation
    return [65, 75, 70, 80, 85, 90];
  };

  const calculateAverageRenewalRate = (data) => {
    return 78; // Simulated average
  };

  const calculateRiskMetric = (data) => {
    return 15; // Simulated risk metric
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category'
      },
      y: {
        beginAtZero: true
      }
    }
  };

  const renewalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Renewal Success Rate',
      data: calculateRenewalTrends(agreements),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <Card className="insights-panel">
      <h2>Predictive Insights</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="chart-container">
            <Line data={renewalData} options={options} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="metrics-container">
            <div className="metric">
              <h3>Average Renewal Rate</h3>
              <p>{calculateAverageRenewalRate(agreements)}%</p>
            </div>
            <div className="metric">
              <h3>Risk Assessment</h3>
              <p>{calculateRiskMetric(agreements)}%</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Insights;

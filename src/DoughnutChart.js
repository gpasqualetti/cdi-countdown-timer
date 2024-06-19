// src/DoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ completionRate }) => {
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completionRate, 100 - completionRate],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 14
          },
          color: 'white'
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(tooltipItem) {
            const value = tooltipItem.raw; // Get the raw value
            return `${value.toFixed(2)}%`; // Add the percentage sign and format
          }
        }
      }
    },
    cutout: '60%'
  };

  return (
    <div className="doughnut-chart-container">
      <div className="doughnut-chart">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;


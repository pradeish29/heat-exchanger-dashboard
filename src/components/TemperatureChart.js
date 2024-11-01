// src/components/TemperatureChart.js
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './TemperatureChart.css';

const TemperatureChart = ({ data }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        // Register chart components
        Chart.register(...registerables);

        const ctx = canvasRef.current.getContext('2d');

        // Destroy the previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create the new chart instance
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Data Points',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Temperature (°C)',
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                animation: {
                    duration: 500,
                },
            },
        });

        // Cleanup function to destroy the chart on unmount or re-render
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]); // Re-run effect when the data changes

    return (
        <div className="chart-container">
            <canvas ref={canvasRef} width="400" height="200"></canvas>
        </div>
    );
};

export default TemperatureChart;

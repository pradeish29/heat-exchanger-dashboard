import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FluidValues from './components/FluidValues';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
    const maxDataPoints = 7; // Set max data points
    const thresholdValue = 75; // Set your threshold value here
    const [data, setData] = useState({
        series: [
            {
                name: 'Hot Fluid',
                data: [], // Hot fluid data
            },
            {
                name: 'Cold Fluid',
                data: [], // Cold fluid data
            },
        ],
        options: {
            chart: {
                id: 'realtime',
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000, // Speed of the animation
                    },
                },
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth', // Smooth line curve
                },
            },
            xaxis: {
                title: {
                    text: 'Data Points',
                },
                categories: [], // Dynamic categories
                labels: {
                    show: true,
                },
            },
            yaxis: {
                title: {
                    text: 'Temperature (°C)',
                },
                max: 100,
                labels: {
                    formatter: (value) => value.toFixed(0), // Show whole numbers
                },
            },
            legend: {
                show: true,
                position: 'top',
            },
        },
    });

    const [hotFluidTemp, setHotFluidTemp] = useState(0);
    const [coldFluidTemp, setColdFluidTemp] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newLabel = data.options.xaxis.categories.length > 0
                ? data.options.xaxis.categories[data.options.xaxis.categories.length - 1] + 1
                : 1;
            const newHotTemperature = Math.random() * 100;
            const newColdTemperature = Math.random() * 50;

            setHotFluidTemp(newHotTemperature);
            setColdFluidTemp(newColdTemperature);

            setData((prevData) => {
                const updatedCategories = prevData.options.xaxis.categories.length >= maxDataPoints
                    ? prevData.options.xaxis.categories.slice(1).concat(newLabel) // Remove the first element if max points reached
                    : prevData.options.xaxis.categories.concat(newLabel); // Add new label

                const updatedHotData = prevData.series[0].data.length >= maxDataPoints
                    ? prevData.series[0].data.slice(1).concat(newHotTemperature) // Remove the first element if max points reached
                    : prevData.series[0].data.concat(newHotTemperature); // Add new temperature

                const updatedColdData = prevData.series[1].data.length >= maxDataPoints
                    ? prevData.series[1].data.slice(1).concat(newColdTemperature) // Remove the first element if max points reached
                    : prevData.series[1].data.concat(newColdTemperature); // Add new temperature

                if (newHotTemperature > thresholdValue) {
                    toast.error(`Hot Fluid Temperature exceeded threshold! Current: ${newHotTemperature.toFixed(2)}°C`);
                }

                return {
                    ...prevData,
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: updatedCategories, // Update categories
                        },
                    },
                    series: [
                        { ...prevData.series[0], data: updatedHotData }, // Update hot fluid data
                        { ...prevData.series[1], data: updatedColdData }, // Update cold fluid data
                    ],
                };
            });
        }, 1000); // Update every 100ms for continuous flow

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [data]);

    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="content">
                    <FluidValues hotFluidTemp={hotFluidTemp} coldFluidTemp={coldFluidTemp} thresholdValue={thresholdValue} /> {/* Pass threshold value */}
                    <ReactApexChart options={data.options} series={data.series} type="line" height={350} width={700} />
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} newestOnTop closeOnClick pauseOnHover draggable pauseOnFocusLoss />
        </div>
    );
};

export default App;


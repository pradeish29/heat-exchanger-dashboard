import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Navbar from './components/Navbar';
import FluidValues from './components/FluidValues';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import Papa from 'papaparse';
import './App.css';

const App = () => {
    const maxDataPoints = 7; // Set max data points
    const thresholdValue = 50; // Set your threshold value here
    const [dataIn, setDataIn] = useState({
        series: [
            {
                name: 'Hot Fluid In',
                data: [],
            },
            {
                name: 'Hot Fluid Out',
                data: [],
            },
        ],
        options: {
            chart: {
                id: 'HotChart',
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000,
                    },
                },
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
                background: '#2c3e50', // Dark background color
            },
            stroke: {
                curve: 'smooth', // Ensure smooth curves
                width: 2, // Line thickness
            },
            markers: {
                size: 1,
            },
            colors: ['#FF5733', '#3498db'], // Hot Fluid In (orange-red), Cold Fluid In (light blue)
            grid: {
                borderColor: '#e74c3c', // Red-colored grid lines
                strokeDashArray: 4, // Dashed grid lines
            },
            scales: {
                y: {
                    min: 0,        // Minimum value of Y-axis
                    max: 100,      // Maximum value of Y-axis
                    title: {
                        display: true,
                        text: 'Pressure Drop (%)', // Optional: label for Y-axis
                    },
                    ticks: {
                        stepSize: 5, // Optional: interval for tick marks
                    },
                },
            },
            xaxis: {
                title: {
                    text: 'Data Points',
                    style: {
                        color: '#ecf0f1', // White font for axis title
                        fontWeight: 'bold',
                    },
                    
                },
                labels: {
                    style: {
                        colors: '#ecf0f1', // White font for labels
                    },
                },
                categories: [], // Dynamic categories
            },
            yaxis: {
                title: {
                    text: 'Temperature (°C)',
                    style: {
                        color: '#ecf0f1', // White font for axis title
                        fontWeight: 'bold',
                    },
                },
                labels: {
                    style: {
                        colors: '#ecf0f1', // White font for labels
                    },
                    formatter: (value) => value.toFixed(0),
                },
            },
            tooltip: {
                theme: 'dark', // Dark tooltip theme
                style: {
                    fontSize: '14px',
                },
                x: {
                    show: true,
                },
                y:{
                    show:true,
                },
            },
            legend: {
                show: true,
                position: 'top',
                labels: {
                    colors: '#ecf0f1', // White font for legend labels
                },
            },
        },
    });

    const [dataOut, setDataOut] = useState({
        series: [
            {
                name: 'Cold Fluid In',
                data: [],
            },
            {
                name: 'Cold Fluid Out',
                data: [],
            },
        ],
        options: {
            chart: {
                id: 'ColdChart',
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000,
                    },
                },
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
                background: '#2c3e50', // Dark background color
            },
            stroke: {
                curve: 'smooth', // Ensure smooth curves
                width: 2, // Line thickness
            },
            markers: {
                size: 1,
            },
            colors: ['#e74c3c', '#2980b9'], // Hot Fluid Out (red), Cold Fluid Out (dark blue)
            grid: {
                borderColor: '#e74c3c', // Red-colored grid lines
                strokeDashArray: 4, // Dashed grid lines
            },
            xaxis: {
                title: {
                    text: 'Data Points',
                    style: {
                        color: '#ecf0f1', // White font for axis title
                        fontWeight: 'bold',
                    },
                },
                labels: {
                    style: {
                        colors: '#ecf0f1', // White font for labels
                    },
                },
                categories: [], // Dynamic categories
            },
            yaxis: {
                title: {
                    text: 'Temperature (°C)',
                    style: {
                        color: '#ecf0f1', // White font for axis title
                        fontWeight: 'bold',
                    },
                },
                labels: {
                    style: {
                        colors: '#ecf0f1', // White font for labels
                    },
                    formatter: (value) => value.toFixed(0),
                },
            },
            tooltip: {
                theme: 'dark', // Dark tooltip theme
                style: {
                    fontSize: '14px',
                },
                x: {
                    show: true,
                },
            },
            legend: {
                show: true,
                position: 'top',
                labels: {
                    colors: '#ecf0f1', // White font for legend labels
                },
            },
        },
    });
    
        // Updated graph for Pressure Drop vs. Flow Rate
        const [dataPressureFlow, setDataPressureFlow] = useState({
            series: [
                {
                    name: 'Flow Rate vs Hot Fluid Out',
                    data: [],
                },
            ],
            options: {
                chart: {
                    id: 'pressureFlowChart',
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000,
                        },
                    },
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                    background: '#2c3e50', // Dark background color
                },
                stroke: {
                    curve: 'smooth', // Ensure smooth curves
                    width: 2, // Line thickness
                },
                markers: {
                    size: 1,
                },
                colors: ['#e74c3c'], // Color for the line (red)
                grid: {
                    borderColor: '#e74c3c', // Red-colored grid lines
                    strokeDashArray: 4, // Dashed grid lines
                },
                xaxis: {
                    title: {
                        text: 'Hot Fluid Out (°C)',  // Now Hot Fluid Out is on the x-axis
                        style: {
                            color: '#ecf0f1', // White font for axis title
                            fontWeight: 'bold',
                        },
                    },
                    labels: {
                        style: {
                            colors: '#ecf0f1', // White font for labels
                        },
                    },
                    categories: [], // Categories for Hot Fluid Out, will be dynamically updated
                },
                yaxis: {
                    title: {
                        text: 'Flow Rate (L/min)',  // Now Flow Rate is on the y-axis
                        style: {
                            color: '#ecf0f1', // White font for axis title
                            fontWeight: 'bold',
                        },
                    },
                    labels: {
                        style: {
                            colors: '#ecf0f1', // White font for labels
                        },
                        formatter: (value) => value.toFixed(0),
                    },
                },
            },
        });
    
        // New graph for Pressure Drop vs Data Points
        const [dataPressureDrop, setDataPressureDrop] = useState({
            series: [
                {
                    name: 'Pressure Drop (kPa)',
                    data: [],
                },
            ],
            options: {
                chart: {
                    id: 'pressureDropChart',
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000,
                        },
                    },
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                    background: '#2c3e50', // Dark background color
                },
                stroke: {
                    curve: 'smooth', // Ensure smooth curves
                    width: 2, // Line thickness
                },
                markers: {
                    size: 1,
                },
                colors: ['#3498db'], // Pressure Drop (blue)
                grid: {
                    borderColor: '#e74c3c', // Red-colored grid lines
                    strokeDashArray: 4, // Dashed grid lines
                },
                xaxis: {
                    title: {
                        text: 'Data Points',
                        style: {
                            color: '#ecf0f1', // White font for axis title
                            fontWeight: 'bold',
                        },
                    },
                    labels: {
                        style: {
                            colors: '#ecf0f1', // White font for labels
                        },
                    },
                    categories: [], // Dynamic categories (make sure to populate this)
                },
                yaxis: {
                    title: {
                        text: 'Pressure Drop (kPa)',
                        style: {
                            color: '#ecf0f1', // White font for axis title
                            fontWeight: 'bold',
                        },
                    },
                    labels: {
                        style: {
                            colors: '#ecf0f1', // White font for labels
                        },
                        formatter: (value) => value.toFixed(0),
                    },
                },
            },
        });
    
    
    const [csvData, setCsvData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadCsvData = async () => {
            try {
                const response = await fetch('/Data.csv');
                const csvText = await response.text();

                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        const parsedData = results.data.map(row => ({
                            hotFluidIn: parseFloat(row.hotFluidIn),
                            coldFluidIn: parseFloat(row.coldFluidIn),
                            hotFluidOut: parseFloat(row.hotFluidOut),
                            coldFluidOut: parseFloat(row.coldFluidOut),
                            flowRate: parseFloat(row.flowRate),
                            fouling: parseFloat(row.fouling),
                            pressureDrop: parseFloat(row.pressureDrop),

                        })).filter(row => !isNaN(row.hotFluidIn) && !isNaN(row.coldFluidIn));

                        setCsvData(parsedData);
                    },
                });
            } catch (error) {
                console.error('Error loading CSV:', error);
            }
        };

        loadCsvData();
    }, []);

    useEffect(() => {
        if (csvData.length === 0) return;

        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % csvData.length;
                const newHotFluidIn = csvData[newIndex].hotFluidIn;
                const newColdFluidIn = csvData[newIndex].coldFluidIn;
                const newHotFluidOut = csvData[newIndex].hotFluidOut;
                const newColdFluidOut = csvData[newIndex].coldFluidOut;
                const flowRate = csvData[newIndex].flowRate
                const fouling = csvData[newIndex].fouling;
                const pressureDrop = csvData[newIndex].pressureDrop;
                

                // Trigger a toast if the temperature exceeds the threshold
                if (newHotFluidOut > 60  || newHotFluidOut < 40 ) {
                    toast.warning(`Warning: Temperature exceeded threshold of ${thresholdValue}°C!`);
                }
                if (flowRate > 2 || flowRate < 2 ) {
                    toast.warning(`Warning: Flow Rate changed from desired Rate of 2 L/Min`);
                }
                if (pressureDrop > 30 || pressureDrop < 10 ) {
                    toast.warning(`Warning: Pressure has changed from desired Value of 10-30 Ns/m²`);
                }


                setDataIn(prevData => {
                    const updatedHotFluidIn = [...prevData.series[0].data, newHotFluidIn].slice(-maxDataPoints);
                    const updatedHotFluidOut = [...prevData.series[1].data, newHotFluidOut].slice(-maxDataPoints);
                    const labels = Array.from({ length: updatedHotFluidIn.length }, (_, i) => i + 1);
                
                    return {
                        ...prevData,
                        series: [
                            { name: 'Hot Fluid In', data: updatedHotFluidIn },
                            { name: 'Hot Fluid Out', data: updatedHotFluidOut },
                        ],
                        options: {
                            ...prevData.options,
                            xaxis: {
                                ...prevData.options.xaxis,
                                categories: labels,
                            },
                        },
                    };
                });
                
                // Update for Second Graph (Cold Fluid: In vs. Out)
                setDataOut(prevData => {
                    const updatedColdFluidIn = [...prevData.series[0].data, newColdFluidIn].slice(-maxDataPoints);
                    const updatedColdFluidOut = [...prevData.series[1].data, newColdFluidOut].slice(-maxDataPoints);
                    const labels = Array.from({ length: updatedColdFluidIn.length }, (_, i) => i + 1);
                
                    return {
                        ...prevData,
                        series: [
                            { name: 'Cold Fluid In', data: updatedColdFluidIn },
                            { name: 'Cold Fluid Out', data: updatedColdFluidOut },
                        ],
                        options: {
                            ...prevData.options,
                            xaxis: {
                                ...prevData.options.xaxis,
                                categories: labels,
                            },
                        },
                    };
                });

                // const dataPressureFlow = (newFlowRate, newHotFluidOut) => {
                    setDataPressureFlow((prevData) => {
                        const updatedHotFluidOuts = [...prevData.series[0].data.map(d => d.x), newHotFluidOut].slice(-maxDataPoints);
                        const updatedFlowRates = [...prevData.series[0].data.map(d => d.y), flowRate].slice(-maxDataPoints);
                        
                        // Combine the hot fluid out and flow rate into an array of objects
                        const updatedData = updatedHotFluidOuts.map((hotFluidOut, index) => ({
                            x: hotFluidOut,
                            y: updatedFlowRates[index] || 0, // Default to 0 if there’s no corresponding value
                        }));
                
                        return {
                            ...prevData,
                            series: [{ name: 'Flow Rate vs Hot Fluid Out', data: updatedData }],
                            options: {
                                ...prevData.options,
                                xaxis: {
                                    ...prevData.options.xaxis,
                                    categories: updatedHotFluidOuts.map(out => out.toString()), // Update categories based on Hot Fluid Out values
                                },
                            },
                        };
                    });
                

               
                // Updating Pressure Drop graph
                setDataPressureDrop((prevData) => {
                    const updatedPressureDrop = [...prevData.series[0].data, pressureDrop].slice(-maxDataPoints);
                    const labels = Array.from({ length: updatedPressureDrop.length }, (_, i) => i + 1);

                    return {
                        ...prevData,
                        series: [{ name: 'Pressure Drop (kPa)', data: updatedPressureDrop }],
                        options: {
                            ...prevData.options,
                            xaxis: {
                                ...prevData.options.xaxis,
                                categories: labels,
                            },
                        },
                    };
                });
                
              

                return newIndex;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [csvData, maxDataPoints, thresholdValue]);

    return (
        <div className="app">
            <div className="main-content">
                <Navbar />
                <FluidValues 
                    hotFluidIn={csvData[currentIndex]?.hotFluidIn} 
                    coldFluidIn={csvData[currentIndex]?.coldFluidIn} 
                    hotFluidOut={csvData[currentIndex]?.hotFluidOut} 
                    coldFluidOut={csvData[currentIndex]?.coldFluidOut} 
                    flowRate={csvData[currentIndex]?.flowRate}
                    fouling={csvData[currentIndex]?.fouling} 
                    pressureDrop={csvData[currentIndex]?.pressureDrop}
                    thresholdValue= {thresholdValue}
                />
                <div className="content">
                    <ReactApexChart
                        options={dataIn.options}
                        series={dataIn.series}
                        type="line"
                        height={350}
                        width={650}
                    />
                    <ReactApexChart
                        options={dataOut.options}
                        series={dataOut.series}
                        type="line"
                        height={350}
                        width={650}
                    />
                </div>
                <div className="content">
                    <ReactApexChart 
                    options={dataPressureFlow.options} 
                    series={dataPressureFlow.series} 
                    type="line" 
                    height={350} 
                    width={650}
                    />
                    
                    <ReactApexChart
                        options={dataPressureDrop.options}
                        series={dataPressureDrop.series}
                        type="line"
                        height="350"
                        width={650}
                    />
                    
                </div>
            </div>
            <ToastContainer theme="dark" position="top-right" autoClose={2000} hideProgressBar={true} newestOnTop closeOnClick pauseOnHover draggable pauseOnFocusLoss/> {/* Add the ToastContainer component to render the toast alerts */}
        </div>
    );
};

export default App;


// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import Navbar from './components/Navbar';
// import FluidValues from './components/FluidValues';
// import { ToastContainer, toast } from 'react-toastify'; // Import toast
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
// import Papa from 'papaparse';
// import './App.css';

// const App = () => {
//     const maxDataPoints = 7; // Set max data points
//     const thresholdValue = 50; // Set your threshold value here
//     const [dataIn, setDataIn] = useState({
//         series: [
//             {
//                 name: 'Hot Fluid In',
//                 data: [],
//             },
//             {
//                 name: 'Hot Fluid Out',
//                 data: [],
//             },
//         ],
//         options: {
//             chart: {
//                 id: 'HotChart',
//                 type: 'line',
//                 animations: {
//                     enabled: true,
//                     easing: 'linear',
//                     dynamicAnimation: {
//                         speed: 1000,
//                     },
//                 },
//                 toolbar: {
//                     show: false,
//                 },
//                 zoom: {
//                     enabled: false,
//                 },
//                 background: '#2c3e50', // Dark background color
//             },
//             stroke: {
//                 curve: 'smooth', // Ensure smooth curves
//                 width: 2, // Line thickness
//             },
//             markers: {
//                 size: 1,
//             },
//             colors: ['#FF5733', '#3498db'], // Hot Fluid In (orange-red), Cold Fluid In (light blue)
//             grid: {
//                 borderColor: '#e74c3c', // Red-colored grid lines
//                 strokeDashArray: 4, // Dashed grid lines
//             },
//             xaxis: {
//                 title: {
//                     text: 'Data Points',
//                     style: {
//                         color: '#ecf0f1', // White font for axis title
//                         fontWeight: 'bold',
//                     },
//                 },
//                 labels: {
//                     style: {
//                         colors: '#ecf0f1', // White font for labels
//                     },
//                 },
//                 categories: [], // Dynamic categories
//             },
//             yaxis: {
//                 title: {
//                     text: 'Temperature (°C)',
//                     style: {
//                         color: '#ecf0f1', // White font for axis title
//                         fontWeight: 'bold',
//                     },
//                 },
//                 labels: {
//                     style: {
//                         colors: '#ecf0f1', // White font for labels
//                     },
//                     formatter: (value) => value.toFixed(0),
//                 },
//             },
//             tooltip: {
//                 theme: 'dark', // Dark tooltip theme
//                 style: {
//                     fontSize: '14px',
//                 },
//                 x: {
//                     show: true,
//                 },
//             },
//             legend: {
//                 show: true,
//                 position: 'top',
//                 labels: {
//                     colors: '#ecf0f1', // White font for legend labels
//                 },
//             },
//         },
//     });

//     const [dataOut, setDataOut] = useState({
//         series: [
//             {
//                 name: 'Cold Fluid In',
//                 data: [],
//             },
//             {
//                 name: 'Cold Fluid Out',
//                 data: [],
//             },
//         ],
//         options: {
//             chart: {
//                 id: 'ColdChart',
//                 type: 'line',
//                 animations: {
//                     enabled: true,
//                     easing: 'linear',
//                     dynamicAnimation: {
//                         speed: 1000,
//                     },
//                 },
//                 toolbar: {
//                     show: false,
//                 },
//                 zoom: {
//                     enabled: false,
//                 },
//                 background: '#2c3e50', // Dark background color
//             },
//             stroke: {
//                 curve: 'smooth', // Ensure smooth curves
//                 width: 2, // Line thickness
//             },
//             markers: {
//                 size: 1,
//             },
//             colors: ['#e74c3c', '#2980b9'], // Hot Fluid Out (red), Cold Fluid Out (dark blue)
//             grid: {
//                 borderColor: '#e74c3c', // Red-colored grid lines
//                 strokeDashArray: 4, // Dashed grid lines
//             },
//             xaxis: {
//                 title: {
//                     text: 'Data Points',
//                     style: {
//                         color: '#ecf0f1', // White font for axis title
//                         fontWeight: 'bold',
//                     },
//                 },
//                 labels: {
//                     style: {
//                         colors: '#ecf0f1', // White font for labels
//                     },
//                 },
//                 categories: [], // Dynamic categories
//             },
//             yaxis: {
//                 title: {
//                     text: 'Temperature (°C)',
//                     style: {
//                         color: '#ecf0f1', // White font for axis title
//                         fontWeight: 'bold',
//                     },
//                 },
//                 labels: {
//                     style: {
//                         colors: '#ecf0f1', // White font for labels
//                     },
//                     formatter: (value) => value.toFixed(0),
//                 },
//             },
//             tooltip: {
//                 theme: 'dark', // Dark tooltip theme
//                 style: {
//                     fontSize: '14px',
//                 },
//                 x: {
//                     show: true,
//                 },
//             },
//             legend: {
//                 show: true,
//                 position: 'top',
//                 labels: {
//                     colors: '#ecf0f1', // White font for legend labels
//                 },
//             },
//         },
//     });

//     // Updated graph for Pressure Drop vs. Flow Rate
//     const [dataPressureFlow, setDataPressureFlow] = useState({
//         series: [
//             {
//                 name: 'Hot Fluid Out vs Flow Rate',
//                 data: [],
//             },
//         ],
//         options: {
//             chart: {
//                 id: 'pressureFlowChart',
//                 type: 'line',
//                 animations: {
//                     enabled: true,
//                     easing: 'linear',
//                     dynamicAnimation: {
//                         speed: 1000,
//                     },
//                 },
//                 toolbar: {
//                     show: false,
//                 },
//                 zoom: {
//                     enabled: false,
//                 },
//                 background: '#2c3e50', // Dark background color
//             },
//             stroke: {
//                 curve: 'smooth', // Ensure smooth curves
//                 width: 2, // Line thickness
//             },
//             markers: {
//                 size: 1,
//             },
//             colors: ['#e74c3c'], // Hot Fluid Out vs Flow Rate (red)
//             grid: {
//                 borderColor: '#e74c3c', // Red-colored grid lines
//                 strokeDashArray: 4, // Dashed grid lines
//             },
//             xaxis: {
//                 title: {
//                     text: 'Flow Rate (L/min)',  // Stable axis labels
//                     style: {
//                         color: '#ecf0f1', // White font for axis title
//                         fontWeight: 'bold',
//                     },
//                 },
//                 labels: {
//                     style: {
//                         colors: '#ecf0f1', // White font for labels
//                     },
//                 },
//                 categories: ['1', '2', '3', '4', '5', '6'], // Stable values for flow rate
//             },
//             yaxis: {
//                 title: {
//                     text: 'Hot Fluid Out (°C)',
//                     style: {
//                         color: '#ecf0f1', // White font for axis title
//                         fontWeight: 'bold',
//                     },
//                 },
//                 labels: {
//                     style: {
//                         colors: '#ecf0f1', // White font for labels
//                     },
//                     formatter: (value) => value.toFixed(0),
//                 },
//             },
//         },
//     });

//     // New graph for Pressure Drop vs Data Points
//     const [dataPressureDrop, setDataPressureDrop] = useState({
//         series: [
//             {
//                 name: 'Pressure Drop (kPa)',
//                 data: [],
//             },
//         ],
//         options: {
//             chart: {
//                 id: 'pressureDropChart',
//                 type: 'line',
//                 animations: {
//                     enabled: true,
//                     easing: 'linear',
//                     dynamicAnimation: {
//                         speed: 1000,
//                     },
//                 },
//                 toolbar: {
//                     show: false,
//                 },
//                 zoom: {
//                     enabled: false,
//                 },
//                 background: '#2c3e50', // Dark background color
//             },
//             stroke: {
//                 curve: 'smooth', // Ensure smooth curves
//                 width: 2, // Line thickness
//             },
//             markers: {
//                 size: 1,
//             },
//             colors: ['#3498db'], // Pressure Drop (blue)
//             grid: {
//                 borderColor: '#e74c3c', // Red-colored grid lines
//                 strokeDashArray: 4, // Dashed grid lines
//             },
//             xaxis: {
//                 title: {
//                     text: 'Data Points',
//                     style: {
//                         color: '#ecf0f1', // White font for axis title
//                         fontWeight: 'bold',
//                     },
//                 },
//                 labels: {
//                     style: {
//                         colors: '#ecf0f1', // White font for labels
//                     },
//                 },
//                 categories: [], // Dynamic categories (make sure to populate this)
//             },
//             yaxis: {
//                 title: {
//                     text: 'Pressure Drop (kPa)',
//                     style: {
//                         color: '#ecf0f1', // White font for axis title
//                         fontWeight: 'bold',
//                     },
//                 },
//                 labels: {
//                     style: {
//                         colors: '#ecf0f1', // White font for labels
//                     },
//                     formatter: (value) => value.toFixed(0),
//                 },
//             },
//         },
//     });

//     // Function to handle CSV data
//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         Papa.parse(file, {
//             complete: (result) => {
//                 const csvData = result.data;

//                 const hotFluidIn = [];
//                 const hotFluidOut = [];
//                 const coldFluidIn = [];
//                 const coldFluidOut = [];
//                 const pressureDrop = []; // Add pressure drop data
//                 const categories = [];

//                 csvData.forEach((row, index) => {
//                     hotFluidIn.push(parseFloat(row[0]));
//                     hotFluidOut.push(parseFloat(row[1]));
//                     coldFluidIn.push(parseFloat(row[2]));
//                     coldFluidOut.push(parseFloat(row[3]));
//                     pressureDrop.push(parseFloat(row[4])); // Assume 5th column is pressure drop

//                     categories.push(`Data Point ${index + 1}`);
//                 });

//                 setDataIn((prevState) => ({
//                     ...prevState,
//                     series: [
//                         { name: 'Hot Fluid In', data: hotFluidIn },
//                         { name: 'Hot Fluid Out', data: hotFluidOut },
//                     ],
//                     options: {
//                         ...prevState.options,
//                         xaxis: { ...prevState.options.xaxis, categories },
//                     },
//                 }));

//                 setDataOut((prevState) => ({
//                     ...prevState,
//                     series: [
//                         { name: 'Cold Fluid In', data: coldFluidIn },
//                         { name: 'Cold Fluid Out', data: coldFluidOut },
//                     ],
//                     options: {
//                         ...prevState.options,
//                         xaxis: { ...prevState.options.xaxis, categories },
//                     },
//                 }));

//                 setDataPressureDrop((prevState) => ({
//                     ...prevState,
//                     series: [{ name: 'Pressure Drop (kPa)', data: pressureDrop }],
//                     options: {
//                         ...prevState.options,
//                         xaxis: { ...prevState.options.xaxis, categories },
//                     },
//                 }));
//             },
//         });
//     };

//     return (
//         <div>
//             <Navbar />
//             <FluidValues />
//             <div className="main-content">
//                 <div className="content">
//                     <ReactApexChart
//                         options={dataIn.options}
//                         series={dataIn.series}
//                         type="line"
//                         height="350"
//                     />
//                 </div>
//                 <div className="content">
//                     <ReactApexChart
//                         options={dataOut.options}
//                         series={dataOut.series}
//                         type="line"
//                         height="350"
//                     />
//                 </div>
//                 <div className="content">
//                     <ReactApexChart
//                         options={dataPressureFlow.options}
//                         series={dataPressureFlow.series}
//                         type="line"
//                         height="350"
//                     />
//                 </div>
//                 <div className="content">
//                     <ReactApexChart
//                         options={dataPressureDrop.options}
//                         series={dataPressureDrop.series}
//                         type="line"
//                         height="350"
//                     />
//                 </div>
//             </div>
//             <input type="file" onChange={handleFileUpload} />
//             <ToastContainer />
//         </div>
//     );
// };

// export default App;

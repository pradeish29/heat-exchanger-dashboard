// // src/components/FluidValues.js
// import React from 'react';
// import './FluidValues.css';

// const FluidValues = ({ hotFluidTemp, coldFluidTemp, thresholdValue }) => {
//     return (
//         <div className="fluid-values">
//             <div className="hot-fluid">
//                 <h3>Hot Fluid Temperature</h3>
//                 <p>{hotFluidTemp.toFixed(2)} °C</p>
//             </div>
//             <div className="cold-fluid">
//                 <h3>Cold Fluid Temperature</h3>
//                 <p>{coldFluidTemp.toFixed(2)} °C</p>
//             </div>
//             <div className="threshold">
//                 <h3>Threshold Value</h3>
//                 <p>{thresholdValue} </p> {/* New threshold value display */}
//             </div>
//             <div className="threshold">
//                 <h3>Mass Flow Rate</h3>
//                 <p>1 kg/s</p> {/* New threshold value display */}
//             </div>
//             <div className="threshold">
//                 <h3>Pressure Drop</h3>
//                 <p>12 Ns/m2</p> {/* New threshold value display */}
//             </div>
//         </div>
//     );
// };

// export default FluidValues;
// src/components/FluidValues.js
import React from 'react';
import './FluidValues.css';

const FluidValues = ({ hotFluidIn, coldFluidIn, hotFluidOut, coldFluidOut,flowRate,fouling,pressureDrop, thresholdValue }) => {
    return (
        <div className="fluid-values">
            <div className="fluid">
                <h4>Hot Fluid In Temperature</h4>
                <p>{hotFluidIn ? hotFluidIn.toFixed(2) : 'Loading...'} °C</p>
            </div>
            <div className="fluid">
                <h4>Hot Fluid Out Temperature</h4>
                <p>{hotFluidOut ? hotFluidOut.toFixed(2) : 'Loading...'} °C</p>
            </div>
            <div className="fluid">
                <h4>Cold Fluid In Temperature</h4>
                <p>{coldFluidIn ? coldFluidIn.toFixed(2) : 'Loading...'} °C</p>
            </div>
            <div className="fluid">
                <h4>Cold Fluid Out Temperature</h4>
                <p>{coldFluidOut ? coldFluidOut.toFixed(2) : 'Loading...'} °C</p>
            </div>
            <div className="fluid">
                <h4>Threshold Value</h4>
                <p>{thresholdValue} °C</p>
            </div>
            <div className="fluid">
                <h4>Mass Flow Rate</h4>
                <p>{flowRate ? flowRate.toFixed(2): 'Loading...'} L/Min</p> {/* Static example value */}
            </div>
            <div className="fluid">
                <h4>Pressure Drop</h4>
                <p>{pressureDrop ? pressureDrop.toFixed(2) : 'Loading...'} kPa</p> {/* Static example value */}
            </div>
            {/* <div className="fluid">
                <h4>Fouling</h4>
                <p>{fouling ? fouling.toFixed(2): 'Loading...'} %</p> {/* Static example value 
            </div> */}
        </div>
    );
};

export default FluidValues;

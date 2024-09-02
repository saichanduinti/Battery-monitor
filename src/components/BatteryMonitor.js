// // src/components/BatteryMonitor.js
// import React, { useState, useEffect } from 'react';

// const BatteryMonitor = () => {
//   const [battery, setBattery] = useState({
//     level: 1,
//     charging: false,
//     chargingTime: 0,
//     dischargingTime: Infinity
//   });

//   useEffect(() => {
//     const updateBatteryStatus = async () => {
//       try {
//         const battery = await navigator.getBattery();
//         setBattery({
//           level: battery.level,
//           charging: battery.charging,
//           chargingTime: battery.chargingTime,
//           dischargingTime: battery.dischargingTime
//         });
//       } catch (error) {
//         console.error("Error getting battery status:", error);
//       }
//     };

//     updateBatteryStatus();
//     const intervalId = setInterval(updateBatteryStatus, 60000); // Update every minute

//     return () => clearInterval(intervalId); // Cleanup interval on unmount
//   }, []);

//   return (
//     <div>
//       <h1>Battery Status</h1>
//       <p>Battery Level: {Math.round(battery.level * 100)}%</p>
//       <p>Charging: {battery.charging ? 'Yes' : 'No'}</p>
//       <p>Charging Time: {battery.chargingTime} seconds</p>
//       <p>Discharging Time: {battery.dischargingTime} seconds</p>
//     </div>
//   );
// };

// export default BatteryMonitor;


// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [battery, setBattery] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    const updateBatteryStatus = async () => {
      try {
        const battery = await navigator.getBattery();
        setBattery({
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        });
      } catch (error) {
        console.error("Error getting battery status:", error);
      }
    };

    const updatePerformanceData = () => {
      const { memory } = performance;
      setPerformanceData({
        memory: memory ? memory.jsHeapSizeLimit / (1024 ** 2) : 'N/A',
        totalMemory: memory ? memory.totalJSHeapSize / (1024 ** 2) : 'N/A',
        usedMemory: memory ? memory.usedJSHeapSize / (1024 ** 2) : 'N/A',
      });
    };

    updateBatteryStatus();
    updatePerformanceData();
    const intervalId = setInterval(() => {
      updateBatteryStatus();
      updatePerformanceData();
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Battery and Performance Monitor</h1>
        {battery && (
          <div>
            <h2>Battery Status</h2>
            <p>Battery Level: {Math.round(battery.level * 100)}%</p>
            <p>Charging: {battery.charging ? 'Yes' : 'No'}</p>
            <p>Charging Time: {battery.chargingTime} seconds</p>
            <p>Discharging Time: {battery.dischargingTime} seconds</p>
          </div>
        )}
        {performanceData && (
          <div>
            <h2>Performance Metrics</h2>
            <p>Memory Limit: {performanceData.memory} MB</p>
            <p>Total Memory: {performanceData.totalMemory} MB</p>
            <p>Used Memory: {performanceData.usedMemory} MB</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;

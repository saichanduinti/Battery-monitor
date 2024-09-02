// src/components/BatteryMonitor.js
import React, { useState, useEffect } from 'react';

const BatteryMonitor = () => {
  const [battery, setBattery] = useState({
    level: 1,
    charging: false,
    chargingTime: 0,
    dischargingTime: Infinity
  });

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

    updateBatteryStatus();
    const intervalId = setInterval(updateBatteryStatus, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h1>Battery Status</h1>
      <p>Battery Level: {Math.round(battery.level * 100)}%</p>
      <p>Charging: {battery.charging ? 'Yes' : 'No'}</p>
      <p>Charging Time: {battery.chargingTime} seconds</p>
      <p>Discharging Time: {battery.dischargingTime} seconds</p>
    </div>
  );
};

export default BatteryMonitor;

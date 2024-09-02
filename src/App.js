import logo from './logo.svg';
import './App.css';
import React from 'react';
import BatteryMonitor from './components/BatteryMonitor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BatteryMonitor />
      </header>
    </div>
  );
}

export default App;

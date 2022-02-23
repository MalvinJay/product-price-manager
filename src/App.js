import React from 'react';
import './App.css';

// Components
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <Header title="MPharma FrontEnd Challenge" />
      <Homepage />
    </div>
  );
}

export default App;

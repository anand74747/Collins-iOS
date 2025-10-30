import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScannerPage from "./pages/ScannerPage";
import ResultsPage from "./pages/ResultsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<ScannerPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

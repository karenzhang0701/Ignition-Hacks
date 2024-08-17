import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MainPage from './components/MainPage';
import ArticleSummary from './components/ArticleSummary';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/summary" element={<ArticleSummary />} />
      </Routes>
    </Router>
  );
}

export default App;

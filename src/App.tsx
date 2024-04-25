/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/landing';
import Pokemon from './pages/pokemon'


const App=()=> {
 
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/pokemon" element={<Pokemon/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;

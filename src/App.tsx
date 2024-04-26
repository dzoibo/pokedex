/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/landing';
import Pokemon from './pages/pokemon'
import AOS from "aos";
import "aos/dist/aos.css";


const App=()=> {
    useEffect(() => {
      AOS.init({
        duration: 500,
        easing: "ease-out-cubic",
        anchorPlacement: "bottom-bottom"
      });
      AOS.refresh();
    }, []);

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

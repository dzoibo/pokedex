/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/landing';
import Pokemon from './pages/pokemon';
import Abilities from './pages/abilities';
import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from 'react-redux';
import store from './redux/store';

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
    <Provider store = {store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/pokemon" element={<Pokemon/>}/>
            <Route path="/abilities" element={<Abilities/>}/>
          </Routes>

        </div>
      </Router>  
    </Provider>
    
    
  );
}

export default App;

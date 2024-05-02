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
          <div className='px-8 py-8 xl:px-36 2xl:px-44 w-full relative'>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/pokemon" element={<Pokemon/>}/>
              <Route path="/abilities" element={<Abilities/>}/>
            </Routes>
            <a className="mt-10 block font-semibold text-white rounded px-4 py-2 md:w-fit bg-black" href="https://twitter.com/ivan_dzoibo" target="_blank" rel="noreferrer">© By Dzoibo ivan</a>

          </div>
        </div>
      </Router>  
    </Provider>
    
    
  );
}

export default App;

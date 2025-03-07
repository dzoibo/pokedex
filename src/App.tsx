/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/landing';
import Pokemon from './pages/pokemon';
import Abilities from './pages/abilities';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import PokemonInfo from './pages/pokemon-infos'
import Notfound from './pages/notFound';
import AOS from "aos";
import "aos/dist/aos.css";
import Moves from './pages/moves';
import Items from './pages/items';

const App=()=> {
    useEffect(() => {
      AOS.init({
        duration: 500,
        easing: "ease-out-cubic",
        anchorPlacement: "bottom-bottom"
      });
      AOS.refresh();
    }, []);
    const paddingStyle='px-8 py-8 xl:px-36 2xl:px-44 w-full relative';

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div >
            <Routes>
              <Route path="/" element={<Home padding={paddingStyle}/>}/>
              <Route path="/pokemons" element={<Pokemon padding={paddingStyle}/>}/>
              <Route path="/pokemons/:pokemonId" element={<PokemonInfo padding={paddingStyle}/>} />
              <Route path="/abilities" element={<Abilities padding={paddingStyle}/>}/>
              <Route path="/moves"  element={<Moves padding={paddingStyle}/>}/>
              <Route path="/items"  element={<Items padding={paddingStyle}/>}/>
              <Route path="/*" element={<Notfound/>}/>
            </Routes>
          </div>
        </div>
      </Router>  
    </Provider>
    
  );
}

export default App;

import pokemonReducer from "./pokemon/reducerPokemon";
import { createStore } from "redux";

const store =createStore(pokemonReducer);
export default store;
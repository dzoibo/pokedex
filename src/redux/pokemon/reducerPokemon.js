import { Pokemon } from "../../services/interfaces";
import { LOAD_POKEMON,LOAD_ABILITIES,LOAD_ITEMS,LOAD_MOVES,SELECT_POKEMON } from "./type";

const initialState = {
    selectedPokemon : undefined,
    pokemonList: [],
    abilityList: []
}

const pokemonReducer = (state = initialState, action) => {
    if(localStorage.getItem('pokemonList')){
        state.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
    }
    switch (action.type) {

        case SELECT_POKEMON:
            return {
                ...state,
                selectedPokemon: action.payload
            }

        case LOAD_POKEMON:
            localStorage.setItem('booksData',JSON.stringify(action.payload));
            return {
                ...state,
                pokemonList: action.payload
            }
        case LOAD_ABILITIES:
            return{
                ...state,
                abilityList: action.payload
            }
        default: return state
    }
}
export default pokemonReducer
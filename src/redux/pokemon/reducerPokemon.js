import { Pokemon } from "../../services/interfaces";
import { loadItems } from "./actionPokemon";
import { LOAD_POKEMON,LOAD_ABILITIES,LOAD_ITEMS,LOAD_MOVES,SELECT_POKEMON } from "./type";
import pokemonData from '../../assets/data/pokemons.json';
import movesData from '../../assets/data/moves.json';

const initialState = {
    selectedPokemon : undefined,
    pokemonList: pokemonData,
    abilityList: [],
    moveList: movesData,
    itemList: [],
}

const pokemonReducer = (state = initialState, action) => {
    

    switch (action.type) {

        case SELECT_POKEMON:
            return {
                ...state,
                selectedPokemon: action.payload
            }

        case LOAD_POKEMON:
            return {
                ...state,
                pokemonList: action.payload
            }
        case LOAD_ABILITIES:
            localStorage.setItem('abilityList',JSON.stringify(action.payload));
            return{
                ...state,
                abilityList: action.payload
            }
        case LOAD_MOVES:
            if(!localStorage.getItem('moveList')){
                localStorage.setItem('moveList',JSON.stringify(action.payload));
            }
            return{
                ...state,
                moveList: action.payload
            }
        case LOAD_ITEMS:
            localStorage.setItem('itemList',JSON.stringify(action.payload));
            return{
                ...state,
                loadItems: action.payload
            }  
        default: return state
    }
}
export default pokemonReducer
import Moves from "../../components/moves";
import { Pokemon } from "../../services/interfaces";
import { loadItems } from "./actionPokemon";
import { LOAD_POKEMON,LOAD_ABILITIES,LOAD_ITEMS,LOAD_MOVES,SELECT_POKEMON } from "./type";

const initialState = {
    selectedPokemon : undefined,
    pokemonList: [],
    abilityList: [],
    moveList: [],
    itemList: [],
}

const pokemonReducer = (state = initialState, action) => {
    if(localStorage.getItem('pokemonList')){
        state.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
    }

    if(localStorage.getItem('abilityList')){
        state.abilityList = JSON.parse(localStorage.getItem('abilityList'));
    }

    if(localStorage.getItem('moveList')){
        state.moveList = JSON.parse(localStorage.getItem('moveList'));
    }

    if(localStorage.getItem('itemList')){
        state.itemList = JSON.parse(localStorage.getItem('itemList'));
    }

    switch (action.type) {

        case SELECT_POKEMON:
            return {
                ...state,
                selectedPokemon: action.payload
            }

        case LOAD_POKEMON:
            localStorage.setItem('pokemonList',JSON.stringify(action.payload));
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
            localStorage.setItem('moveList',JSON.stringify(action.payload));
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
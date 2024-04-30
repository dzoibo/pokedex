import { Pokemon } from "../../services/interfaces";
import { LOAD_POKEMON,LOAD_ABILITIES,LOAD_ITEMS,LOAD_MOVES,SELECT_POKEMON } from "./type";

const initialState = {
    selectedPokemon : undefined,
    pokemonList: []
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
        default: return state
    }
}
export default pokemonReducer
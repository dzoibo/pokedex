import { LOAD_POKEMON,LOAD_ABILITIES,LOAD_ITEMS,LOAD_MOVES,SELECT_POKEMON } from "./type";

export const loadPokemon = arg => {
    return {
        type: LOAD_POKEMON,
        payload: arg
    }
}

export const loadAbility = arg => {
    return {
        type: LOAD_ABILITIES,
        payload: arg
    }
}

export const loadItems = arg => {
    return {
        type: LOAD_ITEMS,
        payload: arg
    }
}

export const loadMoves = arg =>{
    return {
        type: LOAD_MOVES,
        payload: arg
    }
}

export const selectPokemon = arg =>{
    return {
        type: SELECT_POKEMON,
        payload: arg 
    }
}
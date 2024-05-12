/* 
export interface Pokemon {
    abilities: Ability[]
    base_experience: number
    cries: Cries
    //forms: Form[]
    game_indices: Index[]
    height: numbere
    held_items: any[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: Mfe[]
    name: string
    order: number
    past_abilities: any[]
    past_types: any[]
    species: Species
    sprites: Sprites
    stats: Stat[]
    types: Type[]
    weight: number
  } */

  export class Pokemon {
    abilities!: string[]
    base_experience!: number
    cries!: string
    game_indices!: Index[]
    height!: number
    id!: string
    is_default!: boolean
   /*  location_area_encounters: string */
    movesDef: {
      name: string,
      url: string
     }[];
     moves: Moves[];
    name!: string
    order!: number
    species!: Species;
    image!: string;
    stats!: Stat[];
    types!: string[];
    weight!: number;
    evolutions: Evolution[];
    constructor() {
        this.evolutions=[];
        this.abilities=[];
        this.game_indices=[];
        this.stats=[];
        this.types=[];
        this.moves=[];
        this.movesDef=[];
    }
  }
  
  export interface Index {
    game_index: number
    version: Version;

  }

  export interface Stat {
    base_stat: number
    effort: number
    stat: Stat2
  }
  
  export interface Stat2 {
    name: string
    url: string
  }
  export interface Species {
    base_happiness: number
    capture_rate: number
    color: Color
    egg_groups: EggGroup[]
    evolution_chain: EvolutionChain
    evolves_from_species: any
    flavor_text_entries: FlavorTextEntry[]
    form_descriptions: any[]
    forms_switchable: boolean
    gender_rate: number
    genera: Genera[]
    generation: Generation
    growth_rate: GrowthRate
    habitat: Habitat
    has_gender_differences: boolean
    hatch_counter: number
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    names: Name[]
    order: number;
    pal_park_encounters: PalParkEncounter[]
    pokedex_numbers: PokedexNumber[]
    shape: Shape
    varieties: Variety[]
  }
  
  export interface Color {
    text: string,
    backgroung: string,
    name: string ,
    url: string
  }

  export class Moves{
    power!: number;
    accuracy!: number;
    name!: string;
    description!: string;
    type!: string;
    pp!: number;
    level!: number;
    target!: string;
    priority!: string;
  }
  
  export interface EggGroup {
    name: string
    url: string
  }
  
  export interface EvolutionChain {
    url: string
  }
  
  export interface FlavorTextEntry {
    flavor_text: string
    language: Language
    version: Version
  }
  
  export interface Language {
    name: string
    url: string
  }
  
  export interface Version {
    name: string
    url: string
  }
  
  export interface Genera {
    genus: string
    language: Language2
  }
  
  export interface Language2 {
    name: string
    url: string
  }
  
  export interface Generation {
    name: string
    url: string
  }
  
  export interface GrowthRate {
    name: string
    url: string
  }
  
  export interface Habitat {
    name: string
    url: string
  }
  
  export interface Name {
    language: Language3
    name: string
  }
  
  export interface Language3 {
    name: string
    url: string
  }
  
  export interface PalParkEncounter {
    area: Area
    base_score: number
    rate: number
  }
  
  export interface Area {
    name: string
    url: string
  }
  
  export interface PokedexNumber {
    entry_number: number
    pokedex: Pokedex
  }
  
  export interface Pokedex {
    name: string
    url: string
  }
  
  export interface Shape {
    name: string
    url: string
  }
  
  export interface Variety {
    is_default: boolean
    pokemon: Pokemon
  }
  
  export interface Pokemon {
    name: string
    url: string
  }
  
  //Abilities classes
  export class Ability{
    name!: string;
    id!:number;
    short_effect!: string;
    short_desc!: string;
  }

  export class Evolution{
    initialName: string;
    finalName: string;
    minLevel: any;
     constructor(){
      this.finalName='';
      this.initialName='';
      this.minLevel=null;
     }
  }
  
  
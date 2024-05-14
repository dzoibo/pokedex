import { Ability, Evolution, Item, Moves, Pokemon, Species } from "../interfaces";
import { API_URL, TYPE } from '../../utils/apis';


class Generics {
    
    async getPokemon(id: number): Promise<Pokemon>{
        let pokemon:Pokemon;
        const fetchData = async () => {
            try {
              const response = await fetch(API_URL.baseDevUrl+'pokemon/'+id);
              if (!response.ok) {
                return {};
                /* throw new Error('Network response was not ok'); */
              }
              const jsonData = await response.json();
              return jsonData
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };
        pokemon= await fetchData();
        return this.mapPokemonData(pokemon);
    }
    
    async getPokemons(start:number, end:number){
      let pokemonList=[];
      for (let i = start; i <=end; i++) {
        const pokemon=await this.getPokemon(i);
        pokemonList.push(pokemon);
      }
      return pokemonList;
    }

    async getAbilities(start: number, end: number){
      let abilityList=[];
      for (let i = start; i <= end ; i++){
        const ability = await this.getAbility(i);
        abilityList.push(ability);
      }
      return abilityList;
    }
    
    async getAbility(id: number){
      let ability= new Ability();
      const fetchData = async () => {
          try {
            const response = await fetch(API_URL.baseDevUrl+'ability/'+id);
            if (!response.ok) {
              return {};
            }
            const jsonData = await response.json();
            return jsonData
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      ability= await fetchData();
      return this.mapAbilityData(ability);
    }

    async mapPokemonData(data: any){
        let pokemon=new Pokemon() ;
        pokemon.name=data.name;
        for (const item of data.abilities){
            pokemon.abilities.push(item.ability.name);
        }
        for (const item of data.types){
            pokemon.types.push(item.type.name);
        }
        for(const item of data.moves){
          pokemon.movesDef.push({name:item.move.name,url:item.move.url});
        }
        pokemon.base_experience=data.base_experience;
        pokemon.cries=data.cries.latest;
        const id=data.id.toString();
        if(id.length>=3){
          pokemon.id=id;
        }else if(id.length===2){
          pokemon.id='0'+id;
        }else{
          pokemon.id='00'+id;
        }
        pokemon.game_indices=data.game_indices;
        pokemon.height= data.height;
        pokemon.is_default=data.is_default;
        pokemon.image=data.sprites.other['official-artwork'].front_default;
        pokemon.species = await this.getSpices(data.species.url);
        pokemon.species.color.text=TYPE.filter((type)=>type.name===pokemon.types[0])[0].textColor;
        pokemon.species.color.backgroung=TYPE.filter((type)=>type.name===pokemon.types[0])[0].bgColor;
        pokemon.stats=data.stats
        pokemon.weight=data.weight;
        pokemon.evolutions=await this.getEvolution(pokemon.species.evolution_chain.url);
        return pokemon;
    }

    async mapAbilityData(data: any){
      let ability = new Ability();
      ability.id = data.id;
      ability.name = data.name;
      ability.short_desc =  data.flavor_text_entries.filter((item: any)=>item.language.name==='en')[0].flavor_text;
      ability.short_effect =  data.effect_entries.filter((effect: any)=>effect.language.name==='en')[0].short_effect;
      return ability;
    }

    async getSpices(spiciesUrl: string){
        const fetchData = async () => {
            try {
              const response = await fetch(spiciesUrl);
              if (!response.ok) {
                return {};
                /* throw new Error('Network response was not ok'); */
              }
              const jsonData = await response.json();
              return jsonData
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
        return await fetchData();  
    }

    async getItems(start: number, end: number){
      let items=[];
      for (let i = start; i <= end ; i++){
        const item = await this.getItem(API_URL.baseDevUrl+'item/'+i);
        items.push(item);
      }
      return items;
    }

    async getItem(url: string){
      let item= new Item();
      const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              return {};
            }
            const jsonData = await response.json();
            return jsonData
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      const data= await fetchData();
      item.name=data.name;
      item.cost=data.cost;
      item.image=data.sprites.default;
      item.category=data.category.name;

      try {
        item.description =  data.flavor_text_entries.filter((desc: any)=>desc.language.name==='en')[0].text;
      } catch (error) {
        item.description ='';
      }
      return item;
    }
    
    getDesc(species: Species){
      for (const flavor_text_entry of species.flavor_text_entries){
        if (flavor_text_entry.language.name==='en'){
          return flavor_text_entry.flavor_text;
        }
      }
    }

    async getEvolution (url: string){
      let evolutions: Evolution[]= [];
      const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              return {};
            }
            const jsonData = await response.json();
            return jsonData
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      const data= await fetchData();
      let evolution= new Evolution();
      evolution.initialName=data.chain.species.name;
      if(data.chain.evolves_to[0]!==undefined){
        evolution.minLevel=data.chain.evolves_to[0].evolution_details[0].min_level;
      }
      try {
        evolution.finalName=data.chain.evolves_to[0].species.name;
      } catch (error) {
        return [];
      }

      evolutions.push(evolution);
      if(data.chain.evolves_to[0].evolves_to!==undefined && data.chain.evolves_to[0].evolves_to.length>0){
        const secondEvolution = new Evolution();
        secondEvolution.initialName= data.chain.evolves_to[0].species.name;
        secondEvolution.finalName=data.chain.evolves_to[0].evolves_to[0].species.name;
        if(data.chain.evolves_to[0].evolves_to[0].evolution_details[0] !== undefined){
          secondEvolution.minLevel=data.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level;
        }
        evolutions.push(secondEvolution);
      }
      return evolutions;
    } 

    async getMoves(start: number, end: number){
      let moves=[];
      for (let i = start; i <= end ; i++){
        const move = await this.getMove('https://pokeapi.co/api/v2/move/'+i);
        moves.push(move);
      }
      return moves;
    }

    async getMove(url: string){
      let move= new Moves ()
      const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              return {};
            }
            const jsonData = await response.json();
            return jsonData
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      const data= await fetchData();
      move.name=data.name;
      move.power=data.power;
      move.pp=data.pp;
      move.target=data.target.name;
      move.accuracy=data.accuracy
      move.priority=data.priority;
      move.level= data.id;
      move.type= data.type.name;
      try {
        move.description =  data.flavor_text_entries.filter((item: any)=>item.language.name==='en')[0].flavor_text;
      } catch (error) {
        move.description ='';
      }
      return move;
    }
}





export default Generics;
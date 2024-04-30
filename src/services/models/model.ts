import { Pokemon, Species } from "../interfaces";
import { API_URL, TYPE } from '../../utils/apis';


class Generics {
    
    async getPokemon(id: number): Promise<Pokemon>{
        let pokemon:Pokemon;
        const fetchData = async () => {
            try {
              const response = await fetch(API_URL.baseDevUrl+id);
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
        return this.mapData(pokemon);
    }
    
    async getPokemons(start:number, end:number){
      let pokemonList=[]
      for (let i = start; i <=end; i++) {
        const pokemon=await this.getPokemon(i);
        pokemonList.push(pokemon);
      }
      return pokemonList;
    }

    async mapData(data: any){
        let pokemon=new Pokemon() ;
        pokemon.name=data.name;
        for (const item of data.abilities){
            pokemon.abilities.push(item.ability.name);
        }
        for (const item of data.types){
            pokemon.types.push(item.type.name);
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
        return pokemon;
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

    getDesc(species: Species){
      for (const flavor_text_entry of species.flavor_text_entries){
        if (flavor_text_entry.language.name==='en'){
          return flavor_text_entry.flavor_text;
        }
      }
    }
}





export default Generics;
import React, { useEffect, useState } from 'react'
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import TypeMenu from '../../components/typeMenu';
import PokemonCard from '../../components/pokemonCard';
import Generics from '../../services/models/model';

function Pokemon() {
  const [pokemonList, setPokemonList]=useState([]);
  const genericFunctions = new Generics();

  useEffect(() => {
    genericFunctions.getPokemons(1,151).then((response: any)=>{
      console.log('this is the response',response);
      setPokemonList(response);
    })
  }, []);

  return (
    
    <div className='px-8 py-8 xl:px-36'>
        <Header link='home'/>
        <h1 className=' main-title text-base sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Pokemons</h1>
        <SearchBar placeholder={'Search a pokemon !!!'} />
        <TypeMenu/>
        <div className='flex w-full justify-center gap-x-6 flex-wrap'>
         {pokemonList.map((item:any) => (
            <PokemonCard key={item.id}  pokemon={item} />
          ))} 
        </div>
        
    </div>
  )
}

export default Pokemon
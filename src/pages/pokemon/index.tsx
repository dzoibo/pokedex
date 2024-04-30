import React, { useEffect, useState } from 'react'
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import { useDispatch,useSelector } from 'react-redux';
import TypeMenu from '../../components/typeMenu';
import PokemonCard from '../../components/pokemonCard';
import Generics from '../../services/models/model';
import Loader from '../../components/loader/loader';
import { loadPokemon } from '../../redux/pokemon/actionPokemon';

function Pokemon() {
  const genericFunctions = new Generics();
  const dispatch = useDispatch()
  const pokemonListSaved=useSelector((state:any) => state.pokemonList);
  const [displayLoader, setDisplayLoader]= useState(true)
  const [pokemonList, setPokemonList]=useState([]);
  
  useEffect(() => {
    setDisplayLoader(true);
    console.log('this is the save list',pokemonListSaved);
    if(pokemonListSaved.length<=1){
      genericFunctions.getPokemons(1,151).then((response: any)=>{
        setPokemonList(response);
        dispatch(loadPokemon(response));
        setDisplayLoader(false);
      })
    }
    else{
      setPokemonList(pokemonListSaved)
      setDisplayLoader(false);
    }
  }, []);
  if(!displayLoader){
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
  }else{
    return (
      <Loader/>
    )
  }
}

export default Pokemon
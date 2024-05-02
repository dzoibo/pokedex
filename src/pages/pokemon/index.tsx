import { useEffect, useState } from 'react'
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
  const [displayLoader, setDisplayLoader]= useState(false);
  const [selectedType,setType]= useState('All');
  const [searchKey,setSearchKey]= useState('');
  const [pokemonList, setPokemonList]=useState([]);
  
  useEffect(() => {
    if(pokemonListSaved.length<=1){
      setDisplayLoader(true);
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


  const filterPokemon = (type: string) => {
      if(type!==selectedType){
        const filteredList = pokemonListSaved.filter((pokemon:any) => 
        pokemon.name.includes(searchKey) && 
        (pokemon.types.indexOf(type)>=0 || type==='All'));
        setType(type);
        setPokemonList(filteredList);
      }
  }

  const searchPokemon = (keyWord: string) => {
    const searchResult = pokemonListSaved.filter((pokemon:any) => 
      pokemon.name.includes(keyWord) && 
      (pokemon.types.indexOf(selectedType)>=0 || selectedType==='All'));
      setSearchKey(keyWord);    
      setPokemonList(searchResult);
  }

  if(!displayLoader){
    return (
      <>
          <Header link='home'/>
          <h1 className=' main-title text-base sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Pokemons</h1>
          <SearchBar search={searchPokemon} placeholder={'Search a pokemon !!!'} />
          <TypeMenu filter={filterPokemon} />
          <div className='flex w-full justify-center gap-x-6 flex-wrap'>
          {pokemonList.map((item:any) => (
              <PokemonCard key={item.id}  pokemon={item} />
            ))} 
          </div>
      </>
    )
  }else{
    return (
      <Loader/>
    )
  }
}

export default Pokemon
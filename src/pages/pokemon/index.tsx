import { useEffect, useState } from 'react'
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import { useDispatch,useSelector } from 'react-redux';
import TypeMenu from '../../components/typeMenu';
import PokemonCard from '../../components/pokemonCard';
import Generics from '../../services/models/model';
import Loader from '../../components/loader/loader';
import { loadPokemon } from '../../redux/pokemon/actionPokemon';
import InfiniteScroll from "react-infinite-scroll-component"
import spinner from '../../assets/images/loader.gif';

function Pokemon(props: any) {
  const genericFunctions = new Generics();
  const dispatch = useDispatch()
  const pokemonListSaved=useSelector((state:any) => state.pokemonList);
  const [displayLoader, setDisplayLoader]= useState(false);
  const [selectedType,setType]= useState('All');
  const [searchKey,setSearchKey]= useState('');
  const [pokemonList, setPokemonList]=useState([]);
  const [loadingMore, setLoadingMore]=useState(false);

  
  useEffect(() => {
    if(pokemonListSaved.length<=1){
      setDisplayLoader(true);
      genericFunctions.getPokemons(1,40).then((response: any)=>{
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

  const fetchMorePokemon = async() =>{
    setLoadingMore(true);
    const response = await genericFunctions.getPokemons(pokemonList.length+1,pokemonList.length+6);
    const updatedList: any= [...pokemonList,...response];
    setPokemonList(updatedList);
    dispatch(loadPokemon(updatedList));
    setLoadingMore(false);
  }

  if(!displayLoader){
    return (
      <div className={props.padding}>
          <Header link='home'/>
          <h1 className=' main-title text-lg sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Pokemons</h1>
          <SearchBar search={searchPokemon} placeholder={'Search a pokemon !!!'} />
          <TypeMenu filter={filterPokemon} />
          <InfiniteScroll
            dataLength={pokemonList.length}
            next={fetchMorePokemon} 
            hasMore={pokemonListSaved.length<200} 
            loader={loadingMore && <div className='w-full flex justify-center py-5 font-bold'><img className='w-10 h-10' src={spinner} alt="loader" /> </div>}>
              <div className='flex w-full justify-center gap-x-6 flex-wrap'>
                {pokemonList.map((item:any) => (
                  <PokemonCard key={item.id}  pokemon={item} />
                ))} 
              </div>
            </InfiniteScroll>
          
          <a className="mt-10 block font-semibold text-white rounded px-4 py-2 md:w-fit bg-black" href="https://twitter.com/ivan_dzoibo" target="_blank" rel="noreferrer">© By Dzoibo ivan</a>
      </div>
    )
  }else{
    return (
      <Loader/>
    )
  }
}

export default Pokemon
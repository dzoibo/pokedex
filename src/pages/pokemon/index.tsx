import { useEffect, useState } from 'react'
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import TypeMenu from '../../components/typeMenu';
import PokemonCard from '../../components/pokemonCard';
import { Dispatch, AnyAction } from "redux";
import { useDispatch ,useSelector} from 'react-redux';
import Generics from '../../services/models/model';
import Loader from '../../components/loader/loader';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import spinner from '../../assets/images/loader.gif';
import InfiniteScroll from "react-infinite-scroll-component"
import { loadPokemon } from '../../redux/pokemon/actionPokemon';

function Pokemon(props: any) {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const genericFunctions = new Generics();
  const [displayLoader, setDisplayLoader]= useState(false);
  const [selectedType,setType]= useState('All');
  const pokemonData= useSelector((state:any) => state.pokemonList);
  const [searchKey,setSearchKey]= useState('');
  const [pokemonListSaved, setPokemonListSaved]=useState<any>(pokemonData as any[]);
  const [pokemonList, setPokemonList]=useState<any>([]);
  const [loadingMore, setLoadingMore]=useState(false);
  const navigate= useNavigate();
  
  useEffect(() => {
      setDisplayLoader(true);
      setPokemonList(pokemonListSaved)
      setDisplayLoader(false);
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
    if(selectedType!=='All'){
      return;
    }
    setLoadingMore(true);
    const response = await genericFunctions.getPokemons(pokemonListSaved.length+1,pokemonListSaved.length+6);
    const updatedList: any= [...pokemonListSaved,...response];
    if(selectedType==='All'){
      setPokemonList(updatedList);
      setPokemonListSaved(updatedList);
      dispatch(loadPokemon(updatedList));

    }
    setLoadingMore(false);
  }

  const displayDetails = (pokemonId: number) =>  {
    const selectedPokemon = document.querySelector(`#pokemon-${pokemonId}`);
    const nextPokemon = document.querySelector(`#pokemon-${pokemonId+1}`);
    const previousPokemon= document.querySelector(`#pokemon-${pokemonId-1}`);
    //the class below will help us to add view transition name in the css file
    
    selectedPokemon?.classList.add('pokemon-list-selected');
    nextPokemon?.classList.add('pokemon-list-next');
    previousPokemon?.classList.add('pokemon-list-previous');
    if (!document.startViewTransition) {
      navigate( `/pokemons/${pokemonId}`);
    } else {
      document.startViewTransition(async() => {
        flushSync(() => {
          navigate( `/pokemons/${pokemonId}`);
        });
      });
    }
  }

  if(!displayLoader){
    return (
      <div className={props.padding}>
          <Header link='home'/>
          <h1 className=' main-title text-2xl sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Pokemons</h1>
          <SearchBar search={searchPokemon} placeholder={'Search a pokemon !!!'} />
          <TypeMenu filter={filterPokemon} />
          <InfiniteScroll
            dataLength={pokemonList.length}
            next={fetchMorePokemon} 
            hasMore={pokemonListSaved.length<1000} 
            loader={loadingMore && <div className='w-full flex justify-center py-5 font-bold'><img className='w-10 h-10' src={spinner} alt="loader" /> </div>}>
              <div className='flex w-full justify-center gap-x-6 flex-wrap'>
                {pokemonList.map((item:any) => (
                  <div  key={item.id} onClick={() => displayDetails(parseInt(item.id))} className={'cursor-pointer text-white group flex justify-between relative p-8 overflow-hidden rounded-3xl h-52 w-80 px-6  mt-6 '+item.species.color.backgroung} >
                    <PokemonCard  pokemon={item} />
                  </div>
                ))} 
              </div>
            </InfiniteScroll>
      </div>
    )
  }else{
    return (
      <Loader/>
    )
  }
}

export default Pokemon
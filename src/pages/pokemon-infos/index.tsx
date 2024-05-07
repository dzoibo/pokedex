
import { useDispatch,useSelector } from 'react-redux';
import Generics from '../../services/models/model';
import React, { useState,useEffect } from 'react';
import Header from '../../components/header';
import Cries from '../../components/cries';
import { Pokemon } from '../../services/interfaces';
import { loadPokemon } from '../../redux/pokemon/actionPokemon';
import Loader from '../../components/loader/loader';
import male from '../../assets/images/male.png';
import female from '../../assets/images/female.png';
import { useParams } from 'react-router-dom';
import pokeball from '../../assets/images/pokeball.svg';
import './PokemonInfo.scss';


function PokemonInfo (props: any) {
  const genericFunctions = new Generics();
  const dispatch = useDispatch();
  const pokemonListSaved=useSelector((state:any) => state.pokemonList);
  const pokemonId= parseInt(useParams().pokemonId as string);
  const [displaySession,setDisplaySession]= useState('All');
  const [displayLoader, setDisplayLoader]= useState(true);
  const [pokemon,setPokemon]= useState( new Pokemon());
  const [pokemonList, setPokemonList]=useState([]);
  
  //reusable style
  const pokemonImageStyle= 'relative w-auto h-60 sm:h-80 select-none';
  const previousSelectedImage='transition-all h-36 sm:h-44 md:h-52 -left-40 sm:-left-48 md:-left-60 top-12 brightness-0 contrast-50 opacity-70 hover:opacity-100 previous-pokemon-picture select-none';
  const aboutItemStyle= 'flex items-center mt-1';
  useEffect(() => {
    setDisplayLoader(true);
    if(pokemonListSaved.length<=1){
      genericFunctions.getPokemons(1,151).then((response: any)=>{
        setPokemonList(response);
        dispatch(loadPokemon(response));
        setPokemon(pokemonList[pokemonId-1])
        setDisplayLoader(false);
      })
    }
    else{
      setPokemonList(pokemonListSaved);
      setPokemon(pokemonList[pokemonId-1]);
      setDisplayLoader(false);
    }
  }, []);
  
  if(!displayLoader){
    return (
      <div className={props.padding+' w-full min-h-screen before:w-60 before:h-60 before:bg-gradient-to-r before:from-white/50 before:to-white/5 before:absolute before:-top-14 before:-left-28 before:rounded-3xl before:rotate-[60deg] transition-colors duration-1000 '+pokemon.species.color.backgroung}>
        <div className='px-0 md:px-10 lg:px-20'>
          <Header infos='pokemon' />
          <div className='text-white block items-center sm:flex-row-reverse justify-between sm:flex'>
            <div className='font-bold mb-2.5 sm:mb-0 text-2xl opacity-80'>#{pokemon.id} </div>

            <h1 className='mt-8 flex items-center text-3xl self-start sm:text-5xl font-bold leading-[.05em]'>
              <span className='text-5xl font-bold tracking-wider selection:bg-transparent bg-transparent'>
                {pokemon.name}
              </span>
              < Cries url={pokemon.cries} />
            </h1>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <ul className='font-semibold text-md flex gap-3'>
              {pokemon.types.map(type => (
                <li key={type} className='px-4 py-1 bg-white/30 text-white rounded-xl w-fit'>{type}</li>
              ))}
            </ul>
            <div className=' text-lg font-semibold m-0 opacity-60 text-white text-right'>
              <p>Seed pokemon</p>
              <p>Quadruped</p>
            </div>
          </div>  
        </div>
        
        <div className='relative w-fit max-w-full m-auto'>
          {pokemonId >1 && //this means that there is still pokemon before the current pokemon so we can allow displaying back
              <div className='absolute -left-20 top-5 sm:left-0 z-0' >
                <img src={(pokemonList[pokemonId+2] as any).image} className={previousSelectedImage}  alt="previous pokemon" />
              </div>
            }
            
          <div className='relative mx-auto w-fit -mb-14 z-10'>
            <img src={pokeball} alt="pokeball" className='absolute bottom-0 w-4/5 h-4/5 left-8' />
            <img className={pokemonImageStyle} src={pokemon.image} alt="pokemon" />
          </div>
          {pokemonId< pokemonList.length -1 && 
            <div className='absolute -right-20 sm:right-0 top-5 z-0' >
              <img className={previousSelectedImage} src={(pokemonList[pokemonId] as any).image} alt="next pokemon" />
            </div>
          }
          <div className='px-8 sm:px-12 py-6 bg-white rounded-3xl min-h-[60%] max-w-3xl shadow-xl m-auto'>
              <div className='flex justify-between items-center px-4 py-7 text-gray-400 *:flex *:items-center  *:font-semi-bold '>
                <div className=' hover:text-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>
                  <span className='hidden sm:block capitalize'>About</span>
                </div>

                <div className='hover:text-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"><path strokeLinecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path></svg>
                  <span className='hidden sm:block capitalize'>Stats</span>
                </div>

                <div className='hover:text-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"><path strokeLinecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path></svg>
                  <span className='hidden sm:block capitalize'>Evolution</span>
                </div>

                <div className='hover:text-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"><path strokeLinecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"></path></svg>
                  <span className='hidden sm:block  capitalize'>Moves</span>
                </div>

              </div>  

              <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis architecto quas facere asperiores repellat nemo consequatur quisquam obcaecati quaerat molestiae.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae magni neque repellendus, suscipit autem, voluptates aliquam minima rerum ipsam, pariatur incidunt at asperiores? A eaque quam cupiditate, laboriosam adipisci quaerat!</p>
              </div>

              <div className='flex rounded-xl p-4 justify-around mx-0 md:mx-8 my-8 bg-white shadow-[1px_2px_17px_-1px_rgba(56,56,56,0.45)]'>
                  <div className='*:text-center'>
                    <div className='flex items-center justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="inline-block w-5 h-5 mr-1"><path strokeLinecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path></svg>
                      <span className=' text-gray-500 font-semibold capitalize'>Height</span>
                    </div>
                    <div className='mt-1'>
                      50 cm
                    </div>
                  </div>
                  <div className='*:text-center'>
                    <div className='flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="inline-block w-6 h-6 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"></path></svg>
                      <span className='font-semibold text-gray-500 capitalize'>Weight</span>
                    </div>
                    <div className='mt-1'>
                      9kg
                    </div>
                  </div>

                  
              </div>

              <h3 className='font-bold text-xl mt-2 mb-5'>
                  And what more ?
              </h3>

              <div className={aboutItemStyle}>
                <div className='about-list-title'>Abilities </div>
                <div className='flex gap-2'>
                  <div className='about-list-badge'>Torrent</div>
                  <div className='about-list-badge'>Rain dish</div>
                </div>
              </div>

              <div className={aboutItemStyle}>
                <div className='about-list-title'>Growth rate</div>
                <div>Medium-slow</div>
              </div>

              <div className={aboutItemStyle}>
                <div className='about-list-title'>Capture rate</div>
                <div>45%</div>
              </div>

              <div className={aboutItemStyle}>
                <div className='about-list-title'>Base hapiness</div>
                <div>50</div>
              </div>

              <div className={aboutItemStyle}>
                <div className='about-list-title'>Egg groups</div>
                <div className='flex gap-4'>
                  <div className='about-list-badge'>Monster</div>
                  <div className='about-list-badge'>Water1</div>
                </div>
              </div>

              <div className={aboutItemStyle}>
                <div className='about-list-title'>Gender rate</div>
                <div className='flex gap-2 *:flex *:gap-1 *:items-center font-normal' >
                  <div >
                    <img src={male} alt="male-gender" className='h-6'/>
                    <span className='font-normal'>87.4%</span>
                  </div>
                  <div >
                    <img src={female} alt="female-gender" className='h-6'/>
                    <span className='font-normal'>87.4%</span>
                  </div>
                </div>
              </div>

              <div className={aboutItemStyle}>
                <div className='about-list-title'>Encounters</div>
                <div className='about-list-badge'>Pallet town area</div>
              </div>
          </div> 
        </div>
       

      </div> 
       
    )
  }else{
    return (
      <Loader/>
    )
  }
}
export default PokemonInfo
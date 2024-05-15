import { useNavigate } from 'react-router-dom';
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
import graypokeball from '../../assets/images/pokeball-gray.svg';
import spinner from '../../assets/images/loader.gif';
import './PokemonInfo.scss';
import Moves from '../../components/moves';

import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);



function PokemonInfo (props: any) {
  const navigate = useNavigate();
  const genericFunctions = new Generics();
  const dispatch = useDispatch();
  const pokemonListSaved=useSelector((state:any) => state.pokemonList);

  const id= parseInt(useParams().pokemonId as string);
  const [pokemonId,setPokemonId]= useState(id);

  const [displayedSession,setDisplayedSession]= useState('about');
  const [displayLoader, setDisplayLoader]= useState(true);
  const [pokemon,setPokemon]= useState( new Pokemon());
  const [pokemonList, setPokemonList]=useState([]);
  const [displaySpinner,setDisplaySpinner]=useState(false);
  
  //reusable style
  const pokemonImageStyle= 'relative w-auto h-60 sm:h-80 select-none';
  const previousSelectedImage='transition-all h-36 sm:h-44 md:h-52 -left-40 sm:-left-48 md:-left-60 top-12 brightness-0 contrast-50 opacity-70 hover:opacity-100 previous-pokemon-picture select-none';
  const aboutItemStyle= 'flex items-center mt-2';
  const statItemStyle='flex items-center py-3';
  const menuItemStyle=' flex items-center sm:pb-2 sm:pr-8 text-sm transition-colors duration-200 cursor-pointer md:text-lg hover:text-black';

  useEffect(() => {
    if(pokemonListSaved.length<=1){
      setDisplayLoader(true);
      genericFunctions.getPokemons(1,40).then((response: any)=>{
        setPokemonList(response);
        dispatch(loadPokemon(response));
        setPokemon(response[pokemonId-1]);
        setDisplayLoader(false);
      })
    }
    else{
      setPokemonList(pokemonListSaved);
      setPokemon(pokemonListSaved[pokemonId-1]);
      setDisplayLoader(false);
    }
  }, [pokemonId]);

  const changeSession= async (sessionName: string)=>{
    setDisplayedSession(sessionName);
    if(sessionName==='moves' && pokemon.moves.length===0){
      await loadMoves();
    }else{
      setTimeout(() => {
        setupMoveAnimation();
      }, 100);
    }
    if(sessionName==='stats'){
      setTimeout(() => {
        const stats=document.querySelectorAll('.stat-color');
        stats.forEach((stat,index) =>{
          gsap.to(stat,{
            translateX:'0%',
            delay:  index/50,
            duration: 0.7,
            ease:'power1.out'
          })
        }) 
      }, 100);
      
    }
  }

  

  const loadMoves= async ()=>{
    setDisplaySpinner(true);
      for (let i =0 ; i<15 && i<pokemon.movesDef.length ; i++){// 15 moves is enougth , we don't need a lot..
        const moveDef= pokemon.movesDef[i];
        const move= await genericFunctions.getMove(moveDef.url);
        pokemon.moves.push(move);
      }
      let index = pokemonListSaved.findIndex((item: any) => item.id===pokemon.id);
      pokemonListSaved[index]=pokemon;
      dispatch(loadPokemon(pokemonListSaved));
      setDisplaySpinner(false)
      setTimeout(() => {
        setupMoveAnimation();
      }, 100);
  }

  const setupMoveAnimation = () => {
    gsap.utils.toArray('.container').forEach(function(container: any,index){
      const card = container.querySelector('.move-card');
      gsap.to(card,{
        scrollTrigger:{
          trigger: container,
          start: "top 90%",
          toggleActions:'play none none reverse',
         /*  scrub: 1, 
          pin: true */
        },
        duration: 0.3,
        rotate:'0',
        skewY:0,
        skewX:0,
        scale:1,
        opacity:1,
        x:0,
        y:0,
      });

    })
  }

  const swipeAnimation=(direction: string)=>{
    const previousPokemon=document.querySelector('.pokemon-previous');
    const nextPokemon=document.querySelector('.pokemon-next');
    const currentPokemon=document.querySelector('.pokemon-current');
    
    if(direction==='prev'){
      gsap.to(previousPokemon,{
        /* absolute -left-20 top-5 sm:left-0 z-0 */
        left: '50%',
        x:'-50%',
        duration:0.5,
        top:'40px',
        scale: '1.4',
        ease: 'Power4.easeOut',
        zIndex: '20'
      })
      gsap.to(document.querySelector('.previous-pokemon-picture'),{
        top:'0px',
        duration:0.5
      });

      gsap.to(nextPokemon,{
        /* absolute -left-20 top-5 sm:left-0 z-0 */
        opacity:0,
        scale: '0.5',
        duration:0.3,
        x: '-50%',
        ease: 'Power4.easeIn'
      })

      gsap.to(currentPokemon,{
        position: 'absolute',
        right:'-150px'
      })
    }

  }

  const swipePokemon=(direction: string)=>{
    /* swipeAnimation('prev'); */
    navigate('../../pokemons/'+pokemonId);
    setDisplayedSession('about');
    if(direction==='next'){
      setPokemonId(pokemonId+1);
    }else{
      setPokemonId(pokemonId-1);
    }
  }
  
  if(!displayLoader){
    return (
      <div className={props.padding+' w-full overflow-hidden min-h-screen before:w-60 before:z-0 before:h-60 before:bg-gradient-to-r before:from-white/50 before:to-white/5 before:absolute before:-top-14 before:-left-28 before:rounded-3xl before:rotate-[60deg] transition-colors duration-1000 overflow-x-hidden '} style={{backgroundColor:pokemon.species.color.code}}>
        <div className='px-0 md:px-10 lg:px-20'>
          <Header infos='pokemons' />
          <div className='text-white block items-center sm:flex-row-reverse justify-between sm:flex'>
            <div className='font-bold mb-2.5 sm:mb-0 text-2xl opacity-80'>#{pokemon.id} </div>

            <h1 className=' mt-8 flex items-center text-3xl self-start sm:text-5xl font-bold leading-[.05em]'>
              <span className='overflow-visible text-5xl font-bold tracking-wider selection:bg-transparent bg-transparent'>
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
            <div onClick={()=>swipePokemon('prev')} className='pokemon-previous absolute -left-20 top-5 sm:left-0 z-0' >
              <img src={(pokemonList[pokemonId-2] as any).image} className={previousSelectedImage}  alt="previous pokemon" />
            </div>
          }
          <div className='relative mx-auto w-fit -mb-14 z-10'>
            <img src={pokeball} alt="pokeball" className='absolute bottom-0 w-4/5 h-4/5 left-8 ' />
            <img className={pokemonImageStyle+' pokemon-current'} src={pokemon.image} alt="pokemon" />
          </div>
          {pokemonId< pokemonList.length  && 
            <div onClick={()=>swipePokemon('next')} className='pokemon-next absolute -right-20 sm:right-0 top-5 z-0' >
              <img className={previousSelectedImage} src={(pokemonList[pokemonId] as any).image} alt="next pokemon" />
            </div>
          }
          
          <div className=' w-screen px-8 sm:px-12 py-6 bg-white rounded-3xl min-h-[60%] max-w-3xl shadow-xl m-auto'> 
              <ul className='flex justify-between items-center px-4 py-7 text-gray-400  '>
                <li  className={menuItemStyle+' '+(displayedSession==='about'?'text-black':'') } onClick={async()=>changeSession('about')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>
                  <span className='hidden sm:block capitalize'>About</span> 
                </li>

                <li  className={menuItemStyle+' '+(displayedSession==='stats'?'text-black':'') } onClick={async()=>changeSession('stats')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path></svg>
                  <span className='hidden sm:block capitalize'>Stats</span>
                </li>

                <li  className={menuItemStyle+' '+(displayedSession==='evolution'?'text-black':'') }  onClick={async()=>changeSession('evolution')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path></svg>
                  <span className='hidden sm:block capitalize'>Evolution</span>
                </li>

                <li  className={menuItemStyle+' '+(displayedSession==='moves'?'text-black':'') }  onClick={async()=>changeSession('moves')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-6 sm:h-6 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"></path></svg>
                  <span className='hidden sm:block  capitalize'>Moves</span>
                </li>

              </ul> 

              {displayedSession==='about' && (
                <>
                  <div>
                    <p>{genericFunctions.getDesc(pokemon.species)} </p>
                    <p>His main color is {pokemon.species.color.name} and lives in {pokemon.species.habitat.name} </p>
                  </div>

                  <div className='flex rounded-xl p-4 justify-around mx-0 md:mx-8 my-8 bg-white shadow-[1px_2px_17px_-1px_rgba(56,56,56,0.45)]'>
                      <div className='*:text-center'>
                        <div className='flex items-center justify-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="inline-block w-5 h-5 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path></svg>
                          <span className=' text-gray-500 font-semibold capitalize'>Height</span>
                        </div>
                        <div className='mt-1'>
                          {pokemon.height*10} cm
                        </div>
                      </div>
                      <div className='*:text-center'>
                        <div className='flex items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="inline-block w-6 h-6 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"></path></svg>
                          <span className='font-semibold text-gray-500 capitalize'>Weight</span>
                        </div>
                        <div className='mt-1'>
                          {pokemon.weight/10} kg
                        </div>
                      </div>

                      
                  </div>

                  <h3 className='font-bold text-xl mt-2 mb-5'>
                      And what more ?
                  </h3>

                  <div className={aboutItemStyle+ 'sm:flex-nowrap flex-wrap'}>
                    <div className='about-list-title'>Abilities </div>
                    <div className='flex gap-2 '>
                      {pokemon.abilities.map(ability => (
                        <div key={ability} className='about-list-badge'>{ability}</div>
                      ))}
                    </div>
                  </div>

                  <div className={aboutItemStyle} >
                    <div className='about-list-title'>Growth rate</div>
                    <div> {pokemon.species.growth_rate.name} </div>
                  </div>

                  <div className={aboutItemStyle}>
                    <div className='about-list-title'>Capture rate</div>
                    <div> {pokemon.species.capture_rate} %</div>
                  </div>

                  <div className={aboutItemStyle}>
                    <div className='about-list-title'>Base hapiness</div>
                    <div> {pokemon.species.base_happiness} </div>
                  </div>

                  <div className={aboutItemStyle + 'sm:flex-nowrap flex-wrap'}>
                    <div className='about-list-title'>Egg groups</div>
                    <div className='flex gap-4'>
                      {pokemon.species.egg_groups.map(group => (
                        <div key={group.name} className='about-list-badge'>{group.name}</div>
                      ))}
                    </div>
                  </div>

                  <div className={aboutItemStyle}>
                    <div className='about-list-title'>Gender rate</div>
                    <div className='flex gap-2 *:flex *:gap-1 *:items-center font-normal' >
                      <div >
                        <img src={male} alt="male-gender" className='h-6'/>
                        <span className='font-normal'>{pokemon.species.gender_rate} %</span>
                      </div>
                      <div >
                        <img src={female} alt="female-gender" className='h-6'/>
                        <span className='font-normal'>{pokemon.species.gender_rate} %</span>
                      </div>
                    </div>
                  </div>
                  <div className={aboutItemStyle + 'sm:flex-nowrap flex-wrap'}>
                    <div className='about-list-title'>Encounters</div>
                    <div className='flex gap-4'>
                        <div className='about-list-badge'>{pokemon.species.habitat.name}</div>
                    </div>
                  </div>
                </>
              )} 

              {displayedSession==='stats' && (
                <div className='h-auto'>
                  {pokemon.stats.map(stat => (
                    <div key={stat.stat.name} className={statItemStyle}>
                     <div className='about-list-title'>{stat.stat.name} </div>
                     <div className='stat-item'>
                       <span>{stat.base_stat}</span>
                       <div className='bg-gray-100'>
                         <div className={pokemon.species.color.backgroung+ ' stat-color'} style={{width: stat.base_stat +'%'}}></div>
                       </div>
                     </div>
                   </div> 
                  ))}
                </div>
              )}

              {displayedSession === 'evolution' && (
                <>
                  <h3 className='font-bold text-xl mt-2 mb-5'>
                  Evolution chain
                  </h3>
                  {pokemon.evolutions.map(evolution  => (
                    <div key={evolution.minLevel} className='flex justify-between items-center px-1 mb-5'>
                      <div className='relative flex flex-col items-center group gap-2'>
                        <img className='absolute top-1 left-1 opacity-80 w-11/12 h-auto group-hover:rotate-45 transition' src={graypokeball} alt="pokeball" />
                        <img className='relative z-10  max-h-24 w-auto group-hover:drop-shadow-md'   src={'https://projectpokemon.org/images/normal-sprite/'+evolution.initialName+'.gif'} alt="evolution gif" />
                        <span>{evolution.initialName} </span>
                      </div>

                      <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-10 h-10 text-gray-300 mb-4 m-auto">
                          <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                        </svg>
                        {evolution.minLevel!==null &&
                          <span className='font-bold'>Lvl {evolution.minLevel}</span>
                        }
                      </div>
                      
                      <div className='relative flex flex-col items-center  group gap-2'>
                        <img className='absolute top-1 left-1 opacity-80 w-11/12 h-auto group-hover:rotate-45 transition' src={graypokeball} alt="pokeball" />
                        <img className='relative max-h-24 w-auto group-hover:drop-shadow-md z-10'  src={'https://projectpokemon.org/images/normal-sprite/'+evolution.finalName+'.gif'} alt="evolution gif" />
                        <span > {evolution.finalName}</span>
                      </div>
                    </div>
                  ))}
                  {pokemon.evolutions.length===0 && <p>This pokemon has no evolution</p> }
                </>
              )}

              {displayedSession=== 'moves' && (
                <>
                  {displaySpinner === false ? (
                    <>
                      {pokemon.moves.map(item => (
                        <Moves key={item.name} move={item}  />
                      ))}
                    </>
                  ):(
                    <div className='w-full h-28 flex justify-center items-center'>
                      <img src={spinner} alt="loader" />
                    </div>
                  )}
                </>
              )}
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
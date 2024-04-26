/* eslint-disable react-hooks/rules-of-hooks */
import Header from '../../components/header';
import { Pokemon } from '../../services/interfaces';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pokeball from '../../assets/images/pokeball.svg';
import './landing.scss';
import Generics from '../../services/models/model';
import Cries from '../../components/cries';

const Landing = () => {
  const menuCardStyle= 'overflow-hidden relative shadow-md px-0 sm:px-4 py-5 sm:py-8 rounded-xl sm:rounded-3xl text-white font-bold text-xl sm:text-2xl space-[0.5] before:absolute before:w-32 before:h-32 before:rounded-full before:rotate-45 before:-top-20 before:-left-16 before:bg-white/20 hover:before:bg-white/40 before:transition-all bg-grass shadow-grass/80 ';
  const [pokemon,setPokemon]= useState( new Pokemon());
  const genericFunctions = new Generics();
  
  useEffect(() => {

    const randomId = Math.floor(Math.random() * 151) + 1;
    genericFunctions.getPokemons(randomId).then((response: any)=>{
      setPokemon(response);
    })
  }, []);

  
 

  if(pokemon.species!==undefined ){
    return (
      <div className='p-8' >
        <Header/>
        <div>
          <h1 data-aos="fade-up" className=' main-title text-base sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Welcome to the pokedev</h1>
          <div  className='grid sm:grid-cols-2 gap-6 sm:gap-8'>
            <Link data-aos="fade-up" data-aos-delay="100"  className={menuCardStyle + 'bg-[#58af94]'} to='pokemon'>
              <p className='ml-6 sm:ml-12'>Pokémons</p> 
              <img className='absolute -right-8 -bottom-6 h-36 w-36' alt='pokeball icon' src={pokeball}/>
            </Link>
            <a href='#' data-aos="fade-up" data-aos-delay="200" className={menuCardStyle+'bg-[#dc6661]'}>
              <p className='ml-6 sm:ml-12'>Moves</p> 
              <img className='absolute -right-8 -bottom-6 h-6 w-36' alt='pokeball icon' src={pokeball}/>
            </a>
            <a data-aos="fade-up" data-aos-delay="300" className={menuCardStyle+'bg-[#75aef0]'}>
              <p className='ml-6 sm:ml-12'>Abilities</p> 
              <img className='absolute -right-8 -bottom-6 h-36 w-36' alt='pokeball icon' src={pokeball}/>
            </a>
            <a data-aos="fade-up" data-aos-delay="400" className={menuCardStyle+'bg-[#f7cd5c]'}>
              <p className='ml-6 sm:ml-12 '>items</p> 
              <img className='absolute -right-8 -bottom-6 h-36 w-36' alt='pokeball icon' src={pokeball}/>
            </a>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="550" className={menuCardStyle+ ' !px-6 sm:!px-16 mt-6'} style={{background:pokemon.species.color.name}}>
            <h2 className='mb-2 sm:mb-6'>Pokemon random</h2>
            <div className='block items-center sm:flex-row-reverse justify-between sm:flex'>
              <div className='font-bold mb-2.5 sm:mb-0'>#{pokemon.id} </div>
  
              <h1 className='flex items-center text-3xl self-start sm:text-5xl font-bold leading-[.05em]'>
                <a href='#' className='-ml-4 cursor-pointer px-4 py-2 flex items-center hover:bg-white/20 cursor rounded-md'>
                  {pokemon.name}
                </a>
                < Cries url={pokemon.cries} />
              </h1>
            </div>
            <ul className='font-semibold text-sm flex gap-3 mt-4'>
              {pokemon.types.map(type => (
                <li key={type} className='px-4 py-1 bg-white/30 rounded-xl w-fit'>{type}</li>
              ))}
            </ul>
            <div className='flex sm:justify-between sm:flex-row flex-col justify-normal items-center mt-2'>
              <p className='text-2xl font-bold max-w-md sm:ml-20 ml-0'>{genericFunctions.getDesc(pokemon.species)} </p>
              <img  className='relative w-auto h-64 mr-0 sm:mr-20 sm:h-80 z-20' alt='pokemon presentation' src={pokemon.image} />
              
            </div>
  
            
            <img src={pokeball} alt='pokeball icon' className='z-10 absolute -right-8 -bottom-6 h-60 w-60'/>
          </div>
          
          <a className="mt-6 block w-full font-semibold text-white rounded px-4 py-2 md:w-fit bg-black" href="https://twitter.com/ivan_dzoibo" target="_blank" rel="noreferrer">© By Dzoibo ivan</a>
        </div> 
      </div>
    )
  }else{
    return (
      <article className='h-screen w-screen flex justify-center items-center'>
        <div className="o-pokeball c-loader u-flip "></div>
      </article>
    )
  }
  
}

export default Landing;

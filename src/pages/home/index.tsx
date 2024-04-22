/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import pokeball from '../../assets/images/pokeball.svg';
import randomImage from '../../assets/images/random-image.png';
import { API_URL } from '../../utils/apis';

const home = () => {
  const menuCardStyle= 'overflow-hidden relative shadow-md px-0 sm:px-4 py-5 sm:py-8 rounded-xl sm:rounded-3xl text-white font-bold text-xl sm:text-2xl space-[0.5] before:absolute before:w-32 before:h-32 before:rounded-full before:rotate-45 before:-top-20 before:-left-16 before:bg-white/20 hover:before:bg-white/40 before:transition-all bg-grass shadow-grass/80 ';
  const [data,setData]= useState({});

  useEffect(() => {
    const fetchData = async () => {
      var randomId = Math.floor(Math.random() * 1250) + 1;
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+randomId);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='p-8'>
      <header>
        <a>
          <img className='absolute top-0 right-0 m-4 sm:m-8 w-12 sm:w-16 h-12 sm:h-16 z-50 hover:rotate-180 transition-transform' src={logo} alt='logo' />
        </a>
      </header>
      <div>
        <h1 className=' main-title text-base sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Welcome to the pokedev</h1>
        <div className='grid sm:grid-cols-2 gap-6 sm:gap-8'>
          <a className={menuCardStyle + 'bg-[#58af94]'}>
            <p className='ml-6 sm:ml-12'>Pokémons</p> 
            <img className='absolute -right-8 -bottom-6 h-36 w-36' alt='pokeball icon' src={pokeball}/>
          </a>
          <a href='#' className={menuCardStyle+'bg-[#dc6661]'}>
            <p className='ml-6 sm:ml-12'>Moves</p> 
            <img className='absolute -right-8 -bottom-6 h-36 w-36' alt='pokeball icon' src={pokeball}/>
          </a>
          <a className={menuCardStyle+'bg-[#75aef0]'}>
            <p className='ml-6 sm:ml-12'>Abilities</p> 
            <img className='absolute -right-8 -bottom-6 h-36 w-36' alt='pokeball icon' src={pokeball}/>
          </a>
          <a className={menuCardStyle+'bg-[#f7cd5c]'}>
            <p className='ml-6 sm:ml-12 '>items</p> 
            <img className='absolute -right-8 -bottom-6 h-36 w-36' alt='pokeball icon' src={pokeball}/>
          </a>
        </div>
        
        <div className={menuCardStyle+ 'bg-gray-500 px-6 sm:px-16 mt-6'}>
          <h2 className='mb-2 sm:mb-6'>Pokemon random</h2>
          <div className='block items-center sm:flex-row-reverse justify-between sm:flex'>
            <div className='font-bold mb-2.5 sm:mb-0'>#017</div>

            <h1 className='text-3xl self-start sm:text-5xl font-bold leading-[.05em]'>
              <a href='#' className='-ml-4 cursor-pointer px-4 py-1 flex items-center hover:bg-white/20 cursor rounded-md'>
                Pidgeotto
              </a>
              <svg className=' ml-0 sm:ml-4 inline-block w-8 h-8 transition-transform cursor-pointer hover:scale-110 hover:-rotate-12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"></path>
                </svg>
            </h1>
          </div>
          <ul className='font-semibold text-sm flex gap-3 mt-4'>
            <li className='px-4 py-1 bg-white/30 rounded-xl w-fit'>Normal</li>
            <li className='px-4 py-1 bg-white/30 rounded-xl w-fit'>Flying</li>
          </ul>
          <div className='flex sm:justify-between sm:flex-row flex-col justify-normal items-center mt-2'>
            <p className='text-2xl font-bold max-w-md sm:ml-20 ml-0'>Puts enemies to sleep then eats their dreams.Occasionally gets sick from eating bad dreams.</p>
            <img  className='relative w-auto h-64 mr-0 sm:mr-20 sm:h-80 z-20' alt='pokemon presentation' src={randomImage} />
            
          </div>

          
          <img src={pokeball} alt='pokeball icon' className='z-10 absolute -right-8 -bottom-6 h-60 w-60'/>
        </div>
        
        <a className="mt-6 block w-full font-semibold text-white rounded px-4 py-2 md:w-fit bg-black" href="https://twitter.com/ivan_dzoibo" target="_blank" rel="noreferrer">© By Dzoibo ivan</a>
      </div> 
    </div>
  )
}

export default home

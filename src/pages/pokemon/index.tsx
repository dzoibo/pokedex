import React from 'react'
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import TypeMenu from '../../components/typeMenu';

function pokemon() {
  return (
    <div className='p-8'>
        <Header link='home'/>
        <h1 className=' main-title text-base sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Pokemons</h1>
        <SearchBar placeholder={'Search a pokemon !!!'} />
        <TypeMenu/>
        
    </div>
  )
}

export default pokemon
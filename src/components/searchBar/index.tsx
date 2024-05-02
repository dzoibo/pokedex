import React from 'react';


function SearchBar(props:any) {
  const searchPokemon = (keyWord: string) =>{
    props.search(keyWord);  
  }

  return (
    <div className='flex items-center px-6 py-2 mt-8 mb-12 bg-gray-100 rounded-full '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6 mr-4 text-gray-600"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
        <input onChange={e => searchPokemon(e.target.value)} type="text"  placeholder={props.placeholder}  className='block py-2 pl-3 pr-20 font-semibold text-gray-600 bg-transparent border-0 placeholder:text-gray-400 placeholder:font-semibold focus:border-0 focus:outline-none cursor-text w-full' />
    </div>
  )
}

export default SearchBar
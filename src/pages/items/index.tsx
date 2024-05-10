import React, { useState,useEffect } from 'react'
import SearchBar from '../../components/searchBar'
import Header from '../../components/header'
import Generics from '../../services/models/model'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/loader'

const Items = (props: any) => {
    
    const genericFunctions = new Generics();
    const dispatch = useDispatch();
    const [displayLoader, setDisplayLoader]= useState(false);
    const itemsListSaved= useSelector((state: any) =>state.itemList);
    const [itemList, setItemList]=useState([]);

    const searchAbilities = (keyWord: string) => {
    const searchResult = itemsListSaved.filter((item:any) => 
        item.name.includes(keyWord) );
        setItemList(searchResult);
    }
    if(!displayLoader){
        return (
            <div className={props.padding}>
                <Header link='home'/>
                <h1 className=' main-title text-base sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Abilities</h1>
                <SearchBar search={searchAbilities} placeholder={'Search an abilitiy !!!'} />
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {itemList.map((item:any) => (
                    <div key={item.id} className='container h-full'>
                    <div className='h-full item-card rounded-md bg-white shadow-md p-8 border border-gray-200 relative overflow-hidden opacity-0 translate-y-[100px] skew-x-0 skew-y-[10deg] scale-90 '>
                        <h2 className='capitalize bg-gray-400 font-semibold px-4 text-white py-2 rounded-md w-fit mb-4 text-xl'>{item.name}</h2> 
                        <p className='font-sans pb-2 text-black font-semibold'>{item.short_desc}</p>
                        <p className='w-4/5 text-gray-600 italic'>{item.short_effect}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="absolute text-gray-600 -bottom-4 -right-4 w-28 h-28 opacity-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                        </svg>
                    </div>  
                    </div>             
                ))} 
                </div> 
                <a className="mt-10 block font-semibold text-white rounded px-4 py-2 md:w-fit bg-black" href="https://twitter.com/ivan_dzoibo" target="_blank" rel="noreferrer">© By Dzoibo ivan</a>
            </div>
      )
    }else{
        return (
            <Loader/>
        )
    }
    
}

export default Items
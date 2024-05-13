
import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import TypeMenu from '../../components/typeMenu';
import Moves from '../../components/moves';
import Generics from '../../services/models/model';
import { useDispatch, useSelector } from 'react-redux';
import {  loadMoves } from '../../redux/pokemon/actionPokemon';
import Loader from '../../components/loader/loader';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);


function MovesList(props: any) {
    const genericFunctions = new Generics();
    const dispatch = useDispatch();
    const [displayLoader, setDisplayLoader]= useState(false);
    const moveListSaved= useSelector((state: any) => state.moveList)
    const [moveList, setMoveList]=useState([]);
    const [selectedType,setType]= useState('All');
    const [searchKey,setSearchKey]= useState('');

    useEffect(() =>{
        if(moveListSaved.length<=1){
          setDisplayLoader(true);
          genericFunctions.getMoves(1,30).then((response: any)=>{
            setMoveList(response);
            dispatch(loadMoves(response));
            setDisplayLoader(false);
          })
        }else{
          setMoveList(moveListSaved);
          setDisplayLoader(false);
        }
    },[]);

    useEffect(()=>{
      setupMoveAnimation();
    },[moveList]);

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

    const filterPokemon = (type: string) => {
      if(type!==selectedType){
        const filteredList = moveListSaved.filter((move:any) => 
        move.name.includes(searchKey) && 
        (move.type===type || type==='All'));
        setType(type);
        setMoveList(filteredList);
      }
    }

    const searchMoves = (keyWord: string) => {
      const searchResult = moveListSaved.filter((move:any) => 
        move.name.includes(keyWord) && 
        (move.type===selectedType || selectedType==='All'));
        setMoveList(searchResult);
    }
    
    if(!displayLoader){
        return (
            <div className={props.padding}>
                <Header link='home' />
                <h1 className=' main-title text-base sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Moves</h1>
                <SearchBar search={searchMoves} placeholder={'Search a move !!!'} />
                <TypeMenu filter={filterPokemon} />
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {moveList.map((item:any) => (
                    <Moves key={item.name} move={item}  />
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
  
export default MovesList

import { useEffect, useState } from 'react';
import Header from '../../components/header';
import SearchBar from '../../components/searchBar';
import TypeMenu from '../../components/typeMenu';
import Moves from '../../components/moves';
import Generics from '../../services/models/model';
import InfiniteScroll from "react-infinite-scroll-component"
import spinner from '../../assets/images/loader.gif';
import Loader from '../../components/loader/loader';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from "gsap";
import { Dispatch, AnyAction } from "redux";
import { useDispatch ,useSelector} from 'react-redux';
import { loadMoves } from '../../redux/pokemon/actionPokemon';
gsap.registerPlugin(ScrollTrigger);


function MovesList(props: any) {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const genericFunctions = new Generics();
    const [displayLoader, setDisplayLoader]= useState(false);
    const movesData= useSelector((state:any) => state.moveList);
    const [moveListSaved, setMoveListSaved]=useState<any>(movesData as any[]);

    const [moveList, setMoveList]=useState([]);
    const [selectedType,setType]= useState('All');
    const [searchKey,setSearchKey]= useState('');
    const [loadingMore, setLoadingMore]=useState(false);

    useEffect(() =>{
      setMoveList(moveListSaved);
    },[]);

    const fetchMoreMoves = async() =>{
      if(selectedType!=='All'){
        return;
      }
      setLoadingMore(true);
      const response = await genericFunctions.getMoves(moveList.length+1,moveList.length+8);
      const updatedList: any= [...moveListSaved,...response];
      if(selectedType==='All'){
        setMoveList(updatedList);
        setMoveListSaved(updatedList);
        dispatch(loadMoves(updatedList))
      }
      setLoadingMore(false);
    }
    
    

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
        setSearchKey(keyWord);
    }
    
    if(!displayLoader){
        return (
            <div className={props.padding+ ' h-fit'}>
                <Header link='home' />
                <h1 className=' main-title text-2xl sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Moves</h1>
                <SearchBar search={searchMoves} placeholder={'Search a move !!!'} />
                <TypeMenu filter={filterPokemon} />
                <InfiniteScroll
                dataLength={moveList.length}
                next={fetchMoreMoves} 
                hasMore={moveListSaved.length<300} 
                loader={loadingMore && <div className='w-full flex justify-center font-bold my-5 '><img className='w-10 h-10' src={spinner} alt="loader" /> </div>}>
                  
                  <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 overflow-y-hidden px-6'>
                    {moveList.map((item:any) => (
                        <Moves key={item.name} move={item}  />
                    ))} 
                  </div>

                </InfiniteScroll>
                  
               {/* 
                <a className="mt-10 block font-semibold text-white rounded px-4 py-2 md:w-fit bg-black" href="https://twitter.com/ivan_dzoibo" target="_blank" rel="noreferrer">© By Dzoibo ivan</a>
             */}</div>
        )
      }else{
        return (
          <Loader/>
        )
      } 
}
  
export default MovesList
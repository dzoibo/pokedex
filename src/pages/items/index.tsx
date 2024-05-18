import { useState,useEffect } from 'react';
import SearchBar from '../../components/searchBar';
import Header from '../../components/header';
import Generics from '../../services/models/model';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import pokemonCoin from '../../assets/images/coin.png';
import { loadItems } from '../../redux/pokemon/actionPokemon';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const Items = (props: any) => {
    const genericFunctions = new Generics();
    const dispatch = useDispatch();
    const [displayLoader, setDisplayLoader]= useState(false);
    const itemsListSaved= useSelector((state: any) =>state.itemList);
    const [itemList, setItemList]=useState([]);
    const animationBaseStyle=' overflow-hidden opacity-0 translate-y-[100px] skew-x-0 skew-y-[10deg] scale-90 ';


    useEffect(() =>{
        if(itemsListSaved.length<=1){
          setDisplayLoader(true);
          genericFunctions.getItems(1,28).then((response: any)=>{
            setItemList(response);
            dispatch(loadItems(response));
            setDisplayLoader(false);
          })
        }else{
          setItemList(itemsListSaved);
          setDisplayLoader(false);
        }
    },[]);

    useEffect(()=>{
        setupMoveAnimation();
    },[itemList]);

    
    const searchItem = (keyWord: string) => {
        const searchResult = itemsListSaved.filter((item:any) => item.name.includes(keyWord) );
        setItemList(searchResult);
    }

      const setupMoveAnimation = () => {
        gsap.utils.toArray('.container').forEach(function(container: any,index){
          const card = container.querySelector('.item-card');
          gsap.to(card,{
            scrollTrigger:{
              trigger: container,
              start: "top 90%",
              toggleActions:'play none none reverse',
            },
            duration: 0.2,
            rotate:'0',
            skewY:0,
            skewX:0,
            scale:1,
            opacity:1,
            x:0,
            y:0,
            ease: 'power4.out'
          });
        })
      }
    
    if(!displayLoader){
        return (
            <div className={props.padding}>
                <Header link='home'/>
                <h1 className=' main-title text-2xl sm:text-[2.5rem] mt-4 sm:mt-12 w-full text-left mb-2'> Items</h1>
                <SearchBar search={searchItem} placeholder={'Search an item !!!'} />
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

                {itemList.map((item:any) => (
                    <div className='container' key={item.name}>
                        <div className={animationBaseStyle + ' relative p-8 overflow-hidden border rounded-lg shadow-md item-card h-full'}>
                            <div className='absolute bg-[#9CA3AF] text-white font-bold rounded px-2 py-1 right-4 top-4 text-xs'>{item.category}</div>
                            <div className='flex justify-between items-center gap-4 mt-5'>
                                <img className='w-8 h-8' src={item.image} alt="item"/>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-[#9CA3AF] uppercase font-bold '>{item.name}</span>
                                    {item.cost === null || item.cost===0? (
                                        <span className='font-semibold'>Not for sell</span>
                                    ):(
                                        <div className='flex items-center'>
                                            <span className='font-semibold'>{item.cost}</span> <img className='h-5' src={pokemonCoin} alt="coin symbol" />
                                        </div>
                                    )}
                                    <p>{item.description} </p>
                                </div>
                            </div>
                        </div> 
                    </div>
                                
                ))} 
                    
                </div> 
                {/* <a className="mt-10 block font-semibold text-white rounded px-4 py-2 md:w-fit bg-black" href="https://twitter.com/ivan_dzoibo" target="_blank" rel="noreferrer">© By Dzoibo ivan</a>
             */}
            </div>
      )
    }else{
        return (
            <Loader/>
        )
    }
    
}

export default Items
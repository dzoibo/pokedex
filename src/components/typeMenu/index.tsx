import './typeMenu.scss';
import {useRef,useEffect, useState} from 'react';
import { TYPE } from '../../utils/apis';
import gsap from "gsap";

function TypeMenu(props: any) {

    const container = useRef<HTMLDivElement>(null)
    const [selectedType,setType]= useState('All');

    useEffect(() =>{
    const buttons=document.querySelectorAll('button');
      buttons.forEach((button,index) =>{
        gsap.to(button,{
          opacity:1,
          delay:  index/10,
          ease:'power1.out'
        })
      })
    },[]);

    const updateFilter= (type: any)=>{
      setType(type);
      props.filter(type);
    }

  return (
    <>
      <h6 className=' text-2xl sm:text-3xl -mt-3 sm:mt-0  font-bold text-[rgb(107,114,128)] '>Choose a type</h6>
      <div ref={container} className='custom-scrollBar w-full overflow-x-auto h-20 flex gap-1 sm:gap-3 mt-3'>
        <button onClick={()=>updateFilter('All')}  className="after:bg-black opacity-0 scale-90 sm:scale-100"   >
          <span 
          className={`px-5 py-3 uppercase  ${selectedType===`All`? `text-white bg-black` : 'text-black bg-white'} after:bg-black border-2 border-solid border-black`} >
            All
          </span>
        </button >
        {TYPE.filter(type=>type.name!=='All').map(type => (
          <button  onClick={()=>updateFilter(type.name)} className={`scale-90 sm:scale-100 opacity-0 ${type.afterBgColor}`} key={type.name} >
            <span 
            className={`px-5 py-3 uppercase ${type.name===selectedType ? `text-white ${type.bgColor}`  : type.textColor} ${` `} hover:${type.borderColor} border-2 border-solid ${type.borderColor} ${type.afterBgColor}`} > {/* the border-bottom when over here is to fix a gap that we have with the animation */}
              {type.name}
            </span>
          </button>
        ))}
        </div>
    </>
  )
}
export default TypeMenu
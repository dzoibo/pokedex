import './typeMenu.scss';
import React,{useRef,useEffect} from 'react';
import { TYPE } from '../../utils/apis';
import gsap from "gsap";

function TypeMenu() {
    const container = useRef<HTMLDivElement>(null)
    
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

  return (
    <>
      <h6 className='text-3xl font-bold text-[rgb(107,114,128)] mt-10 '>Choose a type</h6>
      <div ref={container} className='custom-scrollBar w-full overflow-x-auto h-20 flex gap-3 mt-3'>
        <button  className="after:bg-black opacity-0" >
          <span className="px-5 py-3 bg-black text-white after:bg-black">
            All
          </span>
        </button>
          {TYPE.filter(type=>type.name!=='All').map(type => (
            <button className={`opacity-0 after:${type.bgColor}`}  key={type.name} >
              <span className={`px-5 py-3 ${type.textColor} hover:border-b-4 hover:border-solid hover:${type.borderColor} border-2 border-solid ${type.borderColor} after:${type.bgColor}`} > {/* the border-bottom when over here is to fix a gap that we have with the animation */}
                {type.name}
              </span>
            </button>
          ))}
        </div>
    </>
  )
}
export default TypeMenu
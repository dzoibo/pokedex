import React from 'react';
import './typeMenu.scss';
import { TYPE } from '../../utils/apis';

function TypeMenu() {
  

  return (
    <>
      <h6 className='text-3xl font-bold text-[rgb(107,114,128)] mt-10 '>Choose a type</h6>
      <div className='custom-scrollBar w-full overflow-x-auto h-20 flex gap-3 mt-3'>
        <button  className="after:bg-black" >
          <span className="px-5 py-3 bg-black text-white after:bg-black">
            All
          </span>
        </button>
          {TYPE.filter(type=>type.name!=='All').map(type => (
            <button className={`after:${type.bgColor}`}  key={type.name} >
              <span className={`px-5 py-3 ${type.textColor} border-2 border-solid ${type.borderColor} after:${type.bgColor}`} >
                {type.name}
              </span>
            </button>
          ))}
        </div>
    </>
  )
}
export default TypeMenu
import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/images/notFound.png';

function Notfound() {
  return (
    <div className='w-full flex flex-col justify-center items-center py-[10%]'>
        <h6 className='tracking-[10px] font-bold text-red-600 mb-14 text-4xl'>SORRY</h6>
        <div >
           <img src={notFound} alt="notfound" /> 
        </div>
        <p className='font-bold text-black mt-4 text-2xl tracking-[6px] '>Page not found</p>

        <Link to={'/'}>
          <button className='tracking-[8px] px-6 py-2 border border-solid border-gray-400 text-2xl mt-24 text-gray-500 font-semibold'>BACK HOME</button>
        </Link>
    </div>
  )
}

export default Notfound
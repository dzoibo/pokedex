import React from 'react';
import './typeMenu.scss';

function TypeMenu() {
  return (

    <>
      <h6 className='text-3xl font-bold text-[#6b7280] mt-10 mb-4'>Choose a type</h6>
      <div className='flex gap-3'>
        <button className='rounded-lg relative inline-block text-lg group snap-start filter-button'>
          <span className='container-span'>
            Grass
            <span></span>
          </span>
          <span></span>
        </button>
      </div>
    </>
  )
}

export default TypeMenu
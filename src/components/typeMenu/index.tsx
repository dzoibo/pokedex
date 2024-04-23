import React from 'react';

function TypeMenu() {
  return (

    <>
      <h6 className='text-3xl font-bold text-[#6b7280] mt-10 mb-4'>Choose a type</h6>
      <div className='flex gap-3'>
        <button className='relative inline-block text-lg group snap-start filter-button'>
          span
          <span></span>
        </button>
      </div>
    </>
  )
}

export default TypeMenu
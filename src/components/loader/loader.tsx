import React from 'react';
import './loader.scss';

const Loader = () => {
  return (
    <article className='h-screen w-screen flex justify-center items-center'>
        <div className="o-pokeball c-loader u-flip "></div>
    </article>
  )
}
export default Loader
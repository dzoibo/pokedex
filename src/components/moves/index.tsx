import React from 'react';
import { TYPE } from '../../utils/apis';



/*  */
const Moves = (props: any) => {
    const types = TYPE.filter(type=>type.name===props.typeName);
    const type= types[0];
    const iconStyle= 'h-24 w-24 absolute bottom-0 right-0 m-4 z-0'
    

    return (
        <li className={type.borderColor+ ' list-none border-2 rounded-lg p-8 relative shadow-sm shadow-normal/80 mt-8 move-card'}>
            <div className='*:font-semibold *:text-lg flex items-center flex-wrap gap-2'>
                <p className={type.bgColor +' py-2 px-4 w-fit rounded-lg font-semibold text-lg text-white'}>Tackle</p>
                <p className={type.textColor} >lVL. 1</p>
            </div>

            <p className='py-4'>A full-body charge attack.</p>

            <div className='flex z-10 flex-wrap gap-3 pr-24'>
                <div className='about-list-badge'>
                    Power 
                    <span >40</span>
                </div>
                <div  className='about-list-badge'>
                    Accuracy 
                    <span >100</span> 
                </div>
                <div className='about-list-badge'>
                    PP
                    <span>35</span>
                </div>
                <div className='about-list-badge'>
                    Priority 
                    <span>0</span>
                </div>
                <div className='about-list-badge'>
                    PP
                    <span>35</span>
                </div>
                <div className='about-list-badge'>
                    Priority 
                    <span>0</span>
                </div>
                <div className='about-list-badge'>
                    Type 
                    <span>Physical</span>
                </div>
                <div className='about-list-badge'>
                    Target 
                    <span>Selected pokemon</span>
                </div>
            </div>

            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className={type.fillColor +iconStyle}>
                {type.name !== 'ice' ? 
                (
                   <path clipRule="evenodd" d={type.iconPath} fillRule="evenodd"></path>             
                ) : (
                    <>
                     <path fillRule="evenodd" clipRule="evenodd" d="M384.304 39.0418L385.879 177.392L265.209 235.319L263.721 104.69L384.304 39.0418Z"></path>
                     <path fillRule="evenodd" clipRule="evenodd" d="M505.269 257.047L385.814 325.374L266.288 256.939L385.752 194.187L505.269 257.047Z"></path>
                     <path fillRule="evenodd" clipRule="evenodd" d="M245.04 257.047L125.585 325.374L6.05861 256.939L125.523 194.187L245.04 257.047Z"></path>
                     <path fillRule="evenodd" clipRule="evenodd" d="M124.243 38.4753L248.229 99.881L245.059 233.697L127.993 175.719L124.243 38.4753Z"></path>
                     <path fillRule="evenodd" clipRule="evenodd" d="M387.678 473.525L263.692 412.119L266.862 278.302L383.928 336.281L387.678 473.525Z"></path>
                     <path fillRule="evenodd" clipRule="evenodd" d="M128.525 474.77L126.949 336.42L247.62 278.493L249.108 409.121L128.525 474.77Z"></path>   
                    </>
                )}
                
            </svg>

            
        </li>
    )
}

export default Moves
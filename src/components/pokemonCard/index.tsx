import { Link } from 'react-router-dom';
import { Pokemon } from '../../services/interfaces';
import pokeball from '../../assets/images/pokeball.svg';


function PokemonCard(props: any) {
  const pokemon: Pokemon= props.pokemon;
  
  return (
    <Link  to={`/pokemons/${pokemon.id}`}  className={'text-white group flex justify-between relative p-8 overflow-hidden rounded-3xl h-52 w-80 px-6  mt-6 '+pokemon.species.color.backgroung} >
        <div className='font-bold absolute right-5 top-4  text-[#1f29374d] transition-all duration-300 ease group-hover:text-white'>
            #{pokemon.id} 
        </div>
        <div>
            <h1 className='items-center text-2xl mt-1.5 font-bold '>
                {pokemon.name}
            </h1>
            <ul className='font-semibold text-sm flex flex-col gap-3 mt-4'>
                {pokemon.types.map(type => (
                    <li key={type} className='px-4 py-1 bg-white/30 rounded-xl w-fit'>{type}</li>
                ))}
            </ul>
        </div>
        <img  className='group-hover:scale-110 transition-all duration-300 ease  -mr-6 relative h-40 w-40 z-20' alt='pokemon presentation' src={pokemon.image} />
        <img src={pokeball} alt='pokeball icon' className='absolute transition-all duration-300 ease w-44 h-44 -right-3 -bottom-8 group-hover:rotate-45'/>
    </Link>
    
  )
}

export default PokemonCard
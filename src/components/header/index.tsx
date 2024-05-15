import { useNavigate,Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'

function Header(props: any) {
  const navigate = useNavigate();

  
  return (
    <>
      <header className='relative z-10'>
        {props.link!==undefined && props.infos===undefined &&
          <svg onClick={() => navigate('/')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="cursor-pointer mt-4 w-8 h-8 text-gray-400 hover:text-black">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd"></path>
          </svg>
        }
        {props.infos!==undefined &&
          <Link to={'/'+props.infos}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="cursor-pointer mt-4 w-8 h-8 text-white">
              <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd"></path>
            </svg>   
          </Link>
        }
    </header>
      <Link to='/'>
        <img className='absolute top-0 right-0 m-4 sm:m-8 w-12 sm:w-16 h-12 sm:h-16 z-50 hover:rotate-180 transition-transform' src={logo} alt='logo' />
      </Link>
    </>
    
  )
}

export default Header
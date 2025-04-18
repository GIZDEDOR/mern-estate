import {FaSearch} from 'react-icons/fa';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';

export default function Headre() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>ta</span>
          <span className='text-slate-700'>nedvizh</span>
        </h1>
        </Link>
        <form className='bg-white ring-1 ring-slate-900/5 rounded-full p-3 flexBetween gap-x-2 relative flex items-center'>
          <input type="text" placeholder='Поиск...' 
          className='outline-none border-none w-24 sm:w-64 bg-white '/>
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>Главная</li>
            </Link>
            <Link to='/about'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>О нас</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
            ) : (
              <li className=' text-slate-700 hover:underline'>Войти</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

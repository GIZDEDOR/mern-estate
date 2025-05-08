import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import icon from '../assets/icon.png';

export default function Headre() {
  const {currentUser} = useSelector(state => state.user);
  const [ searchTerm, setSearchTerm ] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
        <h1 className='font-bold text-xl sm:text-xl flex items-center flex-wrap'>
          <span className='text-slate-500'>ta</span>
          <span className='text-slate-700'>nedvizh</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-white ring-1 ring-slate-900/5 rounded-full p-3 flexBetween gap-x-2 relative flex items-center'>
          <input 
            type="text" 
            placeholder='Поиск...' 
            className='outline-none border-none w-24 sm:w-64 bg-white '
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
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

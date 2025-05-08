import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaDoorOpen,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
  FaShare,
  FaRulerCombined
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();
    const currentUser = useSelector((state) => state.user.currentUser);
    
    useEffect (() => {
      const fetchListing = async () => {
        try {
          setLoading(true);

          const res = await fetch(`/api/listing/get/${params.listingId}`);
          const data = await res.json();
          if (!res.ok) {
            setError(true);
            setLoading(false);
            return;
          }
          setListing(data);
          setLoading(false);
          setError(false);
        } catch (error) {
          setError(true);
          setLoading(false);

        }
      };
      fetchListing();
    }, [params.listingId]);
  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Загрузка...</p>}
      {error && <p className='text-center my-7 text-2xl'>Что-то пошло не так!</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map(url => (
              <SwiperSlide key={url}>
                <div 
                  className='h-[550px]' 
                  style={{ 
                    background: `url(${url}) center no-repeat`, 
                    backgroundSize: 'cover', 
                  }}
              ></div>
            </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className="text-slate-500" 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 text-sm animate-bounce'>
              Скопировано
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ₽{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('ru-RU')
                : listing.regularPrice.toLocaleString('ru-RU')}
              {listing.type === 'rent' && ' / месяц'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
              <FaMapMarkedAlt className='text-green-700'/>
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full text-white p-1 rounded-md max-w-[200px] text-center '>
                {listing.type === 'rent' ? 'Сдаётся' : 'Продаётся'}
              </p>
              {
                listing.offer && (
                  <p className='bg-green-900 w-full text-white p-1 rounded-md max-w-[200px] text-center'>₽{+listing.regularPrice - +listing.discountPrice} АКЦИЯ</p>
                )
              }
            </div>
          <p className='text-slate-800'>
            <span className='font-semibold text-black'>
            Описание - {' '}
            </span>
            {listing.description}
          </p>
          <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 '>
            <li className='flex items-center gap-1  text-green-900 font-semibold text-sm'>
              <FaDoorOpen className='text-lg'/>
              {listing.rooms > 1 ? `${listing.rooms} комнаты` : `${listing.rooms} комната `}
            </li>
            <li className='flex items-center gap-1  text-green-900 font-semibold text-sm'>
              <FaBath className='text-lg'/>
              {listing.bathroomType}
            </li>
            <li className='flex items-center gap-1  text-green-900 font-semibold text-sm'>
              <FaParking className='text-lg'/>
              {listing.rooms ? 'парковка' : 'нет парковки'}
            </li>
            <li className='flex items-center gap-1  text-green-900 font-semibold text-sm'>
              <FaChair className='text-lg'/>
              {listing.furnished ? 'с мебелью' : 'без мебели'}
            </li>
            <li className='flex items-center gap-1  text-green-900 font-semibold text-sm'>
              <FaRulerCombined className='text-lg'/>
              {listing.squareMeters + ' м²'}
            </li>
          </ul>
          {currentUser && listing.userRef !== currentUser._id && !contact && (
            <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>Связаться С Владельцем</button>
          )}
          {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}

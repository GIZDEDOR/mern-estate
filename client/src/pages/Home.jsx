import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import Listingitem from '../components/Listingitem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch ('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch ('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch ('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
        <div className='flex flex-col p-28 px-3 gap-6 max-w-6xl mx-auto  '>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
            Найдите своё <span className='text-slate-500'>идеальное</span>
            <br />
            жильё с лёгкостью
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm'>
            ta_nedvizh поможет вам быстро, удобно и комфортно найти новый дом.
            <br />
            У нас широкий выбор недвижимости на любой вкус.
          </div>
          <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Начнём прямо сейчас...
          </Link>

        </div>


      {/* swiper */}
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:"cover"}} className='h-[500px]' key={listing._id}></div>
            </SwiperSlide>
          ))
        }
      </Swiper>




      {/* listing results */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div >
              <div className='my-3'>
                <h2 className="text-2xl font-semibold text-slate-600">Последние объекты со скидкой</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  Показать больше скидок
                </Link>
              </div>
              <div className='flex gap-4'>
                {offerListings.map((listing) => (
                  <Listingitem listing={listing} key={listing._id}/>
                ))}
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div >
              <div className='my-3'>
                <h2 className="text-2xl font-semibold text-slate-600">Последние объекты на аренду</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                  Показать больше аренды
                </Link>
              </div>
              <div className='flex gap-4'>
                {rentListings.map((listing) => (
                  <Listingitem listing={listing} key={listing._id}/>
                ))}
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div >
              <div className='my-3'>
                <h2 className="text-2xl font-semibold text-slate-600">Последние объекты на продажу</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                  Показать больше продаж
                </Link>
              </div>
              <div className='flex gap-4'>
                {saleListings.map((listing) => (
                  <Listingitem listing={listing} key={listing._id}/>
                ))}
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

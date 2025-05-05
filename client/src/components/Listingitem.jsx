import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';

export default function Listingitem({listing}) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt='listing cover'
        className="h-[320px] sm:h-[220px] object-cover w-full hover:scale-105 transition-scale duration-300" 
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-4 h-4 text-green-700"/>
            <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
          </div>
          <p className="text-sm text-slate-700 line-clamp-2">{listing.description}</p>
          <p className="text-slate-500 mt-2 font-semibold">
            ₽{' '} 
            {listing.discountPrice
              ? listing.discountPrice.toLocaleString('ru-RU')
              : listing.regularPrice.toLocaleString('ru-RU')}
              {listing.type === 'rent' && ' / месяц'}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.rooms > 1 ? `${listing.rooms} 
              комнаты` : `${listing.rooms} комната`}
            </div>
            <div className="font-bold text-xs">
              {`${listing.squareMeters} м²`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

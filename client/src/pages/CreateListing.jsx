import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7' >Выложить Объект</h1>
        <form className='flex flex-col sm:flex-row gap-4 '>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Название' className='border p-3 rounded-lg' id='name' maxLenght='62' minLength='10' required />
                <textarea type="text" placeholder='Описание' className='border p-3 rounded-lg' id='description' required />
                <input type="text" placeholder='Адрес' className='border p-3 rounded-lg' id='address' required />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400'/>
                        <span>Продажа</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400'/>
                        <span>Аренда</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400'/>
                        <span>Парковка</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400'/>
                        <span>Мебель</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400'/>
                        <span>Акция</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className="flex flex-col p-3 border border-gray-300 rounded-lg">
                        <p className="font-semibold">Санузел</p>
                        <div className="flex flex-col">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="bathroomType" value="совмещённый" className="w-5 h-5  accent-gray-300 rounded-md border-gray-400" />
                                Совмещённый
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="bathroomType" value="раздельный" className="w-5 h-5  accent-gray-300 rounded-md border-gray-400"/>
                                Раздельный
                            </label>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='rooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                        <p>Комнаты</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='rooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                        <div className='flex flex-col items-center'>
                            <p>Цена</p>
                            <span className='text-xs'>(₽ / месяц)</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='discountPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                        <div className='flex flex-col items-center'>
                            <p>Цена со скидкой</p>
                            <span className='text-xs'>(₽ / месяц)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Фото:
                <span className='font-normal text-gray-600 ml-2'>Первое фото будет главным (максимум 20)</span>
                </p>
                <div className='flex gap-4'>
                    <input className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='images/*' multiple />
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Загрузить</button>
                </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>Выложить Объект</button>
            </div>
        </form>
    </main>
  )
}

import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 sm:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label 
                    className='whitespace-nowrap font-semibold'>Что вы ищете?</label>
                    <input type='text'
                    id='searchTerm'
                    placeholder='Поиск...'
                    className='border rounded-lg p-3 w-full'
                    />
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Тип:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all'
                        className='w-5'/>
                        <span>Аренда & Продажа</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent'
                        className='w-5'/>
                        <span>Аренда</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale'
                        className='w-5'/>
                        <span>Продажа</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer'
                        className='w-5'/>
                        <span>Акция</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Удобства:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking'
                        className='w-5'/>
                        <span>Парковка</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished'
                        className='w-5'/>
                        <span>Мебель</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Сортировать:</label>
                    <select id='sort_order'
                    className='border rounded-lg p-3'>
                        <option>Цена: сначала дорогие</option>
                        <option>Цена: сначала дешёвые</option>
                        <option>По дате: новые</option>
                        <option>По дате: старые </option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>Искать</button>
            </form>
        </div>
        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Результаты поиска:</h1>
        </div>
    </div>
  )
}

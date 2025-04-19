import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Профиль</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" 
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"/>
        <input type="text" placeholder='Имя' id="username" className='border p-3 rounded-lg' />
        <input type="text" placeholder='Почта' id="email" className='border p-3 rounded-lg' />
        <input type="text" placeholder='Пароль' id="password" className='border p-3 rounded-lg' />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Обновить</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Удалить учётную запись</span>
        <span className="text-red-700 cursor-pointer">Выйти</span>
      </div>
    </div>
  )
}

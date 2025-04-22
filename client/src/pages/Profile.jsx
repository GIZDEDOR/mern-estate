import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserSuccess, signOutUserFailure, signOutUserStart } from "../redux/user/userSlice";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => 
          setFormData((prev) => ({ ...prev, avatar: downloadUrl }))
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try {
      dispatch(updateUserStart()); 
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if(!res.ok) {
        const errorData = await res.json();
        dispatch(updateUserFailure(errorData.message));
        return;
      }
      const data = await res.json();
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) { 
      dispatch(updateUserFailure(error.message)); 
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(deleteUserFailure(errorData.message));
        return;
      }
      
      const data = await res.json();
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      if (!res.ok) {
        const errorData = await res.json();
        dispatch(signOutUserFailure(errorData.message));
        return;
      }
      const data = await res.json();
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Профиль</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          onChange={(e)=>setFile(e.target.files[0])} 
          type="file" 
          ref={fileRef} 
          hidden 
          accept='image/*'
        />
        <img 
          onClick={()=>fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} 
          alt="profile" 
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Ошибка загрузки изображения (Изображение должно вестить не больше 2 мб)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Загрузка${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Изображение успешно загружено!</span>
          ) : (
            ''
        )}
        </p>
        <input 
          type="text" 
          placeholder='Имя' 
          defaultValue={currentUser.username} 
          id="username" 
          className='border p-3 rounded-lg'
          onChange={handleChange} 
        />
        <input 
          type="text" 
          placeholder='Почта' 
          defaultValue={currentUser.email} 
          id="email" 
          className='border p-3 rounded-lg'
          onChange={handleChange} 
        />
        <input 
          type="password" 
          placeholder='Пароль' 
          id="password" 
          className='border p-3 rounded-lg'
          onChange={handleChange} 
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Загрузка...': 'Обновить'}</button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}>
          Выложить объект
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Удалить учётную запись</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Выйти</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'Пользователь успешно обновлён!' : ''}</p>
    </div>
  )
}

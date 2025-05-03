import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


export default function CreateListing() {
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        rooms: 1,
        squareMeters: 0,
        bathroomType: '',
        regularPrice: 1000,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect( () => {
        const fecthListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json(); 
            if (!res.ok) {
                console.log(data.message);
                return;
            }
            setFormData(data);
        };

        fecthListing();
    }, []);

    const handleImageSubmit =  (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 21 ){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls),

                });
                setImageUploadError(false);
                setUploading(false);
            }).catch((error) => {
                setImageUploadError('Фото не загружено (максимум 10 мб на одно фото)');
                setUploading(false);
            });
        }else{
            setImageUploadError('Вы можете загрузить только 20 изображений на один объект.')
            setUploading(false);
        }
    };

    const storeImage = async  (file) => {
        return new Promise ((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => { 
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            )
        });
    };
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !==index),
        });
    };
    const handleChange = (e) => {
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type: e.target.id
            })
        }

        if(e.target.id === 'совмещённый' || e.target.id === 'раздельный'){
            setFormData({
                ...formData,
                bathroomType: e.target.id
            })
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.imageUrls.length < 1) return setError('Вы должны загрузить хотя бы одно изображение');
            if(+formData.regularPrice < +formData.discountPrice) return setError('Цена со скидкой дожны быть ниже обычной цены');
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7' >Изменить Объект</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 '>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Название' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />
                <textarea type="text" placeholder='Описание' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description} />
                <input type="text" placeholder='Адрес' className='border p-3 rounded-lg' id='address' required onChange={handleChange}  value={formData.address} />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400' onChange={handleChange} checked={formData.type === 'sale'}/>
                        <span>Продажа</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400' onChange={handleChange} checked={formData.type === 'rent'}/>
                        <span>Аренда</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400' onChange={handleChange} checked={formData.parking} />
                        <span>Парковка</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400' onChange={handleChange} checked={formData.furnished}/>
                        <span>Мебель</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-6 h-6 accent-gray-300 rounded-md border-gray-400' onChange={handleChange} checked={formData.offer}/>
                        <span>Акция</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className="flex flex-col p-3 border border-gray-300 rounded-lg">
                        <p className="font-semibold">Санузел</p>
                        <div className="flex flex-col">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="bathroomType" id="совмещённый" className="w-5 h-5  accent-gray-300 rounded-md border-gray-400" onChange={handleChange} checked={formData.bathroomType === "совмещённый"} />
                                Совмещённый
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="bathroomType" id="раздельный" className="w-5 h-5  accent-gray-300 rounded-md border-gray-400" onChange={handleChange} checked={formData.bathroomType === "раздельный"} />
                                Раздельный
                            </label>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='rooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.rooms} />
                        <p>Комнаты</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='squareMeters' min='1' max='10000' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.squareMeters} />
                        <p>Площадь</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='regularPrice' min='1000' max='100000000' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.regularPrice} />
                        <div className='flex flex-col items-center'>
                            <p>Цена</p>
                            <span className='text-xs'>(₽ / месяц)</span>
                        </div>
                    </div>
                    {formData.offer &&(

                    <div className='flex items-center gap-2'>
                        <input type='number' id='discountPrice' min='0' max='100000000' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.discountPrice} />
                        <div className='flex flex-col items-center'>
                            <p>Цена со скидкой</p>
                            <span className='text-xs'>(₽ / месяц)</span>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Фото:
                <span className='font-normal text-gray-600 ml-2'>Первое фото будет главным (максимум 20)</span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e)=> setFiles(Array.from(e.target.files))} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple />
                    <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Загрузка...' : 'Загрузить'}</button>
                </div>
                <p className="text-red-700 text-sm">{imageUploadError  && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                      <div key={url} className="flex justify-between p-3 border items-center">
                        <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
                        <button type='button' onClick={() => handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 ">Удалить</button>
                      </div>  
                    ))
                }
                <button disabled={loading || uploading }  className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>{loading ? 'Изменяю...' : 'Изменить обьект'}</button>
                {error && <p className="text-red-700 text-sm">{error}</p>}
            </div>
        </form>
    </main>
  )
}

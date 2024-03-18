import {subjects} from './subjects'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Design from './design'
import { useDispatch ,useSelector} from 'react-redux'
import { logout } from './userReducer'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Home(){
    const navigate=useNavigate()
    const user=useSelector(state=>state.auth.user)
    const dispatch=useDispatch()
    console.log(user)

   


   
    return (
        <div >
        <img src='./cover.jpg' className='w-full relative h-full blur-sm'/>
        <Design />
       <h2 className='absolute top-20 left-[40%]  text-2xl font-bold text-slate-800 cursor-auto underline hover:scale-110'>Our Subjects</h2>
        <div className='flex flex-row flex-wrap gap-5 absolute w-[600px] h-64 top-[50%]  left-[50%]  -translate-x-[50%] -translate-y-[50%] z-2 ' >
        {subjects.map(subject=>
          <div key={subject.id} className='relative w-36 h-24 m-2 home hover:scale-105 '  onClick={()=>navigate(`postList/${subject.title}`)}> 
           <img src={subject.src} alt={subject.title} className='relative w-full h-full rounded-full  brightness-50'  />
           <div className='absolute inset-0 flex  items-center justify-center'><h3 className='font-bold  text-xl  text-slate-100 font-serief cursor-pointer'>{subject.title}</h3></div>
           </div>
           
    )}
        
        </div>
        {user?.name && <p className='absolute top-3 right-3 underline text-gray-400 cursor-pointer font-bold hover:text-rose-800' onClick={()=>dispatch(logout())}>Logout</p>}

        </div>
    )
}
// : <Skeleton baseColor='gray' className='w-36 h-28 rounded-full' />

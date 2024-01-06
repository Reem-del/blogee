import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login,checkExist } from './userReducer'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import './App.css'


import { useGetUsersQuery,selectAllUsers } from './features/users/usersSlice'
export default function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [userInfo,setUserInfo]=useState({name:'',email:'',password:''})
    const user=useSelector(state=>state.auth.user)
    const {isLoading}=useGetUsersQuery()
    const users=useSelector(selectAllUsers)
    function checkUser(){
      const foundUser=users.find(user=>(user.name === userInfo.name && user.email === userInfo.email  && user.password === userInfo.password))
  dispatch(checkExist(foundUser))}

  
     function HandleClick(){
    dispatch(login(userInfo))
    checkUser()
    setUserInfo({name:'',email:'',password:''})
    navigate('/post')
     
     }
     console.log(user)

    return (
      <div className='bg-purple-400  h-screen'>
        <div className='absolute flex flex-row w-[800px]  h-[350px] rounded-full top-20 left-[15%] '>
           
        <div className='flex flex-col justify-center w-1/2 items-center bg-white gap-5 '>
              <h3 className='text-lg text-teal-800	font-bold'>Login</h3>
            <div className='flex flex-row space-x-3'>
            <FaUserLarge size={20} className='mt-1 text-fuchsia-500'/>
            <input type='text' value={userInfo.name} onChange={(e)=>setUserInfo({...userInfo,name:e.target.value})} placeholder='Enter your Name..' className='pl-2 text-sm w-56 h-10 border border-slate-500'/>
             </div>

           <div className='flex flex-row space-x-3'>
           <MdEmail size={22} className='mt-1 text-fuchsia-500' />
            <input type='text' value={userInfo.email} onChange={(e)=>setUserInfo({...userInfo,email:e.target.value})} placeholder='Enter Your Email..' className='pl-2 w-56 text-sm h-10 border border-slate-500'/>
            </div>

            <div className='flex flex-row space-x-3'>
           < RiLockPasswordFill  size={22} className='mt-1 text-fuchsia-500' />
           <input type='password' value={userInfo.password} onChange={(e)=>setUserInfo({...userInfo,password:e.target.value})} placeholder='Enter Your password..' className='pl-2 w-56 text-sm h-10 border border-slate-500'/>
           </div>
        <button onClick={HandleClick} className='bg-fuchsia-500 h-10 w-32 rounded-md hover:rounded-full'>Login</button>
        
        </div>
        <div className='w-1/2 relative bg-slate-200 '>
        <img src='/cover.jpg' alt='login' className='absolute h-full brightness-50 '/>
        <div className='absolute w-full h-full bg-purple-500/10 backdrop-opacity-100 '></div>
        <p className='absolute z-2 top-[30%] left-[15%] text-slate-100 text-xl  animate1'>Can Login as A Member of Vast Blog</p>
        </div>

        </div>
        <Link className='text-teal-800 absolute bottom-1 left-3  hover:animate-bounce' to='/'>Back</Link>
        </div>
    )
}

//<button onClick={()=>dispatch(logout())}>logout</button>
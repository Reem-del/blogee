import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {useNavigate, useParams } from 'react-router-dom'
import { selectUserById, useUpdateUserMutation } from './usersSlice';
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";



export default function EditUser() {
    const {uid}=useParams();
    const navigate=useNavigate()
    const [updateUser]=useUpdateUserMutation()
    const user=useSelector(state=>selectUserById(state,Number(uid)))
    const [name,setName]=useState(user?.name);
    const [email,setEmail]=useState(user?.email);
    const [admin,setAdmin]=useState(user?.admin);
    const [profession,setProfession]=useState(user?.profession);
    const [password,setPassword]=useState(user?.password);
    const [nameValidation,setNameValidation]=useState(false);
    const [pwdValidation,setPwdValidation]=useState(false);
    const [emailValidation,setEmailValidation]=useState(false);
     console.log(user)
     const professions=['Artist','Political specialist','Doctor','Nutrisitionist','Educational', 'Journalist','Beauty specialist']

     const nameReg_Exp=/^[A-z]+ [A-z]+$/
    const emailReg_Exp= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const pwdReg_Exp=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
    
    useEffect(()=>setNameValidation(nameReg_Exp.test(name)),[name])
    useEffect(()=>setEmailValidation(emailReg_Exp.test(email)),[email])
    useEffect(()=>setPwdValidation(pwdReg_Exp.test(password)),[password]) 


    const canUpdate=[nameValidation,emailValidation,pwdValidation].every(Boolean)
      const UpdateUser=async()=>{
        try{
          if(canUpdate){
        await updateUser({id:uid,name,password,email,admin,profession})
        setName('')
        setEmail('')
        setPassword('')
        navigate('/user')
        }
      }
        catch(err){console.error('can not update user')}
      }

    return (
    
      <div className='h-screen relative bg-gradient-to-r from-indigo-950 '>
        <div className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col text-center gap-3 w-[350px] h-auto  bg-white/30 rounded-md'>
          <h3 className='pt-5 font-mono'>Update User</h3>
       <div className='relative mt-3'>
        <FaUser size={20} className='absolute left-[20%] top-2 text-purple-700 '/>
       <input type='text' value={name} onChange={(e)=>setName(e.target.value)}  className='pl-12 w-64 h-9 bg-slate-200 rounded-full'/>
        </div>
        {(!nameValidation && name?.length > 2) && <p className='text-sm font-mono'>Name format is not validated!!</p>} 


        <div className='relative mt-3'>
        <MdEmail size={20} className='absolute left-[20%] top-2 text-purple-700'/>
        <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} className='pl-12 w-64 h-9 bg-slate-200 rounded-full'/>
        </div>
        {(!emailValidation && email?.length > 3) && <p className='text-sm font-mono'>Email format is not validated!!</p>} 
        
        <div className='relative mt-3'>
        <RiLockPasswordFill size={20} className='absolute left-[20%] top-2 text-purple-700'/>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='pl-12 w-64 h-9 bg-slate-200 rounded-full'/>
        </div>
        {(!pwdValidation && password?.length > 2) && <p className='text-sm font-mono'>password format is not validated!!</p>} 

        <select name='profession' value={profession} className='w-64 h-9 rounded-full ml-12 mt-2 text-sm px-2 font-mono bg-slate-200' onChange={(e)=>setProfession(e.target.value)}>
          <option>select user profession</option>
          {professions.map(prof=><option value={prof} >{prof}</option>)}
        </select>

        <label>admin<input type='checkBox'  checked={admin} onChange={()=>setAdmin(!admin)} /></label>
        <button onClick={UpdateUser} className=' bg-purple-700 shadow-lg font-mono text-white w-36 ml-[30%] my-3 h-9 rounded-full hover:border border-slate-100' >Update and Save</button>
        </div>
        <Link className='text-gray-400 absolute bottom-1 left-3 hover:animate-bounce' to='/user'>Back</Link>
        </div>
  
      
    
    )
}

    
      
    


import React, { useEffect } from 'react'
import { useCreateUserMutation, selectAllUsers,useGetUsersQuery } from './usersSlice'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';



function AddUser() {
  const {isLoading}=useGetUsersQuery()
  const users=useSelector(selectAllUsers)
    const [addUser]=useCreateUserMutation()
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [exist,setExist]=useState(false);
    const [admin,setAdmin]=useState(false);
    const [profession,setProfession]=useState('');
    const [nameValidation,setNameValidation]=useState(false);
    const [pwdValidation,setPwdValidation]=useState(false);
    const [emailValidation,setEmailValidation]=useState(false);
    
    const professions=['Art specialist','Political specialist','Doctor','Nutrisitionist','Educational', 'Journalist','Beauty specialist']

    const nameReg_Exp=/^[A-z]+ [A-z]+$/
    const emailReg_Exp= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const pwdReg_Exp=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

    const navigate=useNavigate()
 useEffect(()=>setExist(users.find(user=>user.name === name && user.email === email && user.password === password)),[ name])

  useEffect(()=>setNameValidation(nameReg_Exp.test(name)),[name])
  useEffect(()=>setEmailValidation(emailReg_Exp.test(email)),[email])
  useEffect(()=>setPwdValidation(pwdReg_Exp.test(password)),[password]) 
 console.log(`name ${nameValidation}`)
 console.log(`email ${emailValidation}`)
 console.log(`pwd ${pwdValidation}`)


 const canSave=[nameValidation,emailValidation,pwdValidation,!exist].every(Boolean) && !isLoading
      console.log(`admin ${admin}`)

   async function SaveUser(){
    try{
      if(canSave){
    await addUser({name,email,password,admin,profession})
    setName('')
    setEmail('')
    navigate('/user')}

    }
    catch(err){console.error('can not save User')}
    
   }
   console.log(canSave)
   console.log(profession)
    return (
      
      <div className='flex flex-row h-screen bg-gradient-to-r from-indigo-950 justify-center items-center'>
      <div className='relative w-1/2'>
        <div className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col text-center gap-3 w-[350px] h-auto bg-white/30 rounded-md'>
          <h3 className='pt-5 font-mono'>Add User</h3>
       <div className='relative mt-3'>
        <FaUser size={20} className='absolute left-[20%] top-2 text-purple-700 '/>
       <input type='text' value={name} onChange={(e)=>setName(e.target.value)}  className='pl-10 w-60 h-9 bg-slate-200 rounded-full'/>
        </div>
        {(!nameValidation && name.length > 2) && <p className='text-sm font-mono'>Name format is not validated!!</p>} 

        <div className='relative mt-3'>
        <MdEmail size={20} className='absolute left-[20%] top-2 text-purple-700'/>
        <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} className='pl-10 w-60 h-9 bg-slate-200 rounded-full'/>
        </div>
        {(!emailValidation && email.length > 3) && <p className='text-sm font-mono'>Email format is not validated!!</p>} 
        
        <div className='relative mt-3'>
        <RiLockPasswordFill size={20} className='absolute left-[20%] top-2 text-purple-700'/>
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='pl-10 w-60 h-9 bg-slate-200 rounded-full'/>
        </div>
        {(!pwdValidation && password.length > 2) && <p className='text-sm font-mono'>password format is not validated!!</p>} 
        <select name='profession' value={profession} className='w-60 h-9 rounded-full ml-14 my-2 text-sm pl-2 font-mono bg-slate-200' onChange={(e)=>setProfession(e.target.value)}>
          <option>select user profession</option>
          {professions.map(prof=><option value={prof} >{prof}</option>)}
        </select>
        
        <label>admin<input type='checkBox'  onChange={()=>setAdmin(!admin)} /></label>
        <button onClick={SaveUser} className=' bg-purple-700 text-white w-32 ml-[31%] my-4 h-9 rounded-full hover:border border-slate-100' >Add User</button>
        {exist ? <p className='font-mono text-sm'>ths user is existed !!</p> : ''}
        </div>
        </div>
  
    <div className='w-1/2'>
    <img src='../database.png' alt='database' className='w-full h-[500px]' />
      </div>
      <Link className='text-gray-400 absolute bottom-1 left-3 hover:animate-bounce ' to='/user'>Back</Link>
      </div>
    
    )
}

export default AddUser
 /* {Object.values(Roles).map((role)=>(<option key={role} value={role}>{role}</option>))} */
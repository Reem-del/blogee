import React, { useEffect } from 'react'
import { useAddNewPostMutation } from './postSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllUsers, useGetUsersQuery } from '../users/usersSlice'
import SubjectSelect from '../../subjectSelect'
import { Link } from 'react-router-dom'
import '../../App.css'

function AddPostForm() {
    const {data}=useGetUsersQuery()
    const users=useSelector(selectAllUsers)
    const [addNewPost,{isLoading}]=useAddNewPostMutation()
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    const [subject,setSubject]=useState('')
    const [subjects,setSubjects]=useState([])
    const [userId,setUserId]=useState('')
    const navigate=useNavigate()

    const currentUser=useSelector(state=>state.auth.user)
    const isExist=users.find(user=>user.name === currentUser.name && user.email === currentUser.email)
    console.log(isExist)

    useEffect(()=>{setSubjects(SubjectSelect(isExist?.profession))},[isExist])
    console.log(subjects)
    
    useEffect(()=>{setUserId(isExist?.id)},[isExist])
    console.log(userId)
    console.log(subjects)
    const canSave=[title,body,userId].every(Boolean) && !isLoading

    const SavePost=async()=>{
        try{
            if(canSave){
            await addNewPost({userId,subject,title,body})
            setBody('')
            setTitle('')
            navigate('/')
            }

        }
        catch(err)
            {console.error('Failed to save',err);

        }
    }

    

    return (
        <div className='bg-gray-700 h-screen'>
        <div className='absolute flex flex-col gap-3 left-[30%] top-7 p-2 w-[500px] h-auto  bg-white/30 text-orange-100'>
        <h3 className='text-lg font-bold'>Add New Post</h3>
        <hr />
        <label htmlFor='postTitle'>Post Title</label>
        <input type='text' id='postTitle' value={title} className=' h-16 p-2 text-black' onChange={(e)=>setTitle(e.target.value)} placeholder='post title ..' />
        <label htmlFor='postBody'>Content</label>
        <textarea type='text' id='postBody' className='h-24 p-3 text-black overflow-y-scroll' value={body} onChange={(e)=>setBody(e.target.value)} placeholder='post body ..' />
        <label htmlFor='subject'>Choose Subject</label>
        <select className='text-orange-950 text-md font-mono h-7' value={subject} onChange={(e)=>setSubject(e.target.value)} >
        <option >Select subject</option>
        {subjects.map(subj=>(<option className='text-md' key={subj.id} value={subj}>{subj}</option>))}
        </select>
        <button className=' bg-fuchsia-500  rounded-full h-10 w-32 ml-[35%] hover:border border-slate-300' onClick={SavePost}>Save</button>
       
        </div>
        <Link className='text-gray-400 absolute bottom-1 left-3 hover:text-fuchsia-500' to='/'>Back</Link>
        </div>
    )
}

export default AddPostForm

import React from 'react'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { useParams ,useNavigate,Link } from 'react-router-dom'
import { selectPostById,useUpdatePostMutation } from './postSlice'
import { selectAllUsers} from '../users/usersSlice'
import SubjectSelect from '../../subjectSelect'


export default function EditPostForm() {
    const {postId}=useParams();
    const users=useSelector(selectAllUsers)
    const post=useSelector((state)=>selectPostById(state,Number(postId)))
    console.log(post)
    const [updatePost,{isLoading}]=useUpdatePostMutation()
    const [title,setTitle]=useState(post?.title)
    const [body,setBody]=useState(post?.body)
    const [userId,setUserId]=useState(post?.userId)
    const [subject,setSubject]=useState(post?.subject)
    const [subjects,setSubjects]=useState([])
    const navigate=useNavigate()
    console.log(users)

    const currentUser=useSelector(state=>state.auth.user)
    const isExist=users.find(user=>user.name === currentUser.name && user.email === currentUser.email)
    console.log(isExist)

    useEffect(()=>{setSubjects(SubjectSelect(isExist?.profession))},[isExist])
    console.log(subjects)
    
    useEffect(()=>{setUserId(isExist?.id)},[isExist])

    const canSave=[title,userId,body].every(Boolean) && !isLoading
    
    const onSavePost=()=>{
        if(canSave){
        try{
        updatePost({id:post.id,title,body,userId,subject,reaction:post.reaction})
        setTitle('')
        setBody('')
        setUserId('')
        navigate('/')}
        catch(err){
            console.error('Failed To save')}

    }}
  

    return (
    
        <div className='bg-gray-700 h-screen'>
        <div className='absolute flex flex-col gap-3 left-[30%] top-7 p-2 w-[500px] h-auto  bg-white/30 text-orange-100'>
        <h3 className='text-lg font-bold'>Edit post Information </h3>
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
        <button className=' bg-fuchsia-500  rounded-full h-10 w-32 ml-[35%] hover:border border-slate-300' onClick={onSavePost}>Edit and Save</button>
       
        </div>
        <Link className='text-gray-400 absolute bottom-1 left-3 hover:text-fuchsia-500 ' to='/'>Back</Link>
        </div>
        
    )
}

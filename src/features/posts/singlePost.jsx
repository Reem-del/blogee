import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPostById, useDeletePostMutation } from './postSlice'
import { selectAllUsers, useGetUsersQuery } from '../users/usersSlice'
import TimeAgo from './timeago'
import PostAuthor from './postAuthor'
import AddReaction from './addReaction'
import { MdDelete,MdOutlineEdit  } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export default function SinglePost({postId}) {
  const {isLoading}=useGetUsersQuery()
  const [permit,setPermit]=useState(false)
  const [show,setShow]=useState(false)
    const post=useSelector(state =>selectPostById(state,postId))
    const users=useSelector(selectAllUsers)
  const [deletePost]=useDeletePostMutation()
  console.log(show)
 let classStyel='text-sm text-gray-500 pb-2 font-bold mt-1 underline underline-offset-2';
  const currentUser=useSelector(state=>state.auth.user)
  const isExist=users.find(user=>user.name === currentUser.name && user.email === currentUser.email)

  const navigate=useNavigate()  
   

  useEffect(()=>setPermit(isExist?.id === post?.userId),[currentUser])
  
  console.log(permit)
  console.log(currentUser)
    return (
      <div className='flex flex-row flex-wrap h-auto rounded-md border-b-2 border-r-4 border-r-rose-800 border-teal-800 '>
      <div className='flex flex-col w-[90%] gap-4 ml-5 pt-2 '>
      <div className='flex flex-row gap-3  '>
      <p className='font-bold text-xl font-mono underline underline-offset-2'>{post.title}</p>
      <PostAuthor userId={post.userId} classStyle={classStyel} />
      </div>
      <p className='break-all text-lg  text-neutral-600 '>{!show && post.body.length > 250 ? `${post.body.substring(0,250)}.....` : post.body }</p>
      {post.body.length > 250 && <i className='text-sm -mt-3 cursor-pointer text-rose-700' onClick={()=>setShow(!show)}>Read More</i>}
      <div className='flex flex-row space-x-4'>
      <TimeAgo timestamp={post.date} />
      <AddReaction post={post} />
      </div>
      </div>
      <div className='flex flex-row gap-4 pt-2'>
      {permit  && <MdOutlineEdit size={20} onClick={()=>navigate(`/post/edit/${post.id}`)} />}
      {permit && <MdDelete size={20} onClick={()=>deletePost({id:postId})} />}
      </div>
      </div>
     )
}
/*
<div className='flex flex-col bg-gray-500 gap-3'>
<div className='flex flex-row '>
<p className='ml-2 mx-auto'>{post.title}</p>
<MdOutlineEdit onClick={()=>navigate(`/post/edit/${post.id}`)} className='mr-3' />
<MdDelete onClick={()=>deletePost({id:postId})} className='mr-3' />
</div>
<p>{post.body}</p>
<div className='flex flex-row justify-between px-4'>
<TimeAgo timestamp={post.date} />
<PostAuthor userId={post.userId} />
<AddReaction post={post} />
</div>

</div>
*/
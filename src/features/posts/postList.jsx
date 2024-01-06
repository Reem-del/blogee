import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { subjects } from '../../subjects'
import SinglePost from './singlePost'
import { useSelector} from 'react-redux'
import { useGetPostBySubjectQuery ,useGetPostsQuery} from './postSlice'

export default function PostList() {
    const {sub}=useParams()
    const navigate=useNavigate()
    const {data}= useGetPostBySubjectQuery(sub)
    const {isLoading,isSuccess,isError,error}= useGetPostsQuery()
    const user=useSelector(state=>state.auth.user)
    console.log(user)
   
 
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = data?.ids.map(postId =><SinglePost key={postId} postId={postId}/>)
    } else if (isError) {
        content =<p>{error}</p>;}

console.log(data?.ids)

    const [selectedSub]=subjects.filter(subj=>subj.title === sub)

   const  {src,title}=selectedSub
  
    
    return (
        <div className='relative  h-screen ' >
        <div className='flex flex-row gap-5 ml-5 w-[1000px] p-3 border-b-2 border-b-rose-800 '>
        <img src={`${src}`} alt={title} className='w-26 h-20 mb-2 rounded-full' />
        <h3 className='font-bold mt-6 text-2xl text-neutral-600 font-serif'>{title} Article</h3>
        </div>
        <div className='absolute right-3 top-2 flex flex-row gap-2 underline'>
        <p className='cursor-pointer text-teal-700 -mt-1 hover:text-rose-800' onClick={()=>navigate('/post')}>Add Post</p>
          <p className='cursor-pointer text-teal-700 -mt-1 hover:text-rose-800' onClick={()=>navigate('/user')}>Admin</p>
     </div>

        <div className='flex flex-col m-4 w-[1000px] gap-6' >
            {content}
        </div>

        </div>
    )
}

import React from 'react'
import { useGetPostByUserIdQuery, useGetPostsQuery } from './postSlice'
import { useParams} from 'react-router-dom'
import SinglePost from './singlePost'
import PostAuthor from './postAuthor'

function GetpostbyUserid() {
    const {userId}=useParams()
    const {isLoading,isSuccess,isError,error}= useGetPostsQuery()
    const {data}= useGetPostByUserIdQuery(userId)
    console.log(data)
    let classStyel2='text-2xl  text-rose-600 '
    
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = data?.ids.map(postId =><SinglePost key={postId} postId={postId}/>)
    } else if (isError) {
        content =<p>{error}</p>;}
   
    return (
        <div>
            <div className='flex flex-row gap-2 ml-4 w-[800px] p-5 font-bold  font-serif text-neutral-600 border-b-2 border-b-rose-800 '>
            <h3 className='text-xl'>Posts written </h3>
            <PostAuthor userId={userId} classStyle={classStyel2}/> 
            </div>

            {content}
        </div>
    )
}

export default GetpostbyUserid

import React from 'react'
import { useState } from 'react'
import {FcLike } from 'react-icons/fc'
import {AiFillLike} from 'react-icons/ai'
import { useAddReactionMutation } from './postSlice'
import { FaRegSmileWink ,FaRegFrown } from "react-icons/fa";


const Emoji={
   "like":<AiFillLike/>,
   "smile":<FaRegSmileWink  />,
   "love":<FcLike />,
   "frown":<FaRegFrown  />
}


export default function AddReaction({post}) {
    const [action,setAction]=useState(0)
    const [addReaction]=useAddReactionMutation()
    console.log(action)
    return (
        <div className='flex fex-row gap-2'>
         {Object.entries(Emoji).map(([name,emoji])=>(
            <button 
            key={name}
            onClick={()=>{
            if(action ===0){
            const newvalue=post.reaction[name]+ 1;
            addReaction({postId:post.id,reaction:{...post.reaction,[name]:newvalue}})
            setAction(1)
            
            }
            }}
            >{emoji }{post.reaction[name]}</button>
         ))}
        </div>
    )
}


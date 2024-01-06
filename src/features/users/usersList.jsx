import React from 'react'
import { useSelector } from 'react-redux'
import {MdOutlineEdit, MdDelete} from "react-icons/md";
import { PiPlusCircle } from "react-icons/pi";
import { selectAllUsers,useGetUsersQuery,useDeleteUserMutation } from './usersSlice'
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../App.css'

function UsersList() {
    const {isLoading}=useGetUsersQuery()
    const users=useSelector(selectAllUsers)
    const [deleteUser]=useDeleteUserMutation()
    const navigate=useNavigate()
  
    
    return (
        <div className='flex flex-col text-center  bg-gradient-to-r from-indigo-950  to-indigo-300   h-screen gap-6 '>
            <h2 className='mt-5 font-mono underline font-extrabold text-xl text-purple-900'>ALL USER</h2>
        {!isLoading &&
        <table className='bg-white/50 ml-[13%] text-center text-md rounded-md w-[900px] '>
        <thead>
        <tr>
            <td className='border space-x-1 '>User Name</td>
            <td className='border space-x-1 '>User Email</td>
            <td className='border space-x-1 '>Profession</td>
            <td className='border space-x-1 '>Admin</td>
            <td className='border space-x-1 '>posts</td>
            
        </tr>
        </thead>
        <tbody>
        {users.map(user=><tr className={`${user.admin && `bg-purple-800 text-white`}`}>
        <td className='border space-x-1'>{user.name}</td>
        <td className='border space-x-1'>{user.email}</td>
        <td className='border space-x-1'>{user.profession}</td>
        <td className='border space-x-1'>{user?.admin && <FaCheck />}</td>
        <td className='border space-x-1'><Link to={`/post/${user.id}`} >get all Posts</Link></td>
        <td className='border space-x-1'>
        <div className='flex flex-row justify-between text-teal-100'>
    <MdOutlineEdit size={20} onClick={()=>navigate(`/user/edit/${user.id}`)}  />
       <MdDelete size={20} onClick={()=>deleteUser({id:user.id})} />
        </div></td>
        </tr>)
}

</tbody>
</table>
}
     <div className='flex flex-row gap-3 ml-[13%] underline'>
        <PiPlusCircle size={18} className='text-purple-300'/>
        <p className=' cursor-pointer text-purple-200' onClick={()=>navigate('./add')}>Add User</p>
     </div>
     <Link className='text-gray-400 absolute bottom-1 left-3 hover:text-purple-700 animate-bounce' to='/'>Back</Link>
        </div>
    )
}

export default UsersList

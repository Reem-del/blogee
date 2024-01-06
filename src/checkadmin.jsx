import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



export default function Checkadmin() {
    const exist=useSelector(state=>state.auth.exist)
    const {admin}=exist
    console.log(admin)
   

  
    return (
        <div>
       {admin ? <Outlet /> :<Navigate to='/' />  }    
        </div>
    )
}

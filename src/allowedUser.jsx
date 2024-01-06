import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'




function AllowedUser() {
  const exist=useSelector(state=>state.auth.exist)
    console.log(exist)
    return (
        <div>
    {exist ? <Outlet /> :<Navigate to='/login' />  }      
        </div>
    )
}

export default AllowedUser

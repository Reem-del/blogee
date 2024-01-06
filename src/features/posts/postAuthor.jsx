
import { useSelector } from 'react-redux'
import { selectAllUsers, useGetUsersQuery } from '../users/usersSlice'

export default function PostAuthor({userId,classStyle}) {
    const{isLoading}=useGetUsersQuery()
    const users=useSelector(selectAllUsers)
   const author=users.find(user=>user.id === Number(userId))
    return (
        <div className={`${classStyle}`}>
            {! isLoading && 
           author ? <p>
            BY {author.name}
            </p> : ''}
        </div>
    )
}
//text-sm text-gray-500 pb-2 font-bold mt-1 underline underline-offset-2
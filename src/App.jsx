import PostList from './features/posts/postList'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import AddPostForm from './features/posts/addPostForm'
import EditPostForm from './features/posts/editPostForm'
import UsersList from './features/users/usersList'
import SinglePost from './features/posts/singlePost'
import AddUser from './features/users/addUser'
import EditUser from './features/users/editUser'
import Login from './login'
import AllowedUser from './allowedUser'
import Checkadmin from './checkadmin'
import Home from './home'
import GetpostbyUserid from './features/posts/getpostbyUserid'

function App() {
  

  return (
    
    <BrowserRouter>
     <Routes>
    <Route path='/' element={<Home />} />
    <Route path='postList/:sub' element={<PostList />} />
    <Route path='login' element={<Login />} />
    <Route  element={<AllowedUser  />}>
   <Route path='post'>
   <Route index element={<AddPostForm />} />
   <Route path='singlepost' element={<SinglePost />} />
   <Route path='edit/:postId' element={<EditPostForm />} />
   <Route path=':userId' element={<GetpostbyUserid />} />
  </Route>
  <Route element={<Checkadmin />} >
  <Route path='user'>
   <Route index element={<UsersList />} />
   <Route path='add' element={<AddUser />} />
   <Route path='edit/:uid' element={<EditUser />} />
   </Route>
   </Route>
   </Route>
  

     
     </Routes>
       
    </BrowserRouter>
    
  )
}

export default App

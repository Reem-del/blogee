import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'auth',
    initialState:{
        user:JSON.parse(sessionStorage.getItem("authUser"))|| {
        name:'',
        email:'',
        password:'',
        },
        exist:JSON.parse(sessionStorage.getItem("exist")) || ''
    },
    reducers:{
    login(state,action){
        const userId=action.payload
        state.user=userId
        const saveState=JSON.stringify(userId)
        sessionStorage.setItem("authUser",saveState)
    },
    logout(state){
        state.user.name=''
        state.user.email=''
        state.user.password=''
        state.exist=''
        sessionStorage.clear();
    },

 checkExist(state,action){
    const userId=action.payload
    state.exist=action.payload
    const saveExist=JSON.stringify(userId)
    sessionStorage.setItem("exist",saveExist)
},
    }
    
})
export const {login,logout,checkExist}=userSlice.actions
export default userSlice.reducer
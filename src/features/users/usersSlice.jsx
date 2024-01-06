import { createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

const userAdapter=createEntityAdapter()

const initialState=userAdapter.getInitialState()

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>'/users',
            transformResponse:responseData=>{
            return userAdapter.setAll(initialState,responseData)
            },
            providesTags:(result,error,arg)=>[
                {type:"User",id:"LIST"},
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        createUser:builder.mutation({
            query:newUser=>({
                url:'/users',
                method:'POST',
                body:newUser
            }),
            invalidatesTags:[{type:"User",id:"LIST"}]
        }),
        updateUser:builder.mutation({
            query:updatedUser=>({
            url:`/users/${updatedUser.id}`,
            method:'PUT',
            body:updatedUser
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser:builder.mutation({
            query:({id})=>({
                url:`/users/${id}`,
                method:'DELETE',
                body:{id}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        })
    })
})
export const {useGetUsersQuery,useCreateUserMutation,useDeleteUserMutation,useUpdateUserMutation}=userApiSlice
export const selectUsersResult =userApiSlice.endpoints.getUsers.select()

export const selectUsersData=createSelector(
    selectUsersResult,
    usersResult=>usersResult.data

)
export const {
selectAll:selectAllUsers,
selectById: selectUserById,
selectIds: selectUserIds
} = userAdapter.getSelectors(state=>selectUsersData(state) ?? initialState)

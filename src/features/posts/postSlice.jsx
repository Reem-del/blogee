import {createSelector,createEntityAdapter} from '@reduxjs/toolkit'
import {sub} from 'date-fns';
import { apiSlice } from '../api';

const postAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})
const initialState=postAdapter.getInitialState()

 export const extendedApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getPosts:builder.query({
            query:()=>'/posts',
            transformResponse:responseData=>{
                let min=1;
                const loadedPost=responseData.map((post)=>{
                if(!post?.date) post.date=sub(new Date(),{minute:min++}).toISOString();
                if(!post?.reaction) post.reaction={
                    "like":0,
                    "smile":0,
                    "love":0,
                    "frown":0,
                    
                }
            
            
            return post
        });
        return postAdapter.setAll(initialState,loadedPost)
    },
    providesTags:(result,error,arg)=>[{type:'post',id:'LIST'},
    ...result.ids.map(id => ({ type: 'Post', id }))]
    }),

    getPostByUserId:builder.query({
        query:id=>`/posts/?userId=${id}`,
        transformResponse:responseData=>{
        let min=1;
                const loadedPost=responseData.map((post)=>{
                if(!post?.date) post.date=sub(new Date(),{minute:min++}).toISOString();
                if(!post?.reaction) post.reaction={
                    "like":0,
                    "smile":0,
                    "love":0,
                    "frown":0,
                    }
            
            return post
    })
    return postAdapter.setAll(initialState,loadedPost)
},
providesTags: (result, error, arg) => [
    ...result.ids.map(id => ({ type: 'Post', id }))
]

}),
getPostBySubject:builder.query({
    query:subject=>`/posts/?subject=${subject}`,
    transformResponse:responseData=>{let min=1;
                const loadedPost=responseData.map((post)=>{
                if(!post?.date) post.date=sub(new Date(),{minute:min++}).toISOString();
                if(!post?.reaction) post.reaction={
                    "like":0,
                    "smile":0,
                    "love":0,
                    "frown":0,
                    }
            
            return post
    })
    return postAdapter.setAll(initialState,loadedPost)
},
providesTags: (result, error, arg) => [
    ...result.ids.map(id => ({ type: 'Post', id }))
]

}),

addNewPost:builder.mutation({
    query:initialPost=>({
        url:"/posts",
        method:"POST",
        body:{
            ...initialPost,
            date:new Date().toISOString(),
            reaction:{
                "like":0,
                "smile":0,
                "love":0,
                "frown":0,
                
            }
            }
        }),
        invalidatesTags:[{type:"post",id:"List"}]
    
}),
updatePost:builder.mutation({
 query:initialPost=>({
  url:`/posts/${initialPost.id}`,
  method:"PUT",
  body:{...initialPost,
  date:new Date().toISOString()
  }
 }),
 invalidatesTags:(result,err,arg)=>[
    { type: 'Post', id: arg.id }
            
 ]
}),
deletePost: builder.mutation({
    query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: { id }
    }),
    invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.id }
    ]
}),

addReaction:builder.mutation({
query:({postId,reaction})=>({
    url:`/posts/${postId}`,
    method:"PATCH",
    body:{reaction}
}),
invalidatesTags: (result, error, arg) => [
    { type: 'Post', id: arg.id }
]

})
 })
})

 export const {useGetPostsQuery,useGetPostBySubjectQuery,
    useAddNewPostMutation,
    useGetPostByUserIdQuery,
    useDeletePostMutation,
    useUpdatePostMutation,useAddReactionMutation}=extendedApiSlice

 export const selectPostsResult=extendedApiSlice.endpoints.getPosts.select()

 const selectPostsData=createSelector(selectPostsResult,
    postsResult=>postsResult.data)

    export const {
        selectAll:selectAllPosts,
        selectById: selectPostById,
        selectIds: selectPostIds
    }=postAdapter.getSelectors(state=>selectPostsData(state) ?? state)

  

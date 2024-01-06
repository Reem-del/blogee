import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api";
import userReducer from "./userReducer";

export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:userReducer
    },
    middleware:getDefaultMiddleWare=>getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools:true
})
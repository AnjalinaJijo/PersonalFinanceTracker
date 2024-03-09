import { configureStore } from "@reduxjs/toolkit";

//A Next.js server can handle multiple requests simultaneously. 
//This means that the Redux store should be created per request 
//and that the store should not be shared across requests.
//makeStore function creates a redux store per request
//creating a Redux Store per Request
export const makeStore = ()=>{
    return configureStore({
        reducer:{}
    })
}
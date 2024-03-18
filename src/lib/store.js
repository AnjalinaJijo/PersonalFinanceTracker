import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"
import expenseReducer from "./features/expense/expenseSlice"
import incomeReducer from "./features/income/incomeSlice"
import goalReducer from "./features/goal/goalSlice"
import subscriptionReducer from "./features/subscription/subscriptionSlice"
import globalReducer from "./features/globalSlice"



//A Next.js server can handle multiple requests simultaneously. 
//This means that the Redux store should be created per request 
//and that the store should not be shared across requests.
//makeStore function creates a redux store per request
//creating a Redux Store per Request
export const makeStore = ()=>{
    return configureStore({
        reducer:{
            auth:authReducer,
            expense:expenseReducer,
            income:incomeReducer,
            goal:goalReducer,
            subscription:subscriptionReducer,
            global:globalReducer,
        },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    })
}
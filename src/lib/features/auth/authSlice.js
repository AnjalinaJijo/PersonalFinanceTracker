import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import { AppThunk } from "@/lib/store";
import { login } from "./authAPI";

const authSlice = createSlice({
    name:'auth',
    initialState:{user:null,token:null,status:'idle'},
    reducers:{
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        },
        // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
        loginAPI:createAsyncThunk(
            async (username,password)=>{
                const response = await login(username,password)
                // The value we return becomes the `fulfilled` action payload
                return response.data;
            },
            {
                pending: (state) => {
                  state.status = "loading";
                },
                fulfilled: (state, action) => {
                  state.status = "idle";
                  state.user = action.payload;
                },
                rejected: (state) => {
                  state.status = "failed";
                },
            }
        )
    }
})

export const { setCredentials, logOut ,loginAPI} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
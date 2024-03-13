import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


//create thunk
export const login = createAsyncThunk(
    "login/fetch",
    async (credentials) => {
        // console.log("authAPI called")
        const response = await fetch("http://localhost:3500/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(credentials)
        })
    const result = await response.json();
    // console.log("result inside AUthAPi",result)
  
    return result;

    })


const authSlice = createSlice({
    name:'auth',
    initialState:{user:null,token:null,},
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
        //for thunk
        extraReducers:(builder)=>{
            builder.addCase(login.fulfilled,(state,action)=>{
                //action contains the data returned from fetch
                state.user=action.payload
            })
        }
       
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer


export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
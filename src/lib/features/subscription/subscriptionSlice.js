import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const subscriptionSlice = createSlice({
    name:'subscription',
    initialState:{subscriptionArray:[],triggered:false},
    reducers:{
        setSubscriptionArray: (state, action) => {
            // console.log('inside Subscription Array',action.payload)
            state.subscriptionArray = action.payload
            state.subscriptionArray = action.payload
        },
        setTriggered: (state, action) => {
            state.triggered = action.payload
        },
    }
})

export const { setSubscriptionArray,setTriggered } = subscriptionSlice.actions

export default subscriptionSlice.reducer


export const selectSubscriptionArray = (state) => state.subscription.subscriptionArray
export const selectTriggered = (state) => state.subscription.Triggered

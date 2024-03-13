import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const subscriptionSlice = createSlice({
    name:'subscription',
    initialState:{subscriptionArray:[]},
    reducers:{
        setSubscriptionArray: (state, action) => {
            // console.log('inside Subscription Array',action.payload)
            state.subscriptionArray = action.payload
        },
    }
})

export const { setSubscriptionArray } = subscriptionSlice.actions

export default subscriptionSlice.reducer


export const selectSubscriptionArray = (state) => state.subscription.subscriptionArray

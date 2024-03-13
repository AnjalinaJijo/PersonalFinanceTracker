import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const goalSlice = createSlice({
    name:'goal',
    initialState:{goalArray:[]},
    reducers:{
        setGoalArray: (state, action) => {
            // console.log('inside Goal Array',action.payload)
            state.goalArray = action.payload
        },
    }
})

export const { setGoalArray } = goalSlice.actions

export default goalSlice.reducer


export const selectGoalArray = (state) => state.goal.goalArray

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const incomeSlice = createSlice({
    name:'income',
    initialState:{incomeArray:[], monthlyIncome:[]},
    reducers:{
        setIncomeArray: (state, action) => {
            // console.log('inside Income Array',action.payload)
            state.incomeArray = action.payload
        },
        setMonthlyIncome: (state, action) => {
            state.monthlyIncome = action.payload
        },

    }
})

export const { setIncomeArray, setMonthlyIncome } = incomeSlice.actions

export default incomeSlice.reducer


export const selectIncomeArray = (state) => state.income.incomeArray
export const selectMonthlyIncome = (state) => state.income.monthlyIncome
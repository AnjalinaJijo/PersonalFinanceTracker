import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const incomeSlice = createSlice({
    name:'income',
    initialState:{incomeArray:[], monthlyIncome:[], totalIncome:0},
    reducers:{
        setIncomeArray: (state, action) => {
            // console.log('inside Income Array',action.payload)
            state.incomeArray = action.payload
        },
        setMonthlyIncome: (state, action) => {
            state.monthlyIncome = action.payload
        },
        setTotalIncome: (state, action) => {
            state.totalIncome = action.payload
        },

    }
})

export const { setIncomeArray, setMonthlyIncome, setTotalIncome } = incomeSlice.actions

export default incomeSlice.reducer


export const selectIncomeArray = (state) => state.income.incomeArray
export const selectMonthlyIncome = (state) => state.income.monthlyIncome
export const selectTotalIncome = (state) => state.income.totalIncome
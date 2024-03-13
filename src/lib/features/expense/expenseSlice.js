import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const expenseSlice = createSlice({
    name:'expense',
    initialState:{expenseArray:[],monthlyExpense:[],categoryExpense:[],totalExpense:0},
    reducers:{
        setExpenseArray: (state, action) => {
            // console.log('inside Expense Array',action.payload)
            state.expenseArray = action.payload
        },
        setMonthlyExpense: (state, action) => {
            state.monthlyExpense = action.payload
        },
        setCategoryExpense: (state, action) => {
            state.categoryExpense = action.payload
        },
        setTotalExpense: (state, action) => {
            state.totalExpense = action.payload
        },
        

    }
})

export const { setExpenseArray,setMonthlyExpense, setCategoryExpense, setTotalExpense } = expenseSlice.actions

export default expenseSlice.reducer


export const selectExpenseArray = (state) => state.expense.expenseArray
export const selectMonthlyExpense = (state) => state.expense.monthlyExpense
export const selectCategoryExpense = (state) => state.expense.categoryExpense
export const selectTotalExpense = (state) => state.expense.totalExpense
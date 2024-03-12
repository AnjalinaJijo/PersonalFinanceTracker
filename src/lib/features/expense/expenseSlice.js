import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


//create thunk
// export const fetchExpense = createAsyncThunk(
//     "expense/fetch",
//     async (credentials) => {
//         console.log("expense Fetch called")
//         const response = await fetch("http://localhost:3500/login",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(credentials)
//         })
//     const result = await response.json();
//     console.log("result inside AUthAPi",result)
  
//     return result;

//     })


const expenseSlice = createSlice({
    name:'expense',
    initialState:{expenseArray:[],monthlyExpense:[]},
    reducers:{
        setExpenseArray: (state, action) => {
            // console.log('inside Expense Array',action.payload)
            state.expenseArray = action.payload
        },
        setMonthlyExpense: (state, action) => {
            state.monthlyExpense = action.payload
        },
        

    }
})

export const { setExpenseArray,setMonthlyExpense } = expenseSlice.actions

export default expenseSlice.reducer


export const selectExpenseArray = (state) => state.expense.expenseArray
export const selectMonthlyExpense = (state) => state.expense.monthlyExpense
import { createSlice } from "@reduxjs/toolkit";
import { DateFormatter } from "../../../components/DateFormatter";

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expenseArray: [],
        monthlyExpense: [],
        categoryExpense: [],
        totalExpense: 0,
        // formattedCurrentDate: DateFormatter(),
        editedValue: {
            "ExpenseID": null,
            "Date": "",
            "Activity": "",
            "Category": "",
            "Amount": 0,
            "Description": ""
        },
    },
    reducers: {
        setExpenseArray: (state, action) => {
            state.expenseArray = action.payload;
        },
        setMonthlyExpense: (state, action) => {
            state.monthlyExpense = action.payload;
        },
        setCategoryExpense: (state, action) => {
            state.categoryExpense = action.payload;
        },
        setTotalExpense: (state, action) => {
            state.totalExpense = action.payload;
        },
        setEditedValue: (state, action) => {
            state.editedValue.ExpenseID = action.payload.ExpenseID;
            state.editedValue.Date = action.payload.Date;
            state.editedValue.Activity = action.payload.Activity;
            state.editedValue.Category = action.payload.Category;
            state.editedValue.Amount = action.payload.Amount;
            state.editedValue.Description = action.payload.Description;
        },
    },
});

export const { setExpenseArray, setMonthlyExpense, setCategoryExpense, setTotalExpense, setEditedValue } = expenseSlice.actions;

export default expenseSlice.reducer;

export const selectExpenseArray = (state) => state.expense.expenseArray;
export const selectMonthlyExpense = (state) => state.expense.monthlyExpense;
export const selectCategoryExpense = (state) => state.expense.categoryExpense;
export const selectTotalExpense = (state) => state.expense.totalExpense;
export const selectEditedValue = (state) => state.expense.editedValue;

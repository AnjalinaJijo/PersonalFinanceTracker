import { createSlice } from "@reduxjs/toolkit";
import { DateFormatter } from "../../../components/DateFormatter";

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expenseArray: [],
        monthlyExpense: [],
        categoryExpense: [],
        categoryCurrMonthExpense: [],
        totalExpense: 0,
        formattedCurrentDate: DateFormatter(),
        editedValue: {
            "ExpenseID": null,
            "Date": DateFormatter(),
            "Activity": "",
            "Category": "",
            "Amount": 0,
            "Description": ""
        },
        triggered:false,
        editItemID:null,
        categoryItems:[
            {
              key:"Grocery",
              category:"Grocery"
            },
            {
              key:"Transport",
              category:"Transport"
            },
            {
              key:"Food",
              category:"Food"
            },
             {
              key:"HealthCare",
              category:"HealthCare"
            },
             {
              key:"SkinCare",
              category:"SkinCare"
            },
             {
              key:"Entertainment",
              category:"Entertainment"
            },
             {
              key:"Restaurant",
              category:"Restaurant"
            },
             {
              key:"Vacation",
              category:"Vacation"
            },
             {
              key:"Education",
              category:"Education"
            },
            {
              key:"Other",
              category:"Other"
            }
          ],
          addNew:null,
          popupVisible:false,
          
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
        setCategoryCurrMonthExpense: (state, action) => {
            state.categoryCurrMonthExpense = action.payload;
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
        setTriggered: (state, action) => {
            state.triggered = action.payload;
        },
        setEditItemID: (state, action) => {
            state.editItemID = action.payload;
        },
        setCategoryItems: (state, action) => {
            state.categoryItems.push(action.payload);
        },
        setAddNew: (state, action) => {
            state.addNew = action.payload;
        },
        setPopupVisible: (state, action) => {
            state.popupVisible = action.payload;
        },
        
    },
});

export const { setExpenseArray, setMonthlyExpense, setCategoryExpense, setTotalExpense, setEditedValue,setTriggered, setEditItemID, setCategoryItems, setAddNew, setPopupVisible, setCategoryCurrMonthExpense } = expenseSlice.actions;

export default expenseSlice.reducer;

export const selectExpenseArray = (state) => state.expense.expenseArray;
export const selectMonthlyExpense = (state) => state.expense.monthlyExpense;
export const selectCategoryExpense = (state) => state.expense.categoryExpense;
export const selectTotalExpense = (state) => state.expense.totalExpense;
export const selectEditedValue = (state) => state.expense.editedValue;
export const selectFormattedCurrentDate = (state) => state.expense.formattedCurrentDate;
export const selectTriggered = (state) => state.expense.triggered;
export const selectEditItemID = (state) => state.expense.editItemID;
export const selectCategoryItems = (state) => state.expense.categoryItems;
export const selectAddNew = (state) => state.expense.addNew;
export const selectPopupVisible = (state) => state.expense.selectPopupVisible;
export const selectCategoryCurrMonthExpense = (state) => state.expense.categoryCurrMonthExpense;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { DateFormatter } from "../../../components/DateFormatter";

const incomeSlice = createSlice({
    name:'income',
    initialState:{incomeArray:[], 
        monthlyIncome:[],
        totalIncome:0,
        categoryIncome: [],
        categoryCurrMonthIncome: [],
        formattedCurrentDate: DateFormatter(),
        editedValue: {
            "IncomeID":null, "Date": DateFormatter(), "Name": "", "Amount": 0, "Description": "" 
        },
        triggered:false,
        editItemID:null,
        addNew:null,
        popupVisible:false,
        },
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


        setCategoryCurrMonthIncome: (state, action) => {
            state.categoryCurrMonthIncome = action.payload;
        },
        setEditedValue: (state, action) => {
            state.editedValue.IncomeID = action.payload.IncomeID;
            state.editedValue.Date = action.payload.Date;
            state.editedValue.Name = action.payload.Name;
            state.editedValue.Amount = action.payload.Amount;
            state.editedValue.Description = action.payload.Description;
        },
        setTriggered: (state, action) => {
            state.triggered = action.payload;
        },
        setEditItemID: (state, action) => {
            state.editItemID = action.payload;
        },
        setAddNew: (state, action) => {
            state.addNew = action.payload;
        },
        setPopupVisible: (state, action) => {
            state.popupVisible = action.payload;
        },

    }
})

export const { setIncomeArray, setMonthlyIncome, setTotalIncome,
setEditedValue,setTriggered, setEditItemID, setAddNew, setPopupVisible, setCategoryCurrMonthIncome
} = incomeSlice.actions

export default incomeSlice.reducer


export const selectIncomeArray = (state) => state.income.incomeArray
export const selectMonthlyIncome = (state) => state.income.monthlyIncome
export const selectTotalIncome = (state) => state.income.totalIncome
export const selectEditedValue = (state) => state.income.editedValue;
export const selectFormattedCurrentDate = (state) => state.income.formattedCurrentDate;
export const selectTriggered = (state) => state.income.triggered;
export const selectEditItemID = (state) => state.income.editItemID;
export const selectAddNew = (state) => state.income.addNew;
export const selectPopupVisible = (state) => state.income.popupVisible;
export const selectCategoryCurrMonthIncome = (state) => state.income.categoryCurrMonthIncome;

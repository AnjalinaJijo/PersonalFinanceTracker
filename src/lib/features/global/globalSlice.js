import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Current Date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); //+1 to make the figure from 1 to 12 instead of 0 to 11
const day = String(currentDate.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

const lastMonth= month===12?1:month-1

const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","All"];

const globalSlice = createSlice({
  name: "global",
  initialState: {
    triggered: false,
    formattedCurrentDate: formattedDate,
    currYear: year,
    currMonth: month,
    currentMonthAbbreviation: months[month - 1],
    lastMonth:lastMonth,
    lastMonthAbbrev:months[lastMonth - 1],

    availableYears:[{key:2024,value:2024},],
    doughnutExpenseSum:{},//Category wise expense summed for doughnut chart
    selectedYear:year,//present Year
    selectedMonth:"All",//present Month Abbreviated (eg "Jan","Feb",..)
    months:months,//month abbrevs
  },
  reducers: {
    setTriggered: (state, action) => {
      state.triggered = action.payload;
    },
    setAvailableYears: (state, action) => {
      state.availableYears = action.payload;
    },
    setDoughnutExpenseSum: (state, action) => {
      state.doughnutExpenseSum = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setTriggered, setAvailableYears, setDoughnutExpenseSum, setSelectedYear , setSelectedMonth} = globalSlice.actions;

export default globalSlice.reducer;

export const selectTriggered = (state) =>
  state.global.triggered;
export const  selectFormattedCurrentDate = (state) =>
  state.global.formattedCurrentDate;
export const selectCurrYear = (state) =>
  state.global.currYear;
export const selectCurrMonth = (state) =>
  state.global.currMonth;
export const selectCurrentMonthAbbreviation = (state) =>
  state.global.currentMonthAbbreviation;
export const selectLastMonth = (state) =>
  state.global.lastMonth
export const selectLastMonthAbbrev = (state) =>
  state.global.lastMonthAbbrev;
export const selectAvailableYears = (state) =>
  state.global.availableYears;

export const selectDoughnutExpenseSum = (state) =>
  state.global.doughnutExpenseSum;
export const selectSelectedYear = (state) =>
  state.global.selectedYear;
export const selectSelectedMonth= (state) =>
  state.global.selectedMonth;

  //The months array with abbreviatons for each month
export const selectMonths= (state) =>
  state.global.months;

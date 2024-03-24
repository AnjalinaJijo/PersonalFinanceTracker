import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Current Date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); //+1 to make the figure from 1 to 12 instead of 0 to 11
const day = String(currentDate.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

const lastMonth= month===12?1:month-1

const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","All"];
const monthsFullNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const globalSlice = createSlice({
  name: "global",
  initialState: {
    triggered: false,
    formattedCurrentDate: formattedDate,
    currYear: year,
    currMonth: month,
    currentMonthAbbreviation: monthsFullNames[month - 1],
    lastMonth:lastMonth,
    lastMonthAbbrev:monthsFullNames[lastMonth - 1],

    availableYears:[{key:2024,value:2024},],
    doughnutExpenseSum:{},//Category wise expense summed for doughnut chart
    monthlyExpenseSum:{},//month wise expense summed for line chart
    monthlyIncomeSum:{},//month wise expense summed for line chart
    monthlyExpenseBarSum:{},
    monthlyIncomeBarSum:{},
    selectedYear:year,//present Year
    selectedLineYear:year,//present Year
    selectedBarYear:year,//present Year
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
    setMonthlyExpenseSum: (state, action) => {
      state.monthlyExpenseSum = action.payload;
    },
    setMonthlyIncomeSum: (state, action) => {
      state.monthlyIncomeSum = action.payload;
    },
    setMonthlyExpenseBarSum: (state, action) => {
      state.monthlyExpenseBarSum = action.payload;
    },
    setMonthlyIncomeBarSum: (state, action) => {
      state.monthlyIncomeBarSum = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedLineYear: (state, action) => {
      state.selectedLineYear = action.payload;
    },
    setSelectedBarYear: (state, action) => {
      state.selectedBarYear = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setTriggered, setAvailableYears, setDoughnutExpenseSum,setMonthlyExpenseSum,setMonthlyIncomeSum,setMonthlyExpenseBarSum,setMonthlyIncomeBarSum, setSelectedYear , setSelectedLineYear,setSelectedBarYear,setSelectedMonth} = globalSlice.actions;

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
export const selectMonthlyExpenseSum = (state) =>
  state.global.monthlyExpenseSum;
export const selectMonthlyIncomeSum = (state) =>
  state.global.monthlyIncomeSum;
  export const selectMonthlyExpenseBarSum = (state) =>
  state.global.monthlyExpenseBarSum;
export const selectMonthlyIncomeBarSum = (state) =>
  state.global.monthlyIncomeBarSum;
export const selectSelectedYear = (state) =>
  state.global.selectedYear;
export const selectSelectedLineYear = (state) =>
  state.global.selectedLineYear;
export const selectSelectedBarYear = (state) =>
  state.global.selectedBarYear;
export const selectSelectedMonth= (state) =>
  state.global.selectedMonth;

  //The months array with abbreviatons for each month
export const selectMonths= (state) =>
  state.global.months;

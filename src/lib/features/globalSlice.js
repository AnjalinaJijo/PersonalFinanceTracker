import { createSlice } from "@reduxjs/toolkit";

//Current Date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); //+1 to make the figure from 1 to 12 instead of 0 to 11
const day = String(currentDate.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

const lastMonth= month===12?1:month-1

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

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
  },
  reducers: {
    setTriggered: (state, action) => {
      state.triggered = action.payload;
    },
  },
});

export const { setTriggered } = globalSlice.actions;

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

import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDoughnutExpenseSum } from "./globalSlice"; // Import action creators




// Define the thunk to calculate category sums
//Export thunk as a function
// export const calculateCategorySum = createAsyncThunk(
//     'expenses/calculateCategorySum',
//     async ({data,selectedYear}, { dispatch }) => {
  const calculateCategorySum = (data,selectedYear,selectedMonth,dispatch)=>{
    console.log("Inside calculateCategorySum")
    
      const newTotalCat = {};
      // const newMonthlyCat = {};
  
      const currentDate = new Date();
      const currMonth = currentDate.getMonth();
      // const lineYear = currentDate.getFullYear();
      const monthAbbreviations = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11
      };
      const selectedMonthInteger = monthAbbreviations[selectedMonth];
  
      data.forEach(entry => {
        const date = new Date(entry.Date);
        const month = date.getMonth();//0 to 11
        const year = date.getFullYear();
        // console.log("year",year)
        
        // Calculate category sum for current month
        // Check if selectedMonth is "All", if not, check for selected month and year
        //when selectedMonth is All you need to add up all expenses for selected year
        //when selectedMonth is say.Feb you need to add up all expenses for selected year+ the selectedMonth
        console.log("selected Month", selectedMonth)
        console.log("selectedMonthInteger", selectedMonthInteger)
    if((selectedMonth === "All" && year === selectedYear) || (month === selectedMonthInteger && year === selectedYear)) 
    {
      const category = entry.Category;
      newTotalCat[category] = (newTotalCat[category] || 0) + parseInt(entry.Amount);
    }
      });

      // return ({yearlyCategorySum:newTotalCat,monthlyCategorySum:newMonthlyCat})
  
      // Dispatch actions to update Redux state
      dispatch(setDoughnutExpenseSum(newTotalCat));
      // dispatch(setMonthlyCategorySum(newMonthlyCat));
  //   }
  // );
  }

  export default calculateCategorySum
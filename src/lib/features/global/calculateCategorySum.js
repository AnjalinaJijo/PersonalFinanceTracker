import { createAsyncThunk } from "@reduxjs/toolkit";
import { setYearlyCategorySum, setMonthlyCategorySum } from "./globalSlice"; // Import action creators
import { useAppSelector, useAppDispatch } from "@/lib/hooks";


// Define the thunk to calculate category sums
//Export thunk as a function
// export const calculateCategorySum = createAsyncThunk(
//     'expenses/calculateCategorySum',
//     async ({data,selectedYear}, { dispatch }) => {
  const calculateCategorySum = (data,selectedYear,dispatch)=>{

    console.log("Inside calculateCategorySum")
      // const dispatch = useAppDispatch();
      const newTotalCat = {};
      const newMonthlyCat = {};
  
      const currentDate = new Date();
      const currMonth = currentDate.getMonth();
      // const lineYear = currentDate.getFullYear();
  
      data.forEach(entry => {
        const date = new Date(entry.Date);
        const month = date.getMonth();
        const year = date.getFullYear();
  
        // Calculate category sum for current month
        if (month === currMonth && year === selectedYear) {
          const category = entry.Category;
          newMonthlyCat[category] = (newMonthlyCat[category] || 0) + parseInt(entry.Amount);
        }
  
        // Calculate category sum for current year
        if (year === selectedYear) {
          const category = entry.Category;
          newTotalCat[category] = (newTotalCat[category] || 0) + parseInt(entry.Amount);
        }
      });

      // return ({yearlyCategorySum:newTotalCat,monthlyCategorySum:newMonthlyCat})
  
      // Dispatch actions to update Redux state
      dispatch(setYearlyCategorySum(newTotalCat));
      dispatch(setMonthlyCategorySum(newMonthlyCat));
  //   }
  // );
  }

  export default calculateCategorySum
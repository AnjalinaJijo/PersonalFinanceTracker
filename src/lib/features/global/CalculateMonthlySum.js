import { useAppDispatch, useAppSelector } from "@/lib/hooks";
//Redux
import {
  setExpenseArray,
  selectExpenseArray,
} from "@/lib/features/expense/expenseSlice";
import {
  setIncomeArray,
  selectIncomeArray,
} from "@/lib/features/income/incomeSlice";
import {
  setDoughnutExpenseSum,
  setMonthlyExpenseSum,
  setMonthlyIncomeSum,
  setMonthlyExpenseBarSum,
  setMonthlyIncomeBarSum,
  selectMonths,
  setSelectedLineYear,
  selectSelectedLineYear,
  setSelectedBarYear,
  selectSelectedBarYear,
  selectAvailableYears,
  selectMonthlyExpenseSum,
  selectMonthlyIncomeSum,
} from "./globalSlice"; // Import action creators
import { useEffect } from "react";

const CalculateMonthlySum = () => {
  const dispatch = useAppDispatch();
  const months = useAppSelector(selectMonths);

  const expenseArray = useAppSelector(selectExpenseArray);
  const incomeArray = useAppSelector(selectIncomeArray);
  const selectedLineYear = useAppSelector(selectSelectedLineYear);
  const selectedBarYear = useAppSelector(selectSelectedBarYear);

  const monthlyData = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  const MonthlySum = (data, name, chartType) => {
    const newMonthlyExpense = { ...monthlyData };
    const newMonthlyIncome = { ...monthlyData };

    // Accumulate changes
    data.forEach((entry) => {
      const date = new Date(entry.Date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const AbbreviatedMonth = months[month]; // to get abbreviated month (eg:Jan,Feb,..)

      if (chartType === "line") {
        if (year === selectedLineYear) {
          // Add the expense amount to the corresponding month
          if (name === "expense") {
            newMonthlyExpense[AbbreviatedMonth] += parseInt(entry.Amount);
          } else {
            newMonthlyIncome[AbbreviatedMonth] += parseInt(entry.Amount);
          }
        }
      } else {
        if (year === selectedBarYear) {
          // Add the expense amount to the corresponding month
          if (name === "expense") {
            newMonthlyExpense[AbbreviatedMonth] += parseInt(entry.Amount);
          } else {
            newMonthlyIncome[AbbreviatedMonth] += parseInt(entry.Amount);
          }
        }
      }
    });

    // Set state once after the loop
    if (name === "expense") {
      if (chartType === "line") {
        dispatch(setMonthlyExpenseSum(newMonthlyExpense));
      } else {
        dispatch(setMonthlyExpenseBarSum(newMonthlyExpense));
      }
    } else {
      if (chartType === "line") {
        dispatch(setMonthlyIncomeSum(newMonthlyIncome));
      } else {
        dispatch(setMonthlyIncomeBarSum(newMonthlyIncome));
      }
    }
  };

  useEffect(() => {
    // Check if expenseArray is available
    if (expenseArray.length > 0) {
      MonthlySum(expenseArray, "expense", "line");
    }
  }, [selectedLineYear, expenseArray]); // Update only when selectedLineYear or expenseArray changes

  useEffect(() => {
    if (incomeArray.length > 0) {
      MonthlySum(incomeArray, "income", "line");
    }
  }, [selectedLineYear, incomeArray]); // Update only when selectedLineYear or incomeArray changes

  // For Bar Chart
  useEffect(() => {
    // Check if expenseArray is available
    if (expenseArray.length > 0) {
      MonthlySum(expenseArray, "expense", "bar");
    }
  }, [selectedBarYear, expenseArray]); // Update only when selectedLineYear or expenseArray changes

  useEffect(() => {
    if (incomeArray.length > 0) {
      MonthlySum(incomeArray, "income", "bar");
    }
  }, [selectedBarYear, incomeArray]); // Update only when selectedLineYear or incomeArray changes

  return null;
};

export default CalculateMonthlySum;

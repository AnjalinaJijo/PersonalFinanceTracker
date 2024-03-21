"use client";
import getIncome from "../lib/fetchFunctions/income/getIncome";
import getExpense from "../lib/fetchFunctions/expense/getExpense";
import { useState, useEffect } from "react";

//redux
import {
  selectExpenseArray,
  setExpenseArray,
  selectMonthlyExpense,
  setMonthlyExpense,
  setCategoryExpense,
  selectCategoryExpense,
  setTotalExpense,
  selectTotalExpense,
  setCategoryCurrMonthExpense,
  selectCategoryCurrMonthExpense,
} from "@/lib/features/expense/expenseSlice";
import {
  selectIncomeArray,
  setIncomeArray,
  selectMonthlyIncome,
  setMonthlyIncome,
  setTotalIncome,
  selectTotalIncome,
} from "@/lib/features/income/incomeSlice";
import {
  selectTriggered,
  setTriggered,
  selectFormattedCurrentDate,
  selectCurrYear,
  selectCurrMonth,
  selectCurrentMonthAbbreviation,
  selectLastMonth,
  selectLastMonthAbbrev,
  setAvailableYears,
  selectAvailableYears,
} from "@/lib/features/global/globalSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import DoughnutChart from "./Charts/DoughnutChart";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";

import Goals from "./Goals";
import Subscriptions from "./Subscriptions";

export function Operations() {
  const dispatch = useAppDispatch();
  const getExpenseData = useAppSelector(selectExpenseArray);
  const getIncomeData = useAppSelector(selectIncomeArray);
  const monthlyExpense = useAppSelector(selectMonthlyExpense);
  const monthlyIncome = useAppSelector(selectMonthlyIncome);
  // const totalExpenseCategory = useAppSelector(selectCategoryExpense);
  const availableYears = useAppSelector(selectAvailableYears);
  // const categoryCurrMonthExpense = useAppSelector(selectCategoryCurrMonthExpense);

  const monthlyData = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    June: 0,
    July: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // const [monthlyExpenseCategory,setMonthlyExpenseCategory]= useState({})

  //All the year available inside the DB (Years where data is tracked)
  // const [yearData,setYearData] = useState([{key:2024,value:2024},])

  const [lineYear, setLineYear] = useState(2024);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await getIncome();
        dispatch(setIncomeArray(incomeResponse));
        // console.log('Income response', incomeResponse);

        const expenseResponse = await getExpense();
        dispatch(setExpenseArray(expenseResponse));
        // setGetExpenseData(expenseResponse);
        // console.log('Expense response', expenseResponse);

        const monIncome = calculateMonthlyTotal(incomeResponse, "income");
        const monExpense = calculateMonthlyTotal(expenseResponse, "expense");

        // calculateCategorySum(expenseResponse);
        // setTotalExpenseCategory(CategorySum);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  let totalIncome = 0;
  let totalExpense = 0;

  let income = getIncomeData.map((data) => {
    totalIncome += parseInt(data.Amount);
  });
  //While calculating totalExpense we also calculate all the months and years inside
  //available data
  let expense = getExpenseData.map((data) => {
    //Adding all available year to List
    let date = new Date(data.Date);
    let year = date.getFullYear();
    if (!availableYears.some((item) => item.value === year)) {
      dispatch(
        setAvailableYears([...availableYears, { key: year, value: year }])
      );
    }
    //Simply adding all available Expenses
    totalExpense += parseInt(data.Amount);
  });

  //TotalExpense and TotalIncome set to Redux
  dispatch(setTotalExpense(totalExpense));
  dispatch(setTotalIncome(totalIncome));
  let currentBalance = totalIncome - totalExpense;

  const calculateMonthlyTotal = (Data, name) => {
    const newMonthlyExpense = { ...monthlyData };
    const newMonthlyIncome = { ...monthlyData };

    // Accumulate changes
    Data.forEach((entry) => {
      const date = new Date(entry.Date);
      const year = date.getFullYear();

      // console.log("lineYear inside ",lineYear)
      if (year === lineYear) {
        const month = months[date.getMonth()]; // date.getMonth() gives month from 0 to 11

        // Add the expense amount to the corresponding month
        if (name === "expense") {
          newMonthlyExpense[month] += parseInt(entry.Amount);
        } else {
          newMonthlyIncome[month] += parseInt(entry.Amount);
        }
      }
    });

    // Set state once after the loop
    if (name === "expense") {
      // setMonthlyExpense(newMonthlyExpense);
      dispatch(setMonthlyExpense(newMonthlyExpense));
    } else {
      // setMonthlyIncome(newMonthlyIncome);
      dispatch(setMonthlyIncome(newMonthlyIncome));
    }
  };


  const calculateMonthlyData = () => {
    const monIncome = calculateMonthlyTotal(getIncomeData, "income");
    const monExpense = calculateMonthlyTotal(getExpenseData, "expense");

    // calculateCategorySum(getExpenseData);
  };
  useEffect(() => {
    // console.log('woow', lineYear);
    calculateMonthlyData();
    // Call the function when lineYear changes
  }, [lineYear]);

  const handleLineSelect = (e) => {
    setLineYear(parseInt(e.target.value));
    // console.log(e.target.value)
  };

  return (
    <div>
      {/* <div className=" text-white">
        <Select
          // label="Favorite Animal"
          placeholder={lineYear}
          aria-label="Select a year"
          // defaultSelectedKeys={["2024"]}
          // labelPlacement="outside"
          className="max-w-xs"
          disableSelectorIconRotation
          selectorIcon={<SelectorIcon />}
          onChange={handleLineSelect}
        >
          {availableYears.map((year) => (
            <SelectItem
              key={year.key}
              value={year.value}
              textValue={year.value.toString()}
            >
              {year.value}
            </SelectItem>
          ))}
        </Select>
      </div> */}

      <div className="">
        <DoughnutChart />
        {/* totalCategory={totalExpenseCategory} */}
        <LineChart
        />
        <BarChart
          monthlyExpense={monthlyExpense}
          monthlyIncome={monthlyIncome}
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="h-60 p-5 bg-BayernBlue flex flex-col justify-center items-center text-xl rounded-xl">
          <h1>Current Balance</h1>
          <h3>${currentBalance}</h3>
        </div>
        <div className="h-60 p-5 flex flex-col justify-center items-center bg-SlateBlue text-xl rounded-xl">
          <h1>Income</h1>
          <h3>${totalIncome}</h3>
        </div>
        <div className="p-5 row-span-2 flex flex-col items-center bg-SavoyBlue text-xl rounded-xl">
          <Goals />
        </div>
        <div className="h-60 p-5 flex flex-col justify-center items-center bg-Purple text-xl rounded-xl">
          <h1>Upcomming</h1>
          <h3>.....</h3>
        </div>
        <div className="p-5 flex flex-col justify-center items-center bg-Cerulean text-xl rounded-xl">
          <h1>Expense</h1>
          <h3>${totalExpense}</h3>
        </div>
        <div className="p-5 row-span-2 flex flex-col items-center bg-pink text-xl rounded-xl">
          <Subscriptions />
        </div>
        <div className="p-5 flex flex-col justify-center items-center bg-CarolinaBlue text-xl rounded-xl">
          <h1>Expense Trends</h1>
          {/* <h3>$100,000</h3> */}
        </div>
        <div className="h-60 p-5 flex flex-col justify-center items-center bg-UCLABlue text-xl rounded-xl">
          <h1>Upcomming</h1>
          <h3>$100,000</h3>
        </div>
        {/* <div className="p-5 flex flex-col justify-center items-center bg-PompandandPower text-xl rounded-xl">
          <h1>Current Balance</h1>
          <h3>$100,000</h3>
        </div> */}
        <div className="h-60 p-5 flex flex-col justify-center items-center bg-Mulberry text-xl rounded-xl">
          <h1>My Investments</h1>
          <h3>$100,000</h3>
        </div>
      </div>
    </div>
  );
}

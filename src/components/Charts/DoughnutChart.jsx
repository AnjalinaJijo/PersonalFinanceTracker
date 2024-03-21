"use client";

import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; //Additional plugin to add Data labels inside the doughnut
import { createLinearGradient } from "../LinearGradient"; // Manually written Function to create a linear gradient with multiple colors

import {Select, SelectSection, SelectItem,} from "@nextui-org/react";
import {SelectorIcon} from "../Icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  ChartDataLabels, //To apply plugins to all charts or plugins: [ChartDataLabels] for specific charts
  // gradient,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

//redux
import {
  setExpenseArray,
  selectExpenseArray,
} from "@/lib/features/expense/expenseSlice";
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
  selectDoughnutExpenseSum,
  setDoughnutExpenseSum,
  selectSelectedYear,
  setSelectedYear,
  setSelectedMonth,
  selectSelectedMonth,
  selectMonths,
} from "@/lib/features/global/globalSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import CalculateCategorySum from '@/lib/features/global/CalculateCategorySum'; // Import the thunk

import { useEffect } from "react";

const DoughnutChart = () => {

  const dispatch = useAppDispatch();
  const availableYears = useAppSelector(selectAvailableYears);
  const doughnutExpenseSum= useAppSelector(selectDoughnutExpenseSum);
  const selectedYear = useAppSelector(selectSelectedYear);
  const selectedMonth = useAppSelector(selectSelectedMonth);
  const monthsArray = useAppSelector(selectMonths);
  const expenseArray = useAppSelector(selectExpenseArray);


  useEffect(() => {
    // console.log("expenseArray", expenseArray);
    console.log("selectedYear", typeof(selectedYear));
    console.log("Dispatching calculateCategorySum thunk");
      CalculateCategorySum(expenseArray,selectedYear,selectedMonth,dispatch);
  }, [expenseArray, selectedYear, selectedMonth, dispatch]);



  const doughnutData = {
    // labels:Object.entries(totalCategory).map(([key, value]) => [key, value]),//Legend Text to be displayed
    //redux monthlyCat sum 
    labels: Object.keys(doughnutExpenseSum),
    datasets: [
      {
        // label:"Categories",
        data: Object.values(doughnutExpenseSum),
        backgroundColor: [
          // "#2a52be",//darkblue
          createLinearGradient(["#2769AE", "#4087AE", "#4EA6B6"]), //blue
          createLinearGradient(["#BB246C", "#CA4383", "#D26097"]), //rose
          createLinearGradient(["#482299", "#5B36A9", "#674AA6"]), //violet
          createLinearGradient(["#E0D062", "#EACB77", "#E9D18F"]), //yellow
          createLinearGradient(["#8968CD", "#9776D9", "#9F85D6"]), //light violet
          createLinearGradient(["#DF7654", "#F08D6D", "#E59B83"]), //yellow
          // "#2774AE",//blue
          // "#BB246C",//Rose
          // "#482299",//Dark violet
          // "#E0BE62",//yellow
          // "#C54B8C",//rose
          // "#8968CD",//violet
          // "#773E7C",//light violet
          // "#2A5057",//Green
        ],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    cutout: `70%`, // size of hole in center
    // spacing: 3, //space between arcs
    responsive: true,
    // maintainAspectRatio:false,
    borderWidth: 0, //borderWidth of arcs
    aspectRatio: 1, //Determines width/height ratio
    layout: {
      padding: 2, //padding of the entire chart
    },

    animation: {
      animateScale: true,
    },
    //To write Total Expense in Center of Doughnut

    plugins: {
      tooltip: {
        // enabled:false,
        usePointStyle: true,
        boxPadding: 5,
        // bodySpacing:5,
        titleSpacing: 5,
        padding: 10,
      },
      datalabels: {
        color: "white",
        display:'auto',//one with the highest data index will be hidden. If labels are at the same data index, the one with the highest dataset index will be hidden
        //display: 'auto' option can be used to prevent overlapping labels, based on the following rules when two labels overlap:
        padding: 3,
        font: {
          size: `9%`,
        },
        formatter: (value, context) => {
          const percentage = (
            (value / context.dataset.data.reduce((a, b) => a + b, 0)) *
            100
          ).toFixed(2);
          return percentage + "%";
        },
      },
      legend: {
        display: true,
        position: "left", // Set position based on screen width
        // align:'start',
        labels: {
          // boxHeight:40,
          boxWidth: 400, // You can also adjust the box width if needed
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          maxWidth: 150,
          // lineWidth:5,
          font: {
            // size:14,
            // margin:2,
            // style:'normal',
            // lineHeight:1,
            weight: "bold",
            // padding:20,
          },
        },
      },
    },
  };

  return (
    <div className="lg:w-2/5 md:w-1/2 sm:w-full shadow-lg my-10 p-3">
      <h2 className="text-center text-xl font-bold">Expense Breakdown</h2>
      <div className=" text-white flex items-center justify-center gap-3 m-3">
        <Select
          // label="Favorite Animal"
          placeholder={selectedYear}
          aria-label="Select a year"
          // defaultSelectedKeys={["2024"]}
          // labelPlacement="outside"
          className="max-w-xs"
          disableSelectorIconRotation
          selectorIcon={<SelectorIcon />}
          onChange={(e)=>dispatch(setSelectedYear(parseInt(e.target.value)))}
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

        {/* Select Month */}
        <Select
          // label="Favorite Animal"
          placeholder={selectedMonth}
          aria-label="Select a month"
          // defaultSelectedKeys={["2024"]}
          // labelPlacement="outside"
          className="max-w-xs"
          disableSelectorIconRotation
          selectorIcon={<SelectorIcon />}
          onChange={(e)=>dispatch(setSelectedMonth(e.target.value))}
        >
          {monthsArray.map((month) => (
            <SelectItem
              key={month}
              value={month}
              textValue={month}
            >
              {month}
            </SelectItem>
          ))}
        </Select>
      </div>
      
      {Object.keys(doughnutExpenseSum).length === 0 ?
(
  <div className="flex flex-col items-center justify-center p-5">
    <p>No Data For Selected Time Period</p>
    <p>Please Try another Time Period</p>
  </div>  
  //  Close the inner div properly 
  
):(
  <div>
    <Doughnut data={doughnutData} options={doughnutOptions} />
  </div>
)}
    </div>
  )
}

export default DoughnutChart;

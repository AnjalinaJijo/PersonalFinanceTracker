"use client";
import ChartDataLabels from "chartjs-plugin-datalabels"; //Additional plugin to add Data labels inside the doughnut

import {SelectorIcon} from "../Icons";

import { createLinearGradient } from "../LinearGradient"; // Manually written Function to create a linear gradient with multiple colors
import CalculateMonthlySum from "@/lib/features/global/CalculateMonthlySum";

import { Select, SelectSection, SelectItem } from "@nextui-org/react";

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
  setSelectedLineYear,
  selectSelectedLineYear,
  selectAvailableYears,
  selectMonthlyExpenseSum,
  selectMonthlyIncomeSum,
} from "@/lib/features/global/globalSlice";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import income from "@/app/track/income/page";

const LineChart = () => {
  const dispatch = useAppDispatch();
  const expenseArray = useAppSelector(selectExpenseArray);
  const incomeArray = useAppSelector(selectIncomeArray);
  const selectedLineYear = useAppSelector(selectSelectedLineYear);
  const availableYears = useAppSelector(selectAvailableYears);
  const monthlyExpense = useAppSelector(selectMonthlyExpenseSum);
  const monthlyIncome = useAppSelector(selectMonthlyIncomeSum);

  const combinedData = {
    labels: Object.keys(monthlyExpense),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(monthlyExpense),
        borderColor: "#B7227C",
        // fill:true,
        // backgroundColor:createLinearGradient(['#CC3F8A', '#D25A9A', '#D878AB']),
        tension: 0.5,
        borderWidth: 3,
      },
      {
        label: "Income",
        data: Object.values(monthlyIncome),
        borderColor: "#1C299B",
        // backgroundColor:"#8968CD",
        tension: 0.5,
        borderWidth: 3,
      },
    ],
  };

  const lineOptions = {
    // responsive:true,
    layout: {
      padding: 5,
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: false, // Disable data labels labels inside or on top
      },

      legend: {
        display: true,
        labels: {
          boxHeight: 0, //to make the legend a line

          // pointStyle:"line",//dont work
        },
      },
    },

    elements: {
      // line:{
      //     tension:0,
      //     borderWidth:2,
      //     // borderColor:"#B768A2",
      //     fill:"start",

      // },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      y: {
        display: true, //Hide x-axis line
        grid: {
          display: false, // Hide grid lines on the y-axis
        },
        ticks: {
          display: true,
        },
        offset: true,
      },
      x: {
        display: true, //Hide y-axis line
        grid: {
          display: false, // Hide grid lines on the x-axis
        },
        ticks: {
          display: true,
        },
        offset: true,
      },
    },
  };

  return (
    <div className="w-full h-500 md:w-1/2 lg:w-1/2 p-5 shadow-lg">
    <h2 className="text-center text-xl font-bold">Expense and Income</h2>

    <CalculateMonthlySum />{/* returns null but calcs monthlySum */}

      <div className=" text-white flex items-center justify-start gap-3 m-3">
        <Select
          label="Year"
          variant='underlined'
          placeholder={selectedLineYear}
          aria-label="Select a year"
          // defaultSelectedKeys={["2024"]}
          // labelPlacement="outside"
          className="max-w-xs w-xs"
          disableSelectorIconRotation
          selectorIcon={<SelectorIcon />}
          onChange={(e) => dispatch(setSelectedLineYear(parseInt(e.target.value)))}
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
      </div>
      <Line data={combinedData} options={lineOptions} />
    </div>
  );
};

export default LineChart;

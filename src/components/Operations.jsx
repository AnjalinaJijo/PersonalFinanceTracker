'use client'
import getIncome from "../lib/getIncome"
import getExpense from "../lib/getExpense"
import {useState,useEffect} from "react";
import Charts from "./charts"

import DoughnutChart from "./Charts/DoughnutChart"
import LineChart from "./Charts/LineChart"
import BarChart from "./Charts/BarChart"

import Goals from "./Goals"
import Subscriptions from "./Subscriptions"

import {Select, SelectItem, Button} from "@nextui-org/react";
import {SelectorIcon} from "./Icons";

export  function Operations() {

    const [getIncomeData, setGetIncomeData] = useState([]);
    const [getExpenseData, setGetExpenseData] = useState([]);
    const monthlyData={
    "Jan":0,
    "Feb":0,
    "Mar":0,
    "Apr":0,
    "May":0,
    "June":0,
    "July":0,
    "Aug":0,
    "Sep":0,
    "Oct":0,
    "Nov":0,
    "Dec":0}
    const [monthlyExpense, setMonthlyExpense] = useState(monthlyData);
    const [monthlyIncome, setMonthlyIncome] = useState(monthlyData);
    const months= ["Jan",
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
    "Dec"]

    const [totalExpenseCategory,setTotalExpenseCategory]= useState({})
    const [monthlyExpenseCategory,setMonthlyExpenseCategory]= useState({})
    
    const [duration,setDuration]= useState("0")
    const [yearData,setYearData] = useState([{key:2024,value:2024},])

    const [lineYear,setLineYear] = useState(2024)

    
   
    useEffect(() => {
      const fetchData = async () => {
          try {
              const incomeResponse = await getIncome();
              setGetIncomeData(incomeResponse);
              // console.log('Income response', incomeResponse);
  
              const expenseResponse = await getExpense();
              setGetExpenseData(expenseResponse);
              // console.log('Expense response', expenseResponse);
  
              const monIncome = calculateMonthlyTotal(incomeResponse, "income");
              const monExpense = calculateMonthlyTotal(expenseResponse, "expense");
  
              // setMonthlyIncome(monIncome);
              // setMonthlyExpense(monExpense);
  
              calculateCategorySum(expenseResponse);
              // setTotalExpenseCategory(CategorySum);
          } catch (error) {
              console.error("Error fetching data:", error.message);
          }
      };
  
      fetchData();
  }, []);



      let totalIncome=0;
      let totalExpense=0;

      let income = getIncomeData.map((data)=>{
            totalIncome+=parseInt(data.Amount)
      })
      let expense = getExpenseData.map((data)=>{
            let date =new Date(data.Date)
            let year= date.getFullYear()
            if (!yearData.some(item => item.value === year)) {
              setYearData([...yearData, { key: year, value: year }]);
            }
            totalExpense+=parseInt(data.Amount)  
      })
      let currentBalance=totalIncome-totalExpense




      const calculateMonthlyTotal = (Data, name) => {
        // console.log('I am called');
        // console.log('name', name);
        // console.log('data',Data);

        // name==="expense"?
        // setMonthlyExpense(monthlyData):
        // setMonthlyIncome(monthlyData)
      
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
            if (name === 'expense') {
              newMonthlyExpense[month] += parseInt(entry.Amount);
            } else {
              newMonthlyIncome[month] += parseInt(entry.Amount);
            }
          }
        });
      
        // console.log('monthly expense', newMonthlyExpense);
        // console.log('monthly income', newMonthlyIncome);
      
        // Set state once after the loop
        if (name === 'expense') {
          setMonthlyExpense(newMonthlyExpense);
        } else {
          setMonthlyIncome(newMonthlyIncome);
        }
      };
 

      const calculateCategorySum = (data) => {

        const newTotalCat ={};
        const newMonthlyCat ={};

          data.map((entry)=>{
            const currentDate = new Date();
            const currMonth = currentDate.getMonth();

            const date = new Date(entry.Date);
            // const month = 1;
            const month = date.getMonth();
            const year = date.getFullYear();
            // console.log("currMonth",currMonth)
            // console.log("month",month)
            // console.log("year",year)
            // console.log("lineyear",lineYear)


                      
                      //CALCULATE CATEGORY SUM FOR CURRENT MONTH
                      if(month === currMonth && year===lineYear){
                        const category = entry.Category;

                        // Initialize the category sum if not exists
                        if (!newMonthlyCat[category]) {
                          newMonthlyCat[category] = 0;
                        }
                
                        newMonthlyCat[category] += parseInt(entry.Amount);
                      }



                      //CALCULATE CATEGORY SUM FOR CURRENT YEAR
                      if(year===lineYear){
                        const category = entry.Category;

                        // Initialize the category sum if not exists
                        if (!newTotalCat[category]) {
                          newTotalCat[category] = 0;
                        }
                
                        newTotalCat[category] += parseInt(entry.Amount);
                      }
          })
        // console.log('totalMOOOO',newMonthlyCat)
        setTotalExpenseCategory(newTotalCat)
        setMonthlyExpenseCategory(newMonthlyCat)
      };

      const calculateMonthlyData = ()=>{
        const monIncome = calculateMonthlyTotal(getIncomeData, "income");
        const monExpense = calculateMonthlyTotal(getExpenseData, "expense");
    
        calculateCategorySum(getExpenseData);

      }
      useEffect(() => {
        // console.log('woow', lineYear);
        calculateMonthlyData()
         // Call the function when lineYear changes
      }, [lineYear]);

      const handleLineSelect =(e)=>{
        setLineYear(parseInt(e.target.value))
        // console.log(e.target.value)
    }




  return (
    <div>

<div className=" text-white">
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
    {yearData.map((year) => (
      <SelectItem key={year.key} value={year.value}  textValue={year.value.toString()}>
        {year.value}
      </SelectItem>
    ))}
  </Select>
  </div>

      <div className="">
    <Charts monthlyExpense={monthlyExpense} monthlyIncome={monthlyIncome} totalCategory={totalExpenseCategory} yearData={yearData} getExpenseData={getExpenseData} getIncomeData={getExpenseData} setMonthlyExpense={setMonthlyExpense} setMonthlyIncome={setMonthlyIncome} totalExpenseCategory={totalExpenseCategory} setTotalExpenseCategory={setTotalExpenseCategory} lineYear={lineYear} setLineYear={setLineYear}/> 
    <DoughnutChart totalCategory={totalExpenseCategory}/>
    <LineChart monthlyExpense={monthlyExpense} monthlyIncome={monthlyIncome}/>
    <BarChart monthlyExpense={monthlyExpense} monthlyIncome={monthlyIncome}/>
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
          <Goals monthlyExpenseCategory={monthlyExpenseCategory}/>
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
  )
}

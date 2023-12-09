import React from "react";

export default function Dashboard() {
  return (
    <div className="p-10">
      <div className="relative flex w-fit mb-2 bg-gray-700 border-2 border-slate-600 rounded-2xl">
      <button className="text-xl p-2">Track Expenses</button>
    <span className="absolute flex top-0 right-0">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span></span>
      

      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="h-60 p-5 bg-BayernBlue flex flex-col justify-center items-center text-xl rounded-xl">
          <h1>Current Balance</h1>
          <h3>$100,000</h3>
        </div>
        <div className="h-60 p-5 flex flex-col justify-center items-center bg-SlateBlue text-xl rounded-xl">
          <h1>Income</h1>
          <h3>$100,000</h3>
        </div>
        <div className="p-5 row-span-2 flex flex-col items-center bg-SavoyBlue text-xl rounded-xl">
          <h1>Goal Progress</h1>
        </div>
        <div className="h-60 p-5 flex flex-col justify-center items-center bg-Purple text-xl rounded-xl">
          <h1>Current Balance</h1>
          <h3>$30,000</h3>
        </div>
        <div className="p-5 flex flex-col justify-center items-center bg-Cerulean text-xl rounded-xl">
          <h1>Expense</h1>
          <h3>$4,000</h3>
        </div>
        <div className="p-5 row-span-2 flex flex-col items-center bg-SunsetPurple text-xl rounded-xl">
          <h1>Upcomming</h1>
          <h3>$100,000</h3>
        </div>
        <div className="p-5 flex flex-col justify-center items-center bg-CarolinaBlue text-xl rounded-xl">
          <h1>Expense Trends</h1>
          <h3>$100,000</h3>
        </div>
        <div className="h-60 p-5 flex flex-col justify-center items-center bg-UCLABlue text-xl rounded-xl">
          <h1>Upcomming</h1>
          <h3>$100,000</h3>
        </div>
        <div className="p-5 flex flex-col justify-center items-center bg-PompandandPower text-xl rounded-xl">
          <h1>Current Balance</h1>
          <h3>$100,000</h3>
        </div>
        <div className="h-60 p-5 flex flex-col justify-center items-center bg-Mulberry text-xl rounded-xl">
          <h1>My Investments</h1>
          <h3>$100,000</h3>
        </div>
      </div>
    </div>
  );
}

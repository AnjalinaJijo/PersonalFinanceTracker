'use client'
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
} from "chart.js"


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        BarElement,
        ArcElement 
      )

import {Bar, Line, Scatter, Bubble, Doughnut} from "react-chartjs-2";
import React, { useEffect } from 'react'

// import {CategoryScale} from 'chart.js'; 
ChartJS.register(CategoryScale);

export default function charts({monthlyExpense,monthlyIncome,totalCategory,yearData,getExpenseData,getIncomeData,setMonthlyExpense,setMonthlyIncome,totalExpenseCategory,setTotalExpenseCategory,lineYear,setLineYear}) {




    // console.log('monthly Expense at chart',monthlyExpense)

    // console.log('keys',Object.keys(monthlyExpense))
    // console.log('val',Object.values(monthlyExpense))
    console.log('doughnut data',Object.values(totalCategory))

    const ExpenseData = {
      
        labels:Object.keys(monthlyExpense),
        datasets:[
            {
                label:'Expenses',
                data:Object.values(monthlyExpense),
                borderColor:"#2a52be",
                backgroundColor:"#2a52be",
                tension:0.5,
                borderWidth:3
                
            },
        ],
    }
    const IncomeData = {
      
        labels:Object.keys(monthlyExpense),
        datasets:[
            {
                label:'Income',
                data:Object.values(monthlyIncome),
                borderColor:"#8968CD",
                backgroundColor:"#8968CD",
                tension:0.2,
                borderWidth:3,
            },
        ],
    }


    const ExpenseBarData = {
        labels:Object.keys(monthlyExpense),
        datasets:[
            {
                label:'Expenses',
                borderRadius:30,
                data:Object.values(monthlyExpense),
                // borderColor:"#2a52be",
                backgroundColor:"#2a52be",
                barThickness:10,
                
            },
            {
                label:'Income',
                borderRadius:20,
                data:Object.values(monthlyIncome),
                // borderColor:"#8968CD",
                backgroundColor:"#8968CD",
                barThickness:10
            },
        ],
    }

    const doughnutData={
        backgroundColor:[
        "#2a52be",
        "#8968CD",

        ],
        labels:Object.keys(totalCategory),
        datasets:[
            {
                label:"Categories",
                data:Object.values(totalCategory),
                backgroundColor:[
                    "#2a52be",
        "#8968CD",
                ],
                hoverOffset:4,
            }
        ]
    }

    const doughnutOptions={
        elements:{
            arc:{
                weight:0.5,
                borderWidth:3,
            }
        },
        cutout:160,

        options:{
            plugins:{
                legend:{
                    display:true,
                }
            }

        }
    }

    
    const lineOptions={
        // responsive:true,
        Plugins:{
            legend:{
                display:false,
            }
        },
        elements:{
            line:{
                tension:0,
                borderWidth:2,
                borderColor:"#B768A2",
                fill:"start",
                backgroundColor:"rgba(47,97,68,0.3)",

            },
            point:{
                radius:0,
                hitRadius:0,
            }
        },
        scales:{
            xAxis:{
                display:false,
            },
            yAxis:[{
                display:false,
                ticks:{
                    display:false,
                }   
            }]
        }
    }

    const BarOptions ={
        plugins:{
            legend:{
                position:"top",
                align:"start",
                labels:{
                    boxWidth:7,
                    UsePointStyle:true,
                    pointStyle:"circle",
                },
                title:{
                    text:"Expense-Income",
                    display:true,
                    color:"white",
                    font:{
                        size:18,
                    }
                }
            }
            },
            scales:{
                xAxis:{
                    display:false,
                },
                yAxis:[{
                ticks:{
                    display:false,
                }}]
               
            },
            elements:{
                bar:{
                    barPercentage:0.3,
                    categoryPercentage:1,
                }
            }
    };


   



  return (
    <>


    <div className="flex-row gap-5">


    <div className="flex gap-5">
    <div className="w-full md:w-1/2 lg:w-1/2">
        <Line data={ExpenseData} options={lineOptions}/>
    </div>
    <div className="w-full md:w-1/2 lg:w-1/2">
        <Line data={IncomeData} options={lineOptions}/>
    </div>
    </div>



    <div className="flex gap-5 mt-10">
    <div className="w-full md:w-1/2 lg:w-1/2">
        <Bar data={ExpenseBarData} height={300} options={BarOptions}/>
    </div>
    <div className="w-full md:w-1/2 lg:w-1/2">
        <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
    </div>

    {/* <div className="m-10 p-10">
        <div className="w-full md:w-1/2 lg:w-1/2">
        <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
    </div>

 */}

    </div>
    </>
  )
}


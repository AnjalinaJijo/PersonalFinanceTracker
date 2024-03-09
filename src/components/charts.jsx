'use client'
import ChartDataLabels from 'chartjs-plugin-datalabels';//Additional plugin to add Data labels inside the doughnut
// import gradient from 'chartjs-plugin-gradient';//plugin to add gradient colors
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
        ChartDataLabels,//To apply plugins to all charts or plugins: [ChartDataLabels] for specific charts
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
      )

import {Bar, Line, Scatter, Bubble, Doughnut} from "react-chartjs-2";
import React, { useEffect } from 'react'

// import {CategoryScale} from 'chart.js'; 
ChartJS.register(CategoryScale);

export default function charts({monthlyExpense,monthlyIncome,totalCategory,yearData,getExpenseData,getIncomeData,setMonthlyExpense,setMonthlyIncome,totalExpenseCategory,setTotalExpenseCategory,lineYear,setLineYear}) {

    // Function to create a linear gradient
// function createLinearGradient(startColor, endColor) {
//     const ctx = document.createElement('canvas').getContext('2d');
//     const gradient = ctx.createLinearGradient(0, 0, 0, 400);
//     gradient.addColorStop(0, startColor);
//     gradient.addColorStop(1, endColor);
//     return gradient;
//   }

  // Function to create a linear gradient with multiple colors
function createLinearGradient(colors) {
    const ctx = document.createElement('canvas').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    
    // Calculate the stop value for each color
    const stopInterval = 1 / (colors.length - 1);
    colors.forEach((color, index) => {
      gradient.addColorStop(index * stopInterval, color);
    });
  
    return gradient;
  }


   
    // console.log('monthly Expense at chart',monthlyExpense)

    // console.log('keys',Object.keys(monthlyExpense))
    // console.log('val',Object.values(monthlyExpense))
    console.log('doughnut data',Object.values(totalCategory))

    const combinedData = {
      
        labels:Object.keys(monthlyExpense),
        datasets:[
            {
                label:'Expenses',
                data:Object.values(monthlyExpense),
                borderColor:"#B7227C",
                // fill:true,
                // backgroundColor:createLinearGradient(['#CC3F8A', '#D25A9A', '#D878AB']),
                tension:0.5,
                borderWidth:3
                
            },
            {
                label:'Income',
                data:Object.values(monthlyIncome),
                borderColor:"#1C299B",
                // backgroundColor:"#8968CD",
                tension:0.5,
                borderWidth:3,
            },
        ],
    }
    

    const ExpenseIncomeBarData = {
        labels:Object.keys(monthlyExpense),
        datasets:[
            {
                label:'Expenses',
                borderRadius:2,
                data:Object.values(monthlyExpense),
                // backgroundColor:"#2a52be",
                backgroundColor:createLinearGradient(['#402BAA', '#6149DC', '#573DDC'])
                // "#2a52be"
                // barThickness:20,
                
            },
            {
                label:'Income',
                borderRadius:2,
                data:Object.values(monthlyIncome),
                // borderColor:"#8968CD",
                backgroundColor:createLinearGradient(['#9B65E3', '#7F7CE3', '#C9C1E8']),
                // barThickness:20,
            },
        ],
    }

    const doughnutData={
        // labels:Object.entries(totalCategory).map(([key, value]) => [key, value]),//Legend Text to be displayed
        labels:Object.keys(totalCategory),
        datasets:[
            {
                // label:"Categories",
                data:Object.values(totalCategory),
                backgroundColor:[    
                    // "#2a52be",//darkblue
                    createLinearGradient(['#2769AE', '#4087AE', '#4EA6B6']),//blue
                    createLinearGradient(['#BB246C', '#CA4383', '#D26097']),//rose
                    createLinearGradient(['#482299', '#5B36A9', '#674AA6']),//violet
                    createLinearGradient(['#E0D062', '#EACB77', '#E9D18F']),//yellow
                    createLinearGradient(['#8968CD', '#9776D9', '#9F85D6']),//light violet 
                    createLinearGradient(['#DF7654', '#F08D6D', '#E59B83']),//yellow
                    // "#2774AE",//blue
                    // "#BB246C",//Rose
                    // "#482299",//Dark violet
                    // "#E0BE62",//yellow
                    // "#C54B8C",//rose
                    // "#8968CD",//violet
                    // "#773E7C",//light violet
                    // "#2A5057",//Green
                ],
                hoverOffset:4,
                
                
            }
        ]
    }

    const doughnutOptions={
        cutout:`70%`,// size of hole in center
        spacing:3,//space between arcs
        responsive: true,
        // maintainAspectRatio:false,
        borderWidth:0,//borderWidth of arcs
        aspectRatio:1,//Determines width/height ratio
        layout:{
            padding:2,//padding of the entire chart
        },
      
        animation:{
            animateScale:true,
        },
        //To write Total Expense in Center of Doughnut

           plugins:{
            tooltip:{
                // enabled:false,
                usePointStyle:true,
                boxPadding:5, 
                // bodySpacing:5,
                titleSpacing:5,
                padding:10,
            },
            datalabels: {
                color: 'white',
                padding:3,
                font:{
                    size:`9%`,
                },
                formatter: (value, context) => {
                    const percentage = ((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
                    return percentage + '%';
                },
            },
                legend:{
                    display:true,
                    position: 'left', // Set position based on screen width
                    // align:'start',
                    labels: {
                        // boxHeight:40,
                        boxWidth:400, // You can also adjust the box width if needed
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding:20,
                        maxWidth:150,
                        // lineWidth:5,
                        font:{
                            // size:14,
                            // margin:2,
                            // style:'normal',
                            // lineHeight:1,
                            weight:'bold',
                            // padding:20,
                        },

                      },
                      

                }
            }

    }

   

    
    const lineOptions={
        // responsive:true,
        layout:{
            padding:5,
        },
        plugins:{
            tooltip:{
                enabled:false,
            },
            datalabels:{
                display:false,// Disable data labels labels inside or on top
            },

            legend:{
                display:true,
                labels:{
                    boxHeight:0,//to make the legend a line
                    
                    // pointStyle:"line",//dont work
                }
            },

        },

        
        elements:{
            // line:{
            //     tension:0,
            //     borderWidth:2,
            //     // borderColor:"#B768A2",
            //     fill:"start",
                

            // },
            point:{
                radius:0,
                hitRadius:0,
            }
        },
        scales:{
            y:{
                display:true,//Hide x-axis line
                grid:{
                    display:false,// Hide grid lines on the y-axis
                },
                ticks:{
                    display:true,
                },
                offset:true,

            },
            x:{
                display:true,//Hide y-axis line
                grid:{
                    display:false,// Hide grid lines on the x-axis
                },
                ticks:{
                    display:true,
                },
                offset:true,
            },
           
        }
    }

    const BarOptions ={
        maintainAspectRatio:false,
        scales:{
            y:{
                display:true,//Hide x-axis line
                grid:{
                    display:false,// Hide grid lines on the y-axis
                },
                ticks:{
                    display:true,
                },

            },
            x:{
                display:true,//Hide y-axis line
                grid:{
                    display:false,// Hide grid lines on the x-axis
                },
                ticks:{
                    display:true,
                },
                barThickness:20,
            },

        },


        plugins:{
            tooltip:{
                enabled:false,
            },
            datalabels:{
                display:false,// Disable data labels
            },

            legend:{
                position:"top",
                // align:"start",
                labels:{
                    // boxWidth:7,
                },
                title:{
                    text:"Expense and Income Trends",
                    display:true,
                    // color:"white",
                    font:{
                        size:18,
                        weight:'bold',
                    },
                }
            }
            },
           
            elements:{
                bar:{
                    
                    // barPercentage:1, // Adjust the bar width (percentage of the available space)
                    // categoryPercentage:1,// Adjust the space between bars (percentage of the available space)
                }
            }
    };


   



  return (
    <>

{/* Modified Line Chart */}

    {/* <div className="w-full h-500 md:w-1/2 lg:w-1/2 p-5 shadow-lg">
        <Line data={combinedData} options={lineOptions}/>
    </div> */}


{/* Modified Bar Chart */}
    {/* <div className="w-full h-full md:w-1/2 lg:w-2/3 p-5 shadow-lg">
        <Bar data={ExpenseIncomeBarData} height={300} options={BarOptions}/>
    </div> */}


{/* Modified Doughnut Chart */}
    {/* <div className="lg:w-2/5 md:w-1/2 sm:w-full shadow-lg my-10 p-3">
            <h2 className="text-center text-xl font-bold">Expense Breakdown</h2>
            <Doughnut data={doughnutData} options={doughnutOptions}/>
      </div> */}

    </>
  )
}


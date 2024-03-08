'use client'

import {Bar} from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';//Additional plugin to add Data labels inside the doughnut
import {createLinearGradient} from '../LinearGradient' // Manually written Function to create a linear gradient with multiple colors

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

const BarChart = ({monthlyExpense,monthlyIncome}) => {

    const CombinedBarData = {
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
    <div className="w-full h-full md:w-1/2 lg:w-2/3 p-5 shadow-lg">
    <Bar data={CombinedBarData} height={300} options={BarOptions}/>
    </div>
  )
}

export default BarChart

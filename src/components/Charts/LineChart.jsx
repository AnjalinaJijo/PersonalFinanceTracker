'use client'
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

import { Line} from "react-chartjs-2";

const LineChart = ({monthlyExpense,monthlyIncome}) => {

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

  return (
      <div className="w-full h-500 md:w-1/2 lg:w-1/2 p-5 shadow-lg">
        <Line data={combinedData} options={lineOptions}/>
      </div>
  )
}

export default LineChart

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CarbonChart({ results }) {

const chartRef = useRef(null);
const chartInstance = useRef(null);

useEffect(()=>{

if(!results || results.length===0) return;

const ctx = chartRef.current.getContext("2d");

if(chartInstance.current){
chartInstance.current.destroy();
}

chartInstance.current = new Chart(ctx,{

type:"bar",

data:{
labels:results.map(r=>r.name),

datasets:[
{
label:"CO₂ Emissions",
data:results.map(r=>r.co2),
backgroundColor:[
"#00ff9c",
"#00e68a",
"#00cc7a",
"#ffaa00",
"#ff4444"
],
borderRadius:10
}
]
},

options:{
plugins:{
legend:{display:false}
},

scales:{
y:{
beginAtZero:true,
grid:{color:"#0f3d33"}
},
x:{
grid:{display:false}
}
}
}

});

},[results]);

return(

<div style={{padding:"40px"}}>

<h2>CO₂ Comparison</h2>

<canvas ref={chartRef}></canvas>

</div>

);
}
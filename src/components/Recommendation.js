export default function Recommendation({ results }) {

if(!results || results.length===0) return null;

const sorted=[...results].sort((a,b)=>a.co2-b.co2);

const best=sorted[0];
const worst=sorted[sorted.length-1];

const savedCO2=(worst.co2-best.co2).toFixed(2);
const savedMoney=(worst.cost-best.cost).toFixed(0);

return(

<div style={{
background:"#113f35",
padding:"25px",
margin:"40px",
borderRadius:"10px"
}}>

<h2>💡 Smart Recommendation</h2>

<p style={{marginTop:"10px"}}>

Switch from <b>{worst.name}</b> to <b>{best.name}</b>

</p>

<p style={{marginTop:"10px"}}>

You could save

<b style={{color:"#00ff9c"}}> {savedCO2} kg CO₂ </b>

and

<b style={{color:"#00ff9c"}}> ₹{savedMoney}</b>

per month.

</p>

</div>

);

}
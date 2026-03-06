export default function SavingsCalculator({ results }) {

if(!results || results.length===0) return null;

const sorted=[...results].sort((a,b)=>a.co2-b.co2);

const best=sorted[0];
const worst=sorted[sorted.length-1];

const monthlyCO2=(worst.co2-best.co2).toFixed(1);
const yearlyCO2=(monthlyCO2*12).toFixed(1);

const monthlyMoney=(worst.cost-best.cost).toFixed(0);
const yearlyMoney=(monthlyMoney*12).toFixed(0);

return(

<div style={{
background:"#113f35",
margin:"40px",
padding:"30px",
borderRadius:"10px"
}}>

<h2>📊 Potential Savings</h2>

<p style={{marginTop:"15px"}}>

Switching from <b>{worst.name}</b> to <b>{best.name}</b> could save:

</p>

<ul style={{marginTop:"15px"}}>

<li>🌱 {monthlyCO2} kg CO₂ per month</li>

<li>🌍 {yearlyCO2} kg CO₂ per year</li>

<li>💰 ₹{monthlyMoney} per month</li>

<li>🏦 ₹{yearlyMoney} per year</li>

</ul>

</div>

);

}
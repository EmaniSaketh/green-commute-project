export default function CarbonStats({ results }) {

const car = results.find(r => r.name === "Petrol Car")

if(!car) return null

const monthlyCO2 = parseFloat(car.co2)

const yearlyCO2 = monthlyCO2 * 12

return (

<div className="stats">

<h2>Your Monthly Carbon Statement</h2>

<div className="stats-grid">

<div className="stat">
<h3>{monthlyCO2} kg</h3>
<p>CO₂ per month</p>
</div>

<div className="stat">
<h3>₹{car.cost}</h3>
<p>Monthly cost</p>
</div>

<div className="stat">
<h3>{car.time}</h3>
<p>Minutes commuting</p>
</div>

<div className="stat">
<h3>{yearlyCO2.toFixed(0)} kg</h3>
<p>Yearly CO₂</p>
</div>

</div>

</div>

)

}
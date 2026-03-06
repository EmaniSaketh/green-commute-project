export default function ShareResults({ results }) {

if (!results || results.length === 0) return null;

/* best commute option */
const best = [...results].sort((a,b)=>a.co2-b.co2)[0];

const shareText = `
🌱 My Green Commute Score

Best option: ${best.name}
CO₂ Emissions: ${best.co2} kg
Monthly Cost: ₹${best.cost}

Calculate your commute carbon footprint too!
`;

/* share function */
const share = async () => {

try {

if (navigator.share) {

await navigator.share({
title: "My Green Commute",
text: shareText
});

}

else {

await navigator.clipboard.writeText(shareText);

alert("Carbon stats copied to clipboard! 🚀");

}

}

catch(err){

alert("Sharing failed. Try copying manually.");

}

};

return (

<div style={{textAlign:"center",marginTop:"40px"}}>

<button
onClick={share}
style={{
background:"#00ff9c",
padding:"15px 25px",
border:"none",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold"
}}
>

📤 Share My Carbon Footprint

</button>

</div>

);

}
export default function AIAdvisor({ results }) {

  if (!results || results.length === 0) return null;

  const sorted = [...results].sort((a, b) => parseFloat(a.co2) - parseFloat(b.co2));

  const best  = sorted[0];
  const worst = sorted[sorted.length - 1];

  const savedCO2   = (parseFloat(worst.co2)  - parseFloat(best.co2)).toFixed(2);
  const savedMoney = (parseFloat(worst.cost) - parseFloat(best.cost)).toFixed(0);
  const trees      = (parseFloat(savedCO2) / 21).toFixed(1);
  const phoneCharge= Math.round(parseFloat(savedCO2) * 125);
  const kmSUV      = (parseFloat(savedCO2) / 0.292).toFixed(0);

  // Smart contextual advice based on best mode
  const adviceMap = {
    "Walking":    `Walking is carbon-zero and saves you ₹${savedMoney}/month. If distance allows it, this is the perfect choice — zero cost, zero emissions, and you're getting fit.`,
    "Bicycle":    `Cycling is your greenest option and costs almost nothing. Great for distances under 8km — you'll save ₹${savedMoney}/month vs driving.`,
    "E-Scooter":  `E-Scooter has 88% lower emissions than a petrol car for this route. Best for 3–15km urban distances.`,
    "Metro Rail": `Metro Rail is your smartest commute — electric, fast, and ${savedCO2}kg less CO₂ than driving every month.`,
    "EV Car":     `EV is the cleanest car option available — significantly lower emissions than petrol or diesel.`,
    "City Bus":   `City Bus is a high-impact choice — one bus replaces ~40 solo car trips. Your lowest-emission motorised option.`,
    "Shared Cab": `Shared Cab halves emissions vs solo taxi — a good middle ground when public transit isn't available.`,
  };

  const advice = adviceMap[best.name] ||
    `${best.name} is the most sustainable motorised option for this route distance.`;

  return (
    <div style={{
      background: "linear-gradient(135deg, #0a2e20, #0f3d33)",
      padding: "30px 40px",
      margin: "0 40px 0 40px",
      borderRadius: "12px",
      border: "1px solid #00ff9c33",
    }}>

      <h2 style={{ marginBottom: "16px" }}>🤖 AI Commute Advisor</h2>

      <p style={{ color: "#c8f0e0", lineHeight: "1.7", marginBottom: "20px" }}>
        {advice}
      </p>

      {/* Impact numbers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "16px",
        marginTop: "20px",
        paddingTop: "20px",
        borderTop: "1px solid #1a4d36",
      }}>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#00ff9c", fontSize: "24px", fontWeight: "bold" }}>{savedCO2} kg</p>
          <p style={{ color: "#6b9e8f", fontSize: "13px" }}>CO₂ saved/month<br/>vs {worst.name}</p>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#facc15", fontSize: "24px", fontWeight: "bold" }}>₹{savedMoney}</p>
          <p style={{ color: "#6b9e8f", fontSize: "13px" }}>Money saved/month<br/>vs {worst.name}</p>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#86efac", fontSize: "24px", fontWeight: "bold" }}>{trees}</p>
          <p style={{ color: "#6b9e8f", fontSize: "13px" }}>Trees worth of<br/>CO₂ absorbed</p>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#60a5fa", fontSize: "24px", fontWeight: "bold" }}>{phoneCharge}</p>
          <p style={{ color: "#6b9e8f", fontSize: "13px" }}>Phone charges<br/>equivalent</p>
        </div>

      </div>

    </div>
  );
}
